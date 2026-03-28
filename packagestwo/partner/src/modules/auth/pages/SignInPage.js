"use client"
import LoginForm from "@/modules/auth/components/LoginForm";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./SignInPage.module.css";

export default function SignInPage() {
  
  const { token, loading } = useSelector((state) => state.auth);
  const router=useRouter()
  useEffect(() => {
    if (!loading && token) {
      router.push("/dashboard");
    }
  }, [token, loading, router]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <LoginForm />
      </div>
    </section>
  );
}
