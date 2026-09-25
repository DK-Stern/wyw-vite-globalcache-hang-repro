import { styled } from '@linaria/react';
import { colors, spacing } from '../theme';

const Button = ({ className, children, onClick }) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
);

export const StyledButton = styled(Button)`
  background: ${colors.primary};
  color: ${colors.background};
  padding: ${spacing.sm} ${spacing.md};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: ${colors.secondary};
  }
`;
