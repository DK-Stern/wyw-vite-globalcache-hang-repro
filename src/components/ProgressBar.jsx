import { progressWrapper, progressTrack, progressFill } from './progress-styles';

const ProgressBar = ({ value = 0, label }) => (
  <div className={progressWrapper}>
    {label && <span>{label}</span>}
    <div className={progressTrack}>
      <div className={progressFill} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
    <span>{value}%</span>
  </div>
);

export { ProgressBar };
export const StyledProgressBar = ProgressBar;
