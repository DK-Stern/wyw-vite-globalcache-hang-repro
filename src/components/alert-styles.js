import { css } from '@linaria/core';
import { colors, spacing, fontSizes } from '../theme';

export const alertBase = css`
  padding: ${spacing.md};
  border-radius: 4px;
  font-size: ${fontSizes.md};
  border: 1px solid transparent;
`;

export const alertInfo = css`
  background: rgb(0 102 204 / 0.1);
  border-color: ${colors.primary};
  color: ${colors.primary};
`;

export const alertSuccess = css`
  background: rgb(40 167 69 / 0.1);
  border-color: ${colors.success};
  color: ${colors.success};
`;

export const alertError = css`
  background: rgb(220 53 69 / 0.1);
  border-color: ${colors.error};
  color: ${colors.error};
`;

export const alertWarning = css`
  background: rgb(255 193 7 / 0.1);
  border-color: ${colors.warning};
  color: ${colors.text};
`;
