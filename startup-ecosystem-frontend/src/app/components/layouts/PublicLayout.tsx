import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
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
            <nav className="flex gap-8 items-center">
              <Link 
                to="/explore" 
                className={`relative text-white/90 hover:text-white font-medium transition-colors ${
                  location.pathname === '/explore' ? 'text-white' : ''
                }`}
              >
                Explore
                {location.pathname === '/explore' && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                )}
              </Link>
              <Link 
                to="/dashboard/businesses" 
                className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl hover:shadow-purple-500/20"
              >
                Register Business
              </Link>
              <Link 
                to="/dashboard/businesses" 
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/70"
              >
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">{children}</main>

      {/* Footer */}
      <footer className="relative bg-white/5 backdrop-blur-xl border-t border-white/10 mt-16">
        <div className="container mx-auto px-8 py-12">
          <div className="flex gap-12 justify-center">
            <Link to="/about" className="text-white/60 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-white/60 hover:text-white transition-colors">
              Contact
            </Link>
            <Link to="/privacy" className="text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
          <div className="text-center mt-6 text-white/40 text-sm">
            © 2025 StartupMap. Building the future together.
          </div>
        </div>
      </footer>
    </div>
  );
}