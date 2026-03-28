// Shared error alert component for consistent error rendering.
import styles from "./error.module.css";

export default function ErrorAlert({ message = "Something went wrong" }) {
  return <p className={styles.error}>{message}</p>;
}
