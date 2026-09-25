import { css } from '@linaria/core';
import { colors, spacing } from '../theme';

export const inputBase = css`
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${colors.border};
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  background: ${colors.background};
  color: ${colors.text};
`;

export const inputFocused = css`
  outline: 2px solid ${colors.primary};
  outline-offset: 1px;
`;
