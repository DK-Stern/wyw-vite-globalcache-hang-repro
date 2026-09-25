import { styled } from '@linaria/react';
import { colors, spacing } from '../theme';
import { StyledButton } from './Button';

const NavBar = ({ className, title }) => (
  <nav className={className}>
    <span>{title}</span>
    <StyledButton>Menu</StyledButton>
  </nav>
);

export const StyledNavBar = styled(NavBar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.sm} ${spacing.lg};
  background: ${colors.primary};
  color: ${colors.background};

  ${StyledButton} {
    background: transparent;
    border: 1px solid ${colors.background};
  }

  ${StyledButton}:hover {
    background: rgb(255 255 255 / 0.2);
  }
`;
