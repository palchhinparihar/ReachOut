import React from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FaHeart } from "react-icons/fa";

const footerLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/about', label: 'About' },
  { to: '/form', label: 'Add Application' },
  { to: '/applications', label: 'Applications' },
  { to: '/followup', label: 'Follow Up' },
];

const Footer = () => {
  const { user } = useAuth();
  
  return (
    <footer className="border-t border-gray-800 mt-16 backdrop-blur-xs bg-black/5">
      <div className="w-full md:w-3/4 mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-400">
        {/* Project Name & About */}
        <div className="flex flex-col h-full justify-between">
          <div>
            <h2 className="text-lg font-semibold text-blue-500 mb-2">ReachOut</h2>
            <p className="mb-4">
              ReachOut is your companion for managing job and program applications. We help you stay organized, follow up professionally, and access the best resources for every step of your journey.
            </p>
          </div>
          <p className="mt-3 text-xs">© {new Date().getFullYear()} ReachOut</p>
        </div>

        {/* About & all */}
        <div className="flex flex-col h-full justify-center items-start">
          <h3 className="text-white font-semibold mb-3">Explore</h3>
          <div className="flex flex-col gap-2">
            {user && footerLinks.map(link => (
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
        </div>

        {/* Resources & Tips */}
        <div className="flex flex-col h-full justify-center items-start">
          <h3 className="text-white font-semibold mb-3">Resources & Tips</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://resumegenius.com/resume-help/resume-tips" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">Resume Writing Tips</a>
            </li>
            <li>
              <a href="https://www.indeed.com/career-advice/interviewing" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">Interview Preparation</a>
            </li>
            <li>
              <a href="https://www.livecareer.com/resources/cover-letters/how-to/write" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">Cover Letter Help</a>
            </li>
            <li>
              <a href="https://www.grammarly.com/blog/email-writing/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">Professional Email Tips</a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col h-full justify-between items-end md:items-end">
          <div className="flex-1"></div>
          <div className="flex flex-col items-end">
            <h3 className="text-white font-semibold mb-3">Connect</h3>

            <div className="flex gap-2">
              <a href="https://github.com/palchhinparihar/ReachOut" target="_blank" rel="noreferrer" className="hover:text-blue-500 hover:scale-105 transition duration-300">
                <FiGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/palchhinparihar" target="_blank" rel="noreferrer" className="hover:text-blue-500 hover:scale-105 transition duration-300">
                <FiLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs md:text-sm text-center mt-2 mb-6 pt-3 border-t border-gray-500 w-1/4 mx-auto text-gray-400">
        Made with {" "}
        <FaHeart className="inline text-red-500" />{" "}
        by Palchhin 
      </div>
    </footer>
  );
};

export default Footer;
