/**
 * IconButton — Local Constellation shim
 */
import './IconButton.css';

export function IconButton({
  title,
  tone = 'neutral',
  emphasis = 'outlined',
  size = 'md',
  shape = 'circle',
  onClick,
  children,
  className = '',
}) {
  const cls = [
    'cst-icon-btn',
    `cst-icon-btn--${tone}`,
    `cst-icon-btn--${emphasis}`,
    `cst-icon-btn--${size}`,
    `cst-icon-btn--${shape}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={cls} onClick={onClick} aria-label={title} title={title}>
      {children}
    </button>
  );
}
