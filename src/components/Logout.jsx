import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.signOut().then(() => {
      navigate('/login');
    });
  }, [navigate]);
  return null;
}
