import { cx } from '@linaria/core';
import { inputBase, inputFocused } from './input-styles';

const Input = ({ placeholder, value, onChange, focused }) => (
  <input
    className={cx(inputBase, { [inputFocused]: focused })}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export { Input };
export const StyledInput = Input;
