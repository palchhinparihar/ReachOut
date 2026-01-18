import React from 'react';
import { Link, NavLink } from 'react-router-dom';
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

  return (
    <nav className="w-full lg:w-[75%] backdrop-blur-xl bg-black/10 mx-auto md:rounded-full lg:border-2 md:border-blue-800 shadow sticky top-0 lg:top-4 z-50 lg:px-10 flex justify-between items-center h-16 mb-6">
      <div className="flex gap-6 text-xs md:text-base items-center">
        <div className="font-bold text-xl md:text-2xl tracking-wide">
          <Link to="/" className="text-purple-400 md:text-purple-500">ReachOut</Link>
        </div>
        {user && navLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `hover:text-blue-200 transition font-medium ${isActive ? 'text-blue-500' : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {user && (
        <div className="flex items-center gap-2">
          <p>Welcome, {(user?.name && user?.name.split(' ')[0]) || user?.email.split('@')[0]}</p>
          <Link to="/logout" title="Wanna log out?" className="flex justify-center items-center gap-1 border border-red-500 text-red-500 px-3 py-1.5 rounded hover:bg-red-500 hover:text-white font-semibold transition">
            <FiLogOut size={20} />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
