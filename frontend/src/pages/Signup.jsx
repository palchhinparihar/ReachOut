import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else navigate('/dashboard');
  };

  const handleOAuthSignup = async (provider) => {
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    setLoading(false);
    if (error) setError(error.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4 font-bold">Sign Up</h2>
        <input
          className="border p-2 mb-2 w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 mb-2 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button
          className="bg-blue-600 text-white w-full py-2 rounded disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <div className="my-4 flex flex-col gap-2">
          <button
            type="button"
            className="bg-red-500 text-white w-full py-2 rounded"
            onClick={() => handleOAuthSignup('google')}
            disabled={loading}
          >
            Continue with Google
          </button>
          <button
            type="button"
            className="bg-gray-800 text-white w-full py-2 rounded"
            onClick={() => handleOAuthSignup('github')}
            disabled={loading}
          >
            Continue with GitHub
          </button>
        </div>
        <div className="mt-2 text-sm text-center">
          Already have an account? <a href="/login" className="text-blue-600">Login</a>
        </div>
      </form>
    </div>
  );
}
