// Module-level page UI for auth route.
// Keeps route rendering thin by delegating to feature page component.
import SignupForm from "@/modules/auth/components/SignUpForm";
import styles from "./SignUpPage.module.css";

export default function SignupPage() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <SignupForm />
      </div>
    </section>
  );
}