import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiHome, FiPlus, FiGrid, FiZap, FiActivity } from 'react-icons/fi';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const dashboardPath = user?.role === 'admin' ? '/admin-dashboard' : '/employee-dashboard';
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="group flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-950/30 transition group-hover:scale-105">
              <FiZap size={20} />
            </span>
            <div>
              <div className="text-lg font-semibold tracking-tight text-white">Helpdesk</div>
              <div className="text-xs text-slate-400">Corporate support portal</div>
            </div>
          </Link>
          {isAuthenticated && (
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
              <Link
                to={dashboardPath}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <FiGrid size={16} /> Dashboard
              </Link>
              <Link
                to="/ticket-tracking"
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <FiActivity size={16} /> Tracking
              </Link>
              {user?.role !== 'admin' && (
                <Link
                  to="/create-ticket"
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  <FiPlus size={16} /> New Ticket
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {isAuthenticated ? (
            <>
              <div className="hidden rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 sm:block">
                {user?.username} · <span className="capitalize">{user?.role}</span>
              </div>
              <div className="md:hidden">
                <Link
                  to={dashboardPath}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:bg-white/10"
                >
                  <FiHome size={18} />
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="soft-button-secondary"
              >
                <FiLogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-300 transition hover:text-white">
                Login
              </Link>
              <Link
                to="/register"
                className="soft-button-primary px-4 py-2 text-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
