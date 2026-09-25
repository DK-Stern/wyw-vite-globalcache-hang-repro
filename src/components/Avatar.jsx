import { styled } from '@linaria/react';
import { colors, spacing, fontSizes } from '../theme';

const Avatar = ({ className, name, src }) => (
  <div className={className}>
    {src ? <img src={src} alt={name} /> : <span>{name?.[0]?.toUpperCase()}</span>}
  </div>
);

export const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.secondary};
  color: ${colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSizes.md};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
