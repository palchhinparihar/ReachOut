import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { FiLogOut } from 'react-icons/fi';

const navLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/form', label: 'Add Application' },
  { to: '/applications', label: 'Applications' },
  { to: '/followup', label: 'Follow Up' },
];

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <nav className="w-full lg:w-[75%] mx-auto md:rounded-full lg:border-2 md:border-blue-800 bg-black/10 backdrop-blur-md shadow sticky top-0 lg:top-4 z-50 lg:px-10 flex justify-between items-center h-16 mb-6">
      <div className="font-bold text-xl md:text-2xl tracking-wide">
        <Link to="/" className="text-purple-400 md:text-purple-500">ReachOut</Link>
      </div>
      <div className="flex gap-6 items-center">
        {user && navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`hover:text-blue-200 transition font-medium ${location.pathname === link.to ? 'text-blue-500' : ''}`}
          >
            {link.label}
          </Link>
        ))}
        {user && (
          <Link to="/logout" className="flex justify-center items-center gap-1 border border-red-500 text-red-500 px-3 py-1.5 rounded hover:bg-red-500 hover:text-white font-semibold transition">
            Logout
            <FiLogOut size={20} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
