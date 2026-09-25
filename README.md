# wyw-vite-globalcache-hang-repro

Minimal reproduction for a process-hang bug in `@wyw-in-js/vite` 2.5.1 when `features.globalCache: false`.

## Environment

| Package                  | Version |
|--------------------------|---------|
| Node.js                  | 24.15.0 |
| pnpm                     | 10.20.0 |
| vite                     | 8.3.0   |
| @wyw-in-js/vite          | 2.5.1   |
| @wyw-in-js/transform     | 2.5.1   |
| @linaria/core            | 8.2.0   |
| @linaria/react           | 8.2.0   |
| react / react-dom        | 19.3.0  |

## Steps to Reproduce

```bash
pnpm install

# Hangs after "✓ built in ...ms" — process never exits
pnpm build

# Exits cleanly (exit 0)
pnpm build:global-cache
```

> **Note:** `build:global-cache` uses `WYW_GLOBAL_CACHE=true vite build`.
> On Windows, use `cross-env WYW_GLOBAL_CACHE=true vite build` instead.

## Expected Behaviour

`vite build` completes and the Node process exits with code 0 regardless of `globalCache`.

## Actual Behaviour

With `globalCache: false` (the default), `vite build` prints `✓ built in Xms` but the process hangs indefinitely. A `report-active-handles` diagnostic plugin logs the leak ~1 s after the build summary line.

### Observed Output (`pnpm build`, killed after 90 s)

```
vite v8.3.0 building client environment for production...
transforming...
✓ 47 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.41 kB │ gzip:  0.28 kB
dist/assets/index-ruIZ2y3C.css    2.37 kB │ gzip:  0.85 kB
dist/assets/index-CuaOVMAM.js   228.60 kB │ gzip: 72.46 kB

✓ built in 911ms
[report-active-handles] total: 44 {"Socket":33,"ChildProcess":11}
[report-active-handles] runner.js ChildProcess count: 11
```

11 `ChildProcess` handles with `spawnargs` containing `runner.js` keep the event loop alive. The number roughly matches the number of source files processed by the eval runner.

### Observed Output (`pnpm build:global-cache`)

```
✓ 47 modules transformed.
✓ built in 344ms
```

Process exits immediately (exit code 0).

## Root-Cause Analysis

Three components combine to cause the leak:

### 1. Per-file `TransformCacheCollection` when `globalCache: false`

`@wyw-in-js/transform/esm/transform.js` line 31–33:

```js
if (!isFeatureEnabled(pluginOptions.features, 'globalCache', options.filename)) {
  services.cache = new TransformCacheCollection();  // new object per file
}
```

When `globalCache` is disabled, every `transform()` call creates a fresh `TransformCacheCollection` and assigns it to `services.cache`.

### 2. Broker keyed by `services.evalBrokerScope ?? services.cache`

`@wyw-in-js/transform/esm/eval/broker.js` line 2709:

```js
const scope = services.evalBrokerScope ?? services.cache;
```

The `evalBrokers` WeakMap uses the cache object itself as the scope key. Because each file gets a fresh cache, each file gets its own `EvalBroker` — and each broker spawns a new `node --experimental-vm-modules runner.js` child process when needed.

### 3. Vite plugin only disposes `clientCache` and `ssrCache`

`@wyw-in-js/vite/esm/index.mjs` lines 292–405:

```js
const clientCache = new TransformCacheCollection();  // created once
const ssrCache   = new TransformCacheCollection();   // created once
const disposeEvalBrokers = () => {
  for (const cache of caches) {           // caches = Set([clientCache, ssrCache])
    disposeEvalBroker(cache);             // only disposes the two plugin-level caches
  }
};
// ...
buildEnd() {
  disposeEvalBrokers();                   // called on build end
}
```

The plugin's `buildEnd` disposes brokers for the two shared caches it created. The per-file caches created by `transform.js` are never added to `caches` and never disposed. Their runner child processes are never killed.

### Summary

> Per-file cache → unique broker scope → unique runner child process → never disposed → process hangs.

## Related Issues

- [wyw-in-js/wyw-in-js #352](https://github.com/wyw-in-js/wyw-in-js/issues/352)
- [wyw-in-js/wyw-in-js #407](https://github.com/wyw-in-js/wyw-in-js/issues/407)
- [wyw-in-js/wyw-in-js #422](https://github.com/wyw-in-js/wyw-in-js/issues/422)

## Required Ingredient for Reproduction

The hang only occurs when the eval runner is actually spawned. This requires at least one source file that **cannot be statically evaluated** by `isStaticallyEvaluatableModule` — i.e., a file with function calls or computed expressions. In this repo `src/theme.js` uses `makeScale()` and `makeMediaQueries()` which call functions; importing those values in `styled` templates forces WyW to launch the runner. Plain object literals (only string/number values) are inlined statically without spawning a runner.
