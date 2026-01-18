
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      // Clear localStorage and sessionStorage
      localStorage.clear();
      sessionStorage.clear();
      // Sign out from Supabase
      await supabase.auth.signOut();
      // Navigate to login page
      navigate('/login', { replace: true });
    };
    logout();
  }, [navigate]);
  return null;
}
