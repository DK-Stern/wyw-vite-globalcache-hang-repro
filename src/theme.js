const makeScale = (base) => ({
  xs: `${base * 0.25}px`,
  sm: `${base * 0.5}px`,
  md: `${base}px`,
  lg: `${base * 1.5}px`,
  xl: `${base * 2}px`,
  xxl: `${base * 3}px`,
});

export const colors = {
  primary: '#0066cc',
  secondary: '#ff6600',
  background: '#ffffff',
  surface: '#f5f5f5',
  text: '#1a1a1a',
  textMuted: '#666666',
  border: '#dddddd',
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
};

export const spacing = makeScale(16);

export const fontSizes = makeScale(14);

const makeMediaQueries = (breakpoints) =>
  Object.fromEntries(
    Object.entries(breakpoints).map(([key, px]) => [key, `@media (min-width: ${px}px)`]),
  );

export const media = makeMediaQueries({
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
});
