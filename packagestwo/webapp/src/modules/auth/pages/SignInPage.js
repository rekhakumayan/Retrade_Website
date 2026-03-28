// Module-level page UI for auth route.
// Keeps route rendering thin by delegating to feature page component.
import LoginForm from "@/modules/auth/components/LoginForm";
import styles from "./SignInPage.module.css";

export default function SignInPage() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
         
        <LoginForm />
      </div>
    </section>
  );
}
