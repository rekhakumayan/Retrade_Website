'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';
import SVG from 'react-inlinesvg';
import '@/styles/typography.css';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, setAuthError } from '@/modules/auth/auth.module';
import Button from "@/sharedComponents/Button/Button";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { error, token, user } = useSelector((state) => state.auth);

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    dispatch(setAuthError(null));
  }, [dispatch]);

  useEffect(() => {
  if (token && user?.role === "customer") {
    router.push("/products");
  }
}, [token,router,  user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(userLogin({ email, password }));
  };

  return (
    <div className={`row min-vh-100 align-items-center justify-content-center ${styles.loginRow}`}>
      <div className="col-12 col-sm-10 col-md-6 col-lg-4 px-0 d-flex flex-column align-items-center">
        <div className={`text-center ${styles.formHeadline}`}>
          <div className={styles.iconBox}>
            <SVG src="/assets/svg/store.svg" />
          </div>

          <h2 className={`${styles.fw_900_tight}`}>
            Customer Portal
          </h2>

          <p className={`text-muted fw-medium ${styles.ops_ty}`}>
            Sign in to access your tech collections
          </p>
        </div>

        <form className={styles.card} onSubmit={handleSubmit}>
          <div className="mt-4 position-relative ">
            <label className={`text-xs ${styles.label}`}>
              EMAIL ADDRESS
            </label>
            
            <SVG
              src="/assets/svg/mail.svg"
              className={`position-absolute mt-4  start-0 translate-middle-y ms-2 ${styles.icon}`}
            />
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {errors.email && (
              <p className="text-danger text-xs mt-1">
                {errors.email}
              </p>
            )}  
          </div>
 
          <div className="mt-4">
            <label className={`text-xs ${styles.label}`}>
              PASSWORD
            </label>

            <div className={styles.inputWrapper}>
              <SVG
                src="/assets/svg/lock.svg"
                className={`${styles.leftIcon}`}
              />

              <input
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <SVG
                src="/assets/svg/eye.svg"
                className={`${styles.rightIcon}`}
              />
            </div>

            {errors.password && (
              <p className="text-danger text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>
          <div className={`mt-3 d-flex justify-content-between ${styles.rememberWrapper}`}>
            <label className={` ${styles.rememberLabel}`}>
              <input
                type="checkbox"
                className={`mt-1 ${styles.checkbox}`}
              />
              <span className='ms-1'>Remember me</span>
            </label>
            <Button
              variant="outline"
              className={`mt-1 ${styles.textButton}`}
              type="button"
            >
              Forgot Password?
            </Button>
          </div>

          <button 
            type="submit" 
            // onClick={ () => router.push("/products")}
            className={styles.button}
          >
            <span>
              Sign In
            </span>
            <SVG
              src="/assets/svg/rightArrow.svg" />
          </button>

          {error ? (
            <p className="text-danger text-center text-sm mt-3">
              {error}
            </p>
          ) : null}

          <div className={` ${styles.footer}`}>
            <p>
              New to MarketNest?{" "}
              <Button
                variant="outline"
                className={styles.textButton}
                type="button"
              >
                Create Account
              </Button>
            </p>
          </div>
        </form>
        <div>
          <p className={`text-muted fw-medium mt-2 ${styles.ops_ty}`}>
            Securely encrypted by MarketNest Auth
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
