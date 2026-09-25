import { cx } from '@linaria/core';
import { alertBase, alertInfo, alertSuccess, alertError, alertWarning } from './alert-styles';

const typeMap = {
  info: alertInfo,
  success: alertSuccess,
  error: alertError,
  warning: alertWarning,
};

const Alert = ({ message, type = 'info' }) => (
  <div className={cx(alertBase, typeMap[type])} role="alert">
    <strong>{type.toUpperCase()}: </strong>
    {message}
  </div>
);

export { Alert };
export const StyledAlert = Alert;
