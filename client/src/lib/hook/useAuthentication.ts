import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function useAuthentication() {
  const router = useRouter()
  const auth = useSelector((state: { auth: { isLoggedIn: boolean } }) => state.auth);


  useEffect(() => {
    if (!auth.isLoggedIn) {
      router.push('/login');
    }
  }, [auth]);
}