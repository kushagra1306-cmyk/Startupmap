import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../../../api/api';

export function DashboardLayout({ children }) {
  const navigate = useNavigate();

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
      {/* Your existing layout JSX */}
      
      {/* Add logout button somewhere in header */}
      <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg">
        Logout
      </button>

      {/* Rest of your layout */}
    </div>
  );
}
