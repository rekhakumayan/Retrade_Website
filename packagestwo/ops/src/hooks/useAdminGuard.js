'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const useAdminGuard = () => {
  const router = useRouter();
  const { token, user, _persist } = useSelector((state) => state.auth);

  const isRehydrated = _persist?.rehydrated;

  useEffect(() => {
    if (!isRehydrated) return;

    if (!token || user?.role !== 'admin') {
      router.replace('/login');
    }
  }, [isRehydrated, token, user]);

  // ⛔ block render
  if (!isRehydrated || !token || user?.role !== 'admin') {
    return false;
  }

  return true;
};

export default useAdminGuard;