import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { FiUserPlus } from "react-icons/fi";
import { inputFields, authProviders } from '../data/loginInputData';

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

  const handleOnChange = (e, fieldType) => {
    if (fieldType === 'email') setEmail(e.target.value);
    else setPassword(e.target.value);
  };

  const handleOAuthSignup = async (provider) => {
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    setLoading(false);
    if (error) setError(error.message);
  };

  return (
    <section className="text-black flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded-lg shadow-lg shadow-blue-700 w-[95%] mx-auto md:w-[45%] lg:w-[30%]">
        <div>
          <h2 className="text-blue-500 text-2xl md:text-4xl text-center mb-3 font-bold">Sign Up</h2>
          <p className="text-gray-700 text-center mb-4">Create your account to get started.</p>
        </div>

        {inputFields.map((field) => (
          <Input key={field?.type} field={field} value={field?.type === 'email' ? email : password} handleOnChange={handleOnChange} />
        ))}

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <Button loading={loading} texts={['Signing up...', 'Sign Up']} icon={FiUserPlus} />

        <div className="flex justify-center items-center my-4">
          <div className="border border-gray-300 w-18 lg:w-30"></div>
          <div className="mx-4 text-sm md:text-base">or Continue with</div>
          <div className="border border-gray-300 w-18 lg:w-30"></div>
        </div>

        <div className="my-4 flex justify-center gap-2">
          {authProviders.map(({ name, provider, icon: Icon }) => (
            <button
              key={provider}
              title={`Continue with ${name}`}
              type="button"
              className={`bg-gray-100 hover:bg-gray-300 transition duration-300 text-white py-2 rounded cursor-pointer group`}
              onClick={() => handleOAuthSignup(provider)}
              disabled={loading}
            >
              <Icon size={44} className={`group-hover:scale-105 my-2 mx-5 text-x rounded-full transition duration-200 ${provider === 'github' ? 'text-black' : ''}`} />
            </button>
          ))}
        </div>

        <div className="mt-6 text-sm md:text-base text-center">
          Already have an account? <a href="/login" className="text-blue-600">Login</a>
        </div>
      </form>
    </section>
  );
}
