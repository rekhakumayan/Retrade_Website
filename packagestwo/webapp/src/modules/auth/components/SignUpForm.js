'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SignUpForm.module.css';
import SVG from 'react-inlinesvg';
import '@/styles/typography.css';
import { useDispatch, useSelector } from 'react-redux';
import { userSignup, setAuthError } from '@/modules/auth/auth.module';
import { selectAuthError, selectAuthLoading } from '@/modules/auth/auth.selectors';
import Button from "@/sharedComponents/Button/Button";
import { getVendorId } from '@/utils/helperFunction';

function SignupForm() {
  const router = useRouter();
  const vendorId = getVendorId();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const loading = useSelector(selectAuthLoading);

  // useEffect(() => {
  //   if (!vendorId) {
  //     router.push('/signin');
  //   }
  // }, [vendorId, router]);

  useEffect(() => {
    dispatch(setAuthError(null));
  }, [dispatch]);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await dispatch(
      userSignup({ 
        name, email, password, role: 'customer', vendorId })
    );
    if (result?.success) {
      router.push('/signin');
    }
  };

  return (
    <div className={`row min-vh-100 align-items-center justify-content-center ${styles.signupRow}`}>
      <div className="col-12 col-sm-10 col-md-6 col-lg-4 px-0 d-flex flex-column align-items-center">

        <div className={`text-center ${styles.formHeadline}`}>
          <div className={styles.iconBox}>
            <SVG src="/assets/svg/store.svg" />
          </div>

          <h2 className={`${styles.fw_900_tight}`}>
            Create Account
          </h2>

          <p className={`text-muted fw-medium ${styles.ops_ty}`}>
            Join MarketNest and explore your tech collections
          </p>
        </div>

        <form className={styles.card} onSubmit={handleSubmit}>

           {/* NAME */}
          <div className="mt-4 position-relative">
            <label className={`text-xs ${styles.label}`}>
              FULL NAME
            </label>
            <SVG
              src="/assets/svg/circle-user.svg"
              className={`position-absolute mt-4 start-0 translate-middle-y ms-2 ${styles.icon}`}
            />
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-danger text-xs mt-1">{errors.name}</p>
            )}
          </div>

         {/* EMAIL */}
          <div className="mt-4 position-relative">
            <label className={`text-xs ${styles.label}`}>
              EMAIL ADDRESS
            </label>
            <SVG
              src="/assets/svg/mail.svg"
              className={`position-absolute mt-4 start-0 translate-middle-y ms-2 ${styles.icon}`}
            />
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-danger text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
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
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className={styles.rightIcon}
              >
                <SVG
                  src={showPassword ? '/assets/svg/eye-off.svg' : '/assets/svg/eye.svg'}
                  
                />
              </span>
            </div>
            {errors.password && (
              <p className="text-danger text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mt-4">
            <label className={`text-xs ${styles.label}`}>
              CONFIRM PASSWORD
            </label>
            <div className={styles.inputWrapper}>
              <SVG
                src="/assets/svg/lock.svg"
                className={`${styles.leftIcon}`}
              />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={styles.rightIcon}
              >
                <SVG
                  src={showConfirmPassword ? '/assets/svg/eye-off.svg' : '/assets/svg/eye.svg'}
                 
                />
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-danger text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            {!loading && <SVG src="/assets/svg/rightArrow.svg" />}
          </button>

          {error ? (
            <p className="text-danger text-center text-sm mt-3">
              {error}
            </p>
          ) : null}

          {/* FOOTER */}
          <div className={`${styles.footer}`}>
            <p>
              Already have an account?{' '}
              <Button
                variant="outline"
                className={styles.textButton}
                type="button"
                onClick={() => router.push('/signin')}
              >
                Sign In
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

export default SignupForm;