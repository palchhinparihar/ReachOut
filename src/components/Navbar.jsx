import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/form', label: 'Add Application' },
  { to: '/applications', label: 'Applications' },
  { to: '/followup', label: 'Follow Up' },
];

const Navbar = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on navigation
  const handleNavClick = () => setMenuOpen(false);

  return (
    <nav className="w-full lg:w-[75%] backdrop-blur-xl bg-black/10 mx-auto lg:rounded-full lg:border-2 lg:border-blue-800 shadow sticky top-0 lg:top-4 z-50 lg:px-10 flex flex-col lg:flex-row items-center h-auto lg:h-16 mb-6 py-2 lg:py-0">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="font-bold text-xl md:text-2xl tracking-wide">
          <Link to="/" className="ml-4 lg:ml-0 text-purple-400 md:text-purple-500">ReachOut</Link>
        </div>

        {/* Hamburger icon for mobile */}
        {user && (
          <button
            className="lg:hidden p-2 mr-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        )}
      </div>

      {user && (
        <div
          className={`w-full lg:flex items-center px-4 lg:px-0 transition-all duration-200
      ${menuOpen ? 'flex flex-col gap-4' : 'hidden'} lg:flex`}
        >

          {/* LEFT: Title */}
          <div className="hidden lg:flex items-center">
            {/* already rendered above for mobile */}
          </div>

          {/* CENTER: Nav links */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-center
                    lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `hover:text-blue-200 transition font-medium ${isActive ? 'text-blue-500' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* RIGHT: User info */}
          <div className="flex justify-center items-center w-full lg:w-auto gap-2 mt-2 lg:mt-0 ml-auto">
            <p className="text-xs md:text-base">
              Welcome, {(user?.name && user?.name.split(' ')[0]) || user?.email.split('@')[0]}
            </p>
            <Link
              to="/logout"
              title="Wanna log out?"
              className="flex justify-center items-center gap-1 border border-red-500 text-red-500 px-2 py-1.5 rounded hover:bg-red-500 hover:text-white font-semibold transition"
            >
              <FiLogOut size={20} />
            </Link>
          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
