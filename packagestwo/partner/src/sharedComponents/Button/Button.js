// Reusable button used across modules.
import styles from "./Button.module.css";

export default function Button({ children, type = "button", disabled = false, onClick, className="" }) {
  return (
    <button className={` ${styles.button} ${className}`} type={type} onClick={onClick} disabled={disabled }>
      {children}
    </button>
  );
}
