import { Link } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';

export function LandingPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-transparent via-purple-900/20 to-transparent border-b border-white/10">
        <div className="container mx-auto px-8 py-24">
          <div className="max-w-3xl mx-auto text-center">
            {/* Decorative dots */}
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
              <Link to="/dashboard/businesses">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-semibold rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform">
                  Register Your Business
                </button>
              </Link>
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
            {/* Connection lines */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
            
            {/* Step 1 */}
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

            {/* Step 2 */}
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

            {/* Step 3 */}
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
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
                Ready to grow together?
              </h2>
              <p className="text-lg text-indigo-200/90 mb-8">
                Join our startup ecosystem platform today
              </p>
              <Link to="/dashboard/businesses">
                <button className="px-10 py-4 bg-gradient-to-r from-white to-indigo-100 text-slate-900 font-bold rounded-xl hover:scale-105 transform transition-all shadow-2xl hover:shadow-white/50">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}