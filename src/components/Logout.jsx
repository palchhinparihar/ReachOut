import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.signOut().then(() => {
      navigate('/login');
      window.location.reload(); // Force reload to clear cached user state
    });
  }, [navigate]);
  return null;
}
