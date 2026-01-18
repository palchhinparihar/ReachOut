import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p className="min-h-[70vh] flex items-center justify-center text-3xl text-gray-500 animate-pulse">Loading details...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
