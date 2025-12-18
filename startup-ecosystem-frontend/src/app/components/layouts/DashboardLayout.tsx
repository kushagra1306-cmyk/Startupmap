import { useEffect, ReactNode } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { isLoggedIn, logout } from '../../../api/api';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/10 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/50">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  StartupMap
                </h1>
              </div>
            </Link>
            <nav className="flex gap-6 items-center">
              <Link 
                to="/dashboard/businesses" 
                className={`text-white/90 hover:text-white font-medium transition-colors ${
                  location.pathname.includes('/businesses') ? 'text-white' : ''
                }`}
              >
                My Businesses
              </Link>
              <Link 
                to="/dashboard/collaboration-requests" 
                className={`text-white/90 hover:text-white font-medium transition-colors ${
                  location.pathname.includes('/collaboration') ? 'text-white' : ''
                }`}
              >
                Collaborations
              </Link>
              <Link 
                to="/dashboard/notifications" 
                className={`text-white/90 hover:text-white font-medium transition-colors ${
                  location.pathname.includes('/notifications') ? 'text-white' : ''
                }`}
              >
                Notifications
              </Link>
              <button 
                onClick={handleLogout} 
                className="px-5 py-2.5 bg-red-600/20 backdrop-blur-sm border border-red-400/30 hover:bg-red-600/30 text-red-300 font-medium rounded-lg transition-all shadow-lg"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-8 py-12">
        {children}
      </main>
    </div>
  );
}