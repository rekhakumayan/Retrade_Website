import styles from "./Spinner.module.css";
 
export default function Spinner({ size = "medium", fullPage = false }) {
  if (fullPage) {
    return (
      <div className={styles.fullPageContainer}>
        <div className={`${styles.spinner} ${styles[size]}`}></div>
      </div>
    );
  }
 
  return <div className={`${styles.spinner} ${styles[size]}`}></div>;
}
 