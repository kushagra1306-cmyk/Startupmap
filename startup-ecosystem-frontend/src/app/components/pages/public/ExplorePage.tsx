import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';
import { getAllBusinesses } from '../../../../api/api';

export function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    try {
      setLoading(true);
      const response = await getAllBusinesses();
      setBusinesses(response.businesses || []);
    } catch (err: any) {
      setError('Failed to load businesses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBusinesses = businesses.filter((b: any) => {
    if (selectedCategory !== 'all' && b.category !== selectedCategory) return false;
    if (searchQuery && !b.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const categories = ['all', 'Manufacturing', 'Design', 'Tech', 'Food & Beverage'];

  return (
    <PublicLayout>
      <div className="container mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Explore Startups</h1>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Search businesses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-800">
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Loading/Error States */}
        {loading && (
          <div className="text-center text-white py-8">Loading businesses...</div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-400/30 text-red-300 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Business Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.length === 0 ? (
              <div className="col-span-full text-center text-indigo-200 py-12">
                No businesses found
              </div>
            ) : (
              filteredBusinesses.map((business: any) => (
                <Link 
                  key={business.id} 
                  to={`/business/${business.id}`}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/20 hover:border-indigo-400/50 transition-all hover:scale-105"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {business.name}
                  </h3>
                  <p className="text-indigo-200 mb-2">{business.category}</p>
                  <p className="text-white/80 text-sm mb-2">{business.description}</p>
                  <p className="text-indigo-200/70 text-sm">📍 {business.city}</p>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}