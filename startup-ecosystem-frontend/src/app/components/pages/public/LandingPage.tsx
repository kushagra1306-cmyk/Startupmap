// src/app/components/pages/public/LandingPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';
import { login, register } from '../../../../api/api';

export function LandingPage() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(loginEmail, loginPassword);
      // Redirect to dashboard after successful login
      navigate('/dashboard/businesses');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(registerName, registerEmail, registerPassword);
      // Redirect to dashboard after successful registration
      navigate('/dashboard/businesses');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-transparent via-purple-900/20 to-transparent border-b border-white/10">
        <div className="container mx-auto px-8 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="absolute top-10 left-10 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-10 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-700"></div>
            
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
              Discover and Collaborate with Startups Near You
            </h1>
            <p className="text-xl text-indigo-200/90 mb-12 drop-shadow-lg">
              A location-based ecosystem to help startups grow together
            </p>
            
            <div className="flex gap-4 justify-center">
              <Link to="/explore">
                <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/70 hover:scale-105 transform">
                  Explore Nearby Startups
                </button>
              </Link>
              <button
                onClick={() => setShowRegisterModal(true)}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-semibold rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                Register Your Business
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transition-all hover:scale-105 transform overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/50 group-hover:scale-110 transition-transform">
                  📍
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Find startups near your location
                </h3>
                <p className="text-indigo-200/80">
                  Discover businesses in your area using our interactive map-based search tool.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all hover:scale-105 transform overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6 flex items-center justify-center text-3xl shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform">
                  🤝
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Collaborate on raw materials, services, and branding
                </h3>
                <p className="text-indigo-200/80">
                  Connect with other startups to share resources and grow together.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all hover:scale-105 transform overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-6 flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/50 group-hover:scale-110 transition-transform">
                  👁️
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Increase visibility for early-stage businesses
                </h3>
                <p className="text-indigo-200/80">
                  Get discovered by potential partners and customers in your ecosystem.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative bg-gradient-to-b from-white/5 to-transparent border-y border-white/10 py-16 backdrop-blur-sm">
        <div className="container mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-12 relative">
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold shadow-xl shadow-indigo-500/50 relative z-10 border-4 border-slate-900">
                1
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Register your business
              </h3>
              <p className="text-indigo-200/70">
                Create a profile with your business details and location
              </p>
            </div>

            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold shadow-xl shadow-purple-500/50 relative z-10 border-4 border-slate-900">
                2
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Explore nearby startups on the map
              </h3>
              <p className="text-indigo-200/70">
                Browse and discover businesses in your area by category
              </p>
            </div>

            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-red-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold shadow-xl shadow-pink-500/50 relative z-10 border-4 border-slate-900">
                3
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Send collaboration requests
              </h3>
              <p className="text-indigo-200/70">
                Connect directly with startups to explore partnerships
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-8">
          <div className="relative bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-white/20 p-16 text-center rounded-3xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
                Ready to grow together?
              </h2>
              <p className="text-lg text-indigo-200/90 mb-8">
                Join our startup ecosystem platform today
              </p>
              <button
                onClick={() => setShowRegisterModal(true)}
                className="px-10 py-4 bg-gradient-to-r from-white to-indigo-100 text-slate-900 font-bold rounded-xl hover:scale-105 transform transition-all shadow-2xl hover:shadow-white/50"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
            
            {error && (
              <div className="bg-red-500/20 border border-red-400/30 text-red-300 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-2">Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-400/50 focus:outline-none text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-2">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-400/50 focus:outline-none text-white"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg font-semibold disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Login'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLoginModal(false);
                    setError('');
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>

            <p className="text-center text-indigo-200/70 text-sm mt-4">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setShowRegisterModal(true);
                }}
                className="text-indigo-400 hover:text-indigo-300"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Register</h2>
            
            {error && (
              <div className="bg-red-500/20 border border-red-400/30 text-red-300 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-2">Name</label>
                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-400/50 focus:outline-none text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-2">Email</label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-400/50 focus:outline-none text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-2">Password</label>
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-400/50 focus:outline-none text-white"
                  required
                  minLength={6}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg font-semibold disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Register'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowRegisterModal(false);
                    setError('');
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>

            <p className="text-center text-indigo-200/70 text-sm mt-4">
              Already have an account?{' '}
              <button
                onClick={() => {
                  setShowRegisterModal(false);
                  setShowLoginModal(true);
                }}
                className="text-indigo-400 hover:text-indigo-300"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}
