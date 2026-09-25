import { css } from '@linaria/core';
import { colors, spacing } from '../theme';

export const progressTrack = css`
  flex: 1;
  background: ${colors.border};
  border-radius: 100px;
  height: 8px;
  overflow: hidden;
`;

export const progressFill = css`
  height: 100%;
  background: ${colors.primary};
  border-radius: 100px;
  transition: width 0.3s ease;
`;

export const progressWrapper = css`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;
