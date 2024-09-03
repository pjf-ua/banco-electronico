import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SideBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-gray-800 text-white shadow-md rounded-sm">
      <h2 className="text-2xl font-semibold text-center my-6">Banco Electrónico</h2>
      <nav>
        <ul className="space-y-4">
          {user && (
            <>
              <li>
                <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-4 hover:bg-red-900 rounded bg-red-700"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!user && (
            <li>
              <Link to="/" className="block py-2 px-4 hover:bg-gray-700 rounded">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
