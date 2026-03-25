/**
 * Button — Local Constellation shim
 * Mirrors @zillow/constellation Button API.
 */
import './Button.css';

export function Button({
  tone = 'brand',
  emphasis = 'outlined',
  size = 'md',
  fluid = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'start',
  onClick,
  children,
  className = '',
  ...props
}) {
  const cls = [
    'cst-btn',
    `cst-btn--${tone}`,
    `cst-btn--${emphasis}`,
    `cst-btn--${size}`,
    fluid && 'cst-btn--fluid',
    disabled && 'cst-btn--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={cls} onClick={onClick} disabled={disabled} {...props}>
      {icon && iconPosition === 'start' && <span className="cst-btn__icon">{icon}</span>}
      <span className="cst-btn__label">{children}</span>
      {icon && iconPosition === 'end' && <span className="cst-btn__icon">{icon}</span>}
      {loading && <span className="cst-btn__spinner" />}
    </button>
  );
}

export default Button;
