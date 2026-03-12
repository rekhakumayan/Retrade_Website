// // Reusable button used across modules.
// import styles from "./Button.module.css";

// export default function Button({ children, type = "button", disabled = false, onClick }) {
//   return (
//     <button className={styles.button} type={type} onClick={onClick} disabled={disabled}>
//       {children}
//     </button>
//   );
// }


import styles from "./Button.module.css";

export default function Button({
  children,
  type = "button",
  disabled = false,
  onClick,
  variant = "primary", // primary | secondary | outline
  iconOnly = false,
  pill = false,
  fullWidth = false,
  active = false,
  round = false,
  className="",
}) {
  const classes = [
    styles.button,
    styles[variant],
    iconOnly && styles.iconOnly,
    pill && styles.pill,
    fullWidth && styles.fullWidth,
    active && styles.active,
    round && styles.round,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}