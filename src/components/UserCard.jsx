import { styled } from '@linaria/react';
import { colors, spacing } from '../theme';
import { StyledAvatar } from './Avatar';
import { StyledBadge } from './Badge';

const UserCard = ({ className, name, role, online }) => (
  <div className={className}>
    <StyledAvatar name={name} />
    <div>
      <strong>{name}</strong>
      <p>{role}</p>
    </div>
    <StyledBadge label={online ? 'Online' : 'Offline'} variant={online ? 'success' : 'default'} />
  </div>
);

export const StyledUserCard = styled(UserCard)`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.md};
  background: ${colors.background};
  border: 1px solid ${colors.border};
  border-radius: 8px;

  ${StyledAvatar}:hover {
    opacity: 0.8;
  }

  p {
    margin: 0;
    color: ${colors.textMuted};
    font-size: 13px;
  }

  strong {
    color: ${colors.text};
  }
`;
