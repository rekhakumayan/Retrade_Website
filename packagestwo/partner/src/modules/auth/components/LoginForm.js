
"use client";

import { useToast } from "@/sharedComponents/Toast/useToast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.css";
import SVG from "react-inlinesvg";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setAuthError } from "@/modules/auth/auth.module";


function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { error, token, loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    dispatch(setAuthError(null));
  }, [dispatch]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()){
      showToast("error", "Please enter valid email and password");
      return;
    } 

    const res = await dispatch(loginUser({ email, password, platform: "partnerapp" }));
    if (res?.success) {
      showToast("success", "Login successful");
      router.push('/dashboard')
    }else{
      showToast("error", res?.message || "Invalid email or password");
    }
  };

  return (
    <div
      className={`min-vh-100 d-flex align-items-center justify-content-center `}
    >
      <div className="w-100 d-flex flex-column align-items-center">

        {/* Header Section */}
        <div className={`text-center ${styles.formHeadline}`}>
          <div className={styles.iconBox}>
            <SVG
              src="/signicon.svg"
            />
          </div>


          <h2 className={styles.fw_900_tight}>
            Vendor Portal
          </h2>

          <p className="text-muted fw-medium">
            Manage your shop, inventory & growth
          </p>
        </div>

        {/* Form Card */}
        <form className={styles.card} onSubmit={handleSubmit}>

          {/* Email Field */}
          <div className="mb-4">
            <label className={styles.label}>
              Business Email
            </label>

            <div className="position-relative mt-2">
              <input
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {errors.email && (
                <p className="text-danger small mt-1">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div className="mt-4 position-relative">
            <label className={styles.label}>
              Password
            </label>

            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errors.password && (
              <p className="text-danger small mt-1">
                {errors.password}
              </p>
            )}

          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.button}>
            <span>Log In to Dashboard</span>
          </button>

          {/* Footer */}
          <div className={styles.footer}>
            <p>
              Authorized Personnel Only. <br />
              All access attempts are logged.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;
