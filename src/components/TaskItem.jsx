import { styled } from '@linaria/react';
import { colors, spacing } from '../theme';
import { StyledCard } from './Card';
import { StyledBadge } from './Badge';
import { StyledProgressBar } from './ProgressBar';

const TaskItem = ({ className, title, status, progress }) => (
  <div className={className}>
    <strong>{title}</strong>
    <div className="meta">
      <StyledBadge label={status} variant={status === 'done' ? 'success' : status === 'error' ? 'error' : 'default'} />
      <StyledProgressBar value={progress} />
    </div>
  </div>
);

export const StyledTaskItem = styled(TaskItem)`
  .meta {
    display: flex;
    align-items: center;
    gap: ${spacing.sm};
    margin-top: ${spacing.sm};
  }

  border-left: 3px solid ${colors.primary};
  padding: ${spacing.sm};
`;
