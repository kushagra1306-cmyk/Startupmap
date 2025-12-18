import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { getMyBusinesses, requireAuth } from '../../../../api/api';

interface Business {
  id: string;
  name: string;
  category: string;
  status: 'VERIFIED' | 'NEW' | 'PENDING' | 'REJECTED';
}

export function MyBusinesses() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!requireAuth()) return;
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    try {
      const response = await getMyBusinesses();
      setBusinesses(response.businesses || []);
    } catch (err) {
      console.error('Failed to load businesses:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">My Businesses</h1>
        </div>

        {loading ? (
          <div className="text-white">Loading...</div>
        ) : businesses.length === 0 ? (
          <div className="text-indigo-200">No businesses yet. Create your first one!</div>
        ) : (
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/10 border-b border-white/20">
              <div className="col-span-4 font-semibold text-white">Business Name</div>
              <div className="col-span-3 font-semibold text-white">Category</div>
              <div className="col-span-2 font-semibold text-white">Status</div>
              <div className="col-span-3 font-semibold text-white">Actions</div>
            </div>

            {businesses.map((business) => (
              <div key={business.id} className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-white/10 hover:bg-white/5">
                <div className="col-span-4 text-white">{business.name}</div>
                <div className="col-span-3 text-indigo-200">{business.category}</div>
                <div className="col-span-2">
                  <span className={`px-3 py-1 rounded-lg text-sm ${
                    business.status === 'VERIFIED' ? 'bg-green-500/20 text-green-300' :
                    business.status === 'NEW' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {business.status}
                  </span>
                </div>
                <div className="col-span-3 flex gap-2">
                  <Link to={`/dashboard/businesses/${business.id}`}>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">View</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <Link to="/dashboard/businesses/new">
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold">
              + Add New Business
            </button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}