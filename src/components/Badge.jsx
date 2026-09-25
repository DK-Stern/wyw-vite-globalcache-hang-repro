import { getBadgeClass } from './badge-styles';

const Badge = ({ label, variant = 'default' }) => (
  <span className={getBadgeClass(variant)}>{label}</span>
);

export { Badge };
export const StyledBadge = Badge;
