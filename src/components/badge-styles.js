import { cx } from '@linaria/core';
import { css } from '@linaria/core';
import { colors, spacing, fontSizes } from '../theme';

export const badgeDefault = css`
  display: inline-block;
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: 12px;
  font-size: ${fontSizes.sm};
  background: ${colors.primary};
  color: ${colors.background};
`;

export const badgeSuccess = css`
  background: ${colors.success};
  color: ${colors.background};
`;

export const badgeError = css`
  background: ${colors.error};
  color: ${colors.background};
`;

export const badgeWarning = css`
  background: ${colors.warning};
  color: ${colors.text};
`;

export const getBadgeClass = (variant) =>
  cx(badgeDefault, {
    [badgeSuccess]: variant === 'success',
    [badgeError]: variant === 'error',
    [badgeWarning]: variant === 'warning',
  });
