import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';

const mockBusinesses = [
  { id: 1, name: 'EcoTech Manufacturing', category: 'Manufacturing', status: 'Verified' },
  { id: 2, name: 'Urban Design Studio', category: 'Design', status: 'New' },
  { id: 3, name: 'CloudSync Solutions', category: 'Tech', status: 'Verified' },
];

export function MyBusinesses() {
  return (
    <DashboardLayout>
      <div>
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mb-2">
            My Businesses
          </h1>
          <p className="text-indigo-200/80">Manage and grow your startups</p>
        </div>

        {/* Business List */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/10 border-b border-white/20">
            <div className="col-span-4 font-semibold text-white">Business Name</div>
            <div className="col-span-3 font-semibold text-white">Category</div>
            <div className="col-span-2 font-semibold text-white">Status</div>
            <div className="col-span-3 font-semibold text-white">Actions</div>
          </div>

          {/* Business Rows */}
          {mockBusinesses.map((business, index) => (
            <div
              key={business.id}
              className="group grid grid-cols-12 gap-4 px-6 py-5 border-b border-white/10 hover:bg-white/5 transition-all"
            >
              <div className="col-span-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${
                    index === 0 ? 'from-blue-500 to-cyan-600' :
                    index === 1 ? 'from-purple-500 to-pink-600' :
                    'from-indigo-500 to-blue-600'
                  } rounded-xl flex items-center justify-center shadow-lg ${
                    index === 0 ? 'shadow-blue-500/50' :
                    index === 1 ? 'shadow-purple-500/50' :
                    'shadow-indigo-500/50'
                  } group-hover:scale-110 transition-transform`}>
                    <span className="text-white text-xs font-bold">
                      {business.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-white group-hover:text-indigo-300 transition-colors">
                    {business.name}
                  </span>
                </div>
              </div>
              <div className="col-span-3 flex items-center">
                <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-sm text-indigo-200">
                  {business.category}
                </span>
              </div>
              <div className="col-span-2 flex items-center">
                <span
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
                    business.status === 'Verified'
                      ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-400/30 shadow-lg shadow-green-500/20'
                      : business.status === 'New'
                      ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-400/30 shadow-lg shadow-blue-500/20'
                      : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border border-red-400/30 shadow-lg shadow-red-500/20'
                  }`}
                >
                  {business.status}
                </span>
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <Link to={`/dashboard/businesses/${business.id}`}>
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 rounded-lg shadow-lg shadow-indigo-500/30 hover:scale-105 transition-all">
                    View
                  </button>
                </Link>
                <button className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-lg transition-all shadow-lg">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Business Button */}
        <div className="mt-6">
          <button className="group relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl flex items-center gap-2 shadow-2xl shadow-indigo-500/50 hover:scale-105 transition-all overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative text-xl">+</span>
            <span className="relative font-semibold">Add New Business</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}