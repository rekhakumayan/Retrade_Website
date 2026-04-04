'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';
import SVG from 'react-inlinesvg';
import '@/styles/typography.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setAuthError } from '@/modules/auth/auth.module';

function LoginForm() {
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
    if (token && user?.role === 'admin') {
      router.push('/dashboard');
    }
  }, [token, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(loginUser({ email, password }));
  };

  return (
    <div className={`row min-vh-100 align-items-center justify-content-center ${styles.loginRow}`}>
      <div className="col-12 col-sm-10 col-md-6 col-lg-4 px-0 d-flex flex-column align-items-center">
        <div className={`text-center ${styles.formHeadline}`}>
          <div className={styles.iconBox}>
            <SVG src="/assets/image/svg/header-shield-logo.svg" />
          </div>

          <h2 className={`${styles.fw_900_tight}`}>
            Retrade Admin
          </h2>

          <p className={`text-muted fw-medium ${styles.ops_ty}`}>
            Platform Management & Analytics Portal
          </p>
        </div>

        <form className={styles.card} onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`text-xs ${styles.label}`}>
              Administrator Email
            </label>
            <div className="position-relative mt-2">
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
          </div>

          <div className="mt-4 position-relative">
            <label className={`text-xs ${styles.label}`}>
              Password
            </label>

            <input
              type="password"
              className={`${styles.input}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errors.password && (
              <p className="text-danger text-xs mt-1">
                {errors.password}
              </p>
            )}

            <SVG
              src="/assets/image/svg/lockIcon.svg"
              className={`position-absolute top-50 end-0 translate-middle-y me-4 mt-3 ${styles.lockIcon}`}
            />
          </div>

          <button type="submit" className={styles.button}>
            <span>Log In</span>
          </button>

          {/* ✅ FIX HERE */}
          {error ? (
            <p className="text-danger text-center text-sm mt-3">
              {typeof error === 'string'
                ? error
                : error?.message || 'Something went wrong'}
            </p>
          ) : null}

          <div className={`${styles.footer}`}>
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

export default LoginForm;