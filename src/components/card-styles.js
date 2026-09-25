import { css } from '@linaria/core';
import { colors } from '../theme';

export const cardBase = css`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
  background: ${colors.surface};
  border: 1px solid ${colors.border};
`;
