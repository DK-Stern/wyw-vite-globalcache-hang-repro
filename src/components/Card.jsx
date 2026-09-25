import { styled } from '@linaria/react';
import { spacing } from '../theme';
import { cardBase } from './card-styles';

const Card = ({ className, title, children }) => (
  <div className={`${className} ${cardBase}`}>
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
);

export const StyledCard = styled(Card)`
  padding: ${spacing.md};
`;
