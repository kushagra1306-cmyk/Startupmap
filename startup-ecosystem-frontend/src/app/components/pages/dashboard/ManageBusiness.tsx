import { useParams, Link } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';

export function ManageBusiness() {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <div>
        {/* Page Header */}
        <div className="mb-8">
          <Link to="/dashboard/businesses" className="text-indigo-300 hover:text-white mb-4 inline-flex items-center gap-2 transition-colors">
            <span>←</span> Back to My Businesses
          </Link>
          <div className="flex items-center justify-between mt-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mb-2">
                EcoTech Manufacturing
              </h1>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-400/30 shadow-lg shadow-green-500/20">
                  Verified
                </span>
                <span className="text-indigo-200/80">Manufacturing</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-lg transition-all shadow-lg">
                Preview
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg shadow-lg shadow-indigo-500/50 hover:scale-105 transition-all font-semibold">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Main Content - 2 columns */}
          <div className="col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-6">Basic Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    defaultValue="EcoTech Manufacturing"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-400/50 focus:outline-none text-white placeholder-white/50 shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-2">
                    Category
                  </label>
                  <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-400/50 focus:outline-none text-white shadow-inner">
                    <option className="bg-slate-800">Manufacturing</option>
                    <option className="bg-slate-800">Design</option>
                    <option className="bg-slate-800">Tech</option>
                    <option className="bg-slate-800">Food & Beverage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    defaultValue="We manufacture eco-friendly products using sustainable materials and processes."
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-400/50 focus:outline-none text-white placeholder-white/50 shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-6">Location Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    defaultValue="123 Green Street"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-400/50 focus:outline-none text-white placeholder-white/50 shadow-inner"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-indigo-200 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      defaultValue="San Francisco"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-400/50 focus:outline-none text-white placeholder-white/50 shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-200 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      defaultValue="94102"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-400/50 focus:outline-none text-white placeholder-white/50 shadow-inner"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-6">Contact Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="contact@ecotech.com"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-400/50 focus:outline-none text-white placeholder-white/50 shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-400/50 focus:outline-none text-white placeholder-white/50 shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    defaultValue="https://ecotech.com"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-400/50 focus:outline-none text-white placeholder-white/50 shadow-inner"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="col-span-1 space-y-6">
            {/* Status Card */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-400/30 p-6 rounded-2xl shadow-xl shadow-green-500/20">
              <h3 className="text-lg font-semibold text-white mb-4">Status</h3>
              <div className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-400/30 rounded-lg mb-4 text-center font-semibold shadow-lg">
                Verified
              </div>
              <p className="text-sm text-indigo-200/70">
                Your business profile has been verified and is visible to other startups.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-sm text-indigo-200/70 mb-1">Profile Views</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">127</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-sm text-indigo-200/70 mb-1">Collaborations</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">8</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-sm text-indigo-200/70 mb-1">Pending Requests</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">3</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg text-left shadow-lg shadow-indigo-500/30 hover:scale-105 transition-all font-semibold">
                  View Public Profile
                </button>
                <button className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-lg text-left transition-all shadow-lg">
                  Share Profile
                </button>
                <button className="w-full px-4 py-2 bg-red-500/10 border border-red-400/30 hover:bg-red-500/20 text-red-300 rounded-lg text-left transition-all shadow-lg shadow-red-500/20">
                  Delete Business
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}