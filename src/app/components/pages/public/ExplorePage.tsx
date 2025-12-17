import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';

const mockBusinesses = [
  {
    id: 1,
    name: 'EcoTech Manufacturing',
    category: 'Manufacturing',
    description: 'Sustainable manufacturing solutions for eco-friendly products',
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 2,
    name: 'Urban Design Studio',
    category: 'Design',
    description: 'Creative branding and packaging design for modern businesses',
    lat: 40.758,
    lng: -73.9855,
  },
  {
    id: 3,
    name: 'CloudSync Solutions',
    category: 'Tech',
    description: 'Cloud infrastructure and software development services',
    lat: 40.7489,
    lng: -73.968,
  },
  {
    id: 4,
    name: 'GreenLeaf Foods',
    category: 'Food & Beverage',
    description: 'Organic food production and local farm-to-table partnerships',
    lat: 40.7614,
    lng: -73.9776,
  },
  {
    id: 5,
    name: 'MetalWorks Co',
    category: 'Manufacturing',
    description: 'Industrial metal fabrication and custom manufacturing',
    lat: 40.7356,
    lng: -74.0027,
  },
];

const categoryColors: Record<string, { gradient: string; badge: string; glow: string }> = {
  Manufacturing: { gradient: 'from-blue-500 to-cyan-600', badge: 'bg-blue-500/20 text-blue-300 border-blue-400/30', glow: 'shadow-blue-500/50' },
  Design: { gradient: 'from-purple-500 to-pink-600', badge: 'bg-purple-500/20 text-purple-300 border-purple-400/30', glow: 'shadow-purple-500/50' },
  Tech: { gradient: 'from-indigo-500 to-blue-600', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30', glow: 'shadow-indigo-500/50' },
  'Food & Beverage': { gradient: 'from-green-500 to-emerald-600', badge: 'bg-green-500/20 text-green-300 border-green-400/30', glow: 'shadow-green-500/50' },
};

export function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [radiusFilter, setRadiusFilter] = useState('10');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBusinesses =
    selectedCategory === 'all'
      ? mockBusinesses
      : mockBusinesses.filter((b) => b.category === selectedCategory);

  return (
    <PublicLayout>
      <div className="h-[calc(100vh-80px)]">
        <div className="container mx-auto px-8 py-8 h-full">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
              Explore Startups
            </h1>
          </div>

          {/* Filters and Search */}
          <div className="flex gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="relative w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:border-indigo-400/50 focus:outline-none text-white placeholder-white/50 shadow-xl"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <label className="text-white/90 font-medium">Category:</label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:border-indigo-400/50 focus:outline-none text-white shadow-xl appearance-none pr-10 cursor-pointer"
                >
                  <option value="all" className="bg-slate-800">All Categories</option>
                  <option value="Manufacturing" className="bg-slate-800">Manufacturing</option>
                  <option value="Design" className="bg-slate-800">Design</option>
                  <option value="Tech" className="bg-slate-800">Tech</option>
                  <option value="Food & Beverage" className="bg-slate-800">Food & Beverage</option>
                </select>
              </div>
            </div>

            {/* Radius Filter */}
            <div className="flex items-center gap-2">
              <label className="text-white/90 font-medium">Radius:</label>
              <div className="relative">
                <select
                  value={radiusFilter}
                  onChange={(e) => setRadiusFilter(e.target.value)}
                  className="px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:border-indigo-400/50 focus:outline-none text-white shadow-xl appearance-none pr-10 cursor-pointer"
                >
                  <option value="5" className="bg-slate-800">5 miles</option>
                  <option value="10" className="bg-slate-800">10 miles</option>
                  <option value="25" className="bg-slate-800">25 miles</option>
                  <option value="50" className="bg-slate-800">50 miles</option>
                </select>
              </div>
            </div>
          </div>

          {/* Map and Business Cards */}
          <div className="grid grid-cols-3 gap-6 h-[calc(100%-180px)]">
            {/* Business Cards Sidebar */}
            <div className="col-span-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-indigo-500/50 scrollbar-track-white/5">
              {filteredBusinesses.length > 0 ? (
                filteredBusinesses.map((business) => {
                  const colors = categoryColors[business.category];
                  return (
                    <Link key={business.id} to={`/business/${business.id}`}>
                      <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/20 hover:border-indigo-400/50 transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] transform overflow-hidden">
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-all`}></div>
                        <div className="relative">
                          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                            {business.name}
                          </h3>
                          <div className="mb-3">
                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${colors.badge}`}>
                              {business.category}
                            </span>
                          </div>
                          <p className="text-indigo-200/70 text-sm mb-4">{business.description}</p>
                          <button className={`px-4 py-2 bg-gradient-to-r ${colors.gradient} text-white rounded-lg text-sm w-full font-semibold shadow-lg ${colors.glow} hover:scale-105 transform transition-all`}>
                            View Profile
                          </button>
                        </div>
                        <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${colors.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`}></div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 text-center rounded-2xl shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                    🔍
                  </div>
                  <p className="text-white font-medium mb-2">No businesses found</p>
                  <p className="text-indigo-200/60 text-sm">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>

            {/* Map */}
            <div className="col-span-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 overflow-hidden relative rounded-2xl shadow-2xl">
              {/* Map Placeholder - Enhanced Wireframe */}
              <div className="h-full w-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 relative">
                {/* Grid lines to simulate map */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-6">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-white/5"></div>
                  ))}
                </div>

                {/* Map title */}
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-xl shadow-xl">
                  <span className="font-semibold text-white">📍 Startup Locations Map</span>
                </div>

                {/* Zoom controls */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-xl">
                  <button className="w-10 h-10 border-b border-white/20 bg-transparent hover:bg-white/10 flex items-center justify-center text-xl font-bold text-white transition-all">
                    +
                  </button>
                  <button className="w-10 h-10 bg-transparent hover:bg-white/10 flex items-center justify-center text-xl font-bold text-white transition-all">
                    −
                  </button>
                </div>

                {/* Mock map markers with labels */}
                {filteredBusinesses.slice(0, 5).map((business, index) => {
                  const positions = [
                    { top: '25%', left: '30%' },
                    { top: '35%', left: '65%' },
                    { top: '60%', left: '45%' },
                    { top: '50%', left: '75%' },
                    { top: '70%', left: '25%' },
                  ];
                  const colors = categoryColors[business.category];
                  return (
                    <div
                      key={business.id}
                      className="absolute group cursor-pointer"
                      style={positions[index]}
                    >
                      <div className="relative">
                        <div className={`w-8 h-8 bg-gradient-to-br ${colors.gradient} rounded-full border-4 border-white shadow-2xl ${colors.glow} group-hover:scale-125 transition-transform`}></div>
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 px-3 py-2 rounded-xl shadow-2xl whitespace-nowrap text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="font-semibold text-white">{business.name}</p>
                          <p className="text-xs text-indigo-200/80">{business.category}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Decorative elements */}
                <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-xl shadow-xl">
                  <span className="text-xs text-white/80">
                    <span className="font-semibold text-indigo-300">{filteredBusinesses.length}</span> startups nearby
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}