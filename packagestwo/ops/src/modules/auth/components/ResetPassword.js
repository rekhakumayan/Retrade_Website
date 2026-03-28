'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import api from '@/services/api';

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/v1/auth/set-password', {
        token,
        password: password
      });

      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className='container mt-5 text-center'>
        <h3>Password set successfully</h3>

        <button
          className='btn btn-primary mt-3'
          onClick={() => router.push('/login')}
        >
          OK
        </button>
      </div>
    );
  }

  return (
    <div className='container mt-5'>
      <h2>Set Password</h2>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type='password'
          className='form-control mb-3'
          placeholder='Enter new password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
        />

        <button className='btn btn-primary' disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;