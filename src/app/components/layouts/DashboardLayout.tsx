import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard/businesses', label: 'My Businesses', icon: '🏢' },
    { path: '/dashboard/collaboration-requests', label: 'Collaborations', icon: '🤝' },
    { path: '/dashboard/notifications', label: 'Notifications', icon: '🔔' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Top Navigation */}
      <header className="relative bg-white/10 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-purple-900/20">
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
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-lg transition-all shadow-lg">
                Profile
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                <span className="text-white text-sm font-bold">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/10 min-h-screen relative">
          <nav className="p-6">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <div
                    className={`group relative px-4 py-3 rounded-xl transition-all ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {isActive(item.path) && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 relative">{children}</main>
      </div>
    </div>
  );
}