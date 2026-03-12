// Reusable button used across modules.
import styles from './Button.module.css';

export default function Button({
  children,
  type = 'button',
  disabled = false,
  onClick,
  variant = 'primary',
  icon,
  className = '',
  iconPosition = ''
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      {icon && iconPosition === 'left' && (
        <span className={styles.icon}>{icon}</span>
      )}

      {children}

      {icon && iconPosition === 'right' && (
        <span className={styles.icon}>{icon}</span>
      )}
    </button>
  );
}
