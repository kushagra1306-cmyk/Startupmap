import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';
import { getAllBusinesses } from '../../../api/api';

// Keep all your existing interfaces and data...
// Just replace the mockBusinesses part:

export function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [radiusFilter, setRadiusFilter] = useState('10');
  const [searchQuery, setSearchQuery] = useState('');
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch businesses on page load
  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    try {
      setLoading(true);
      const response = await getAllBusinesses();
      setBusinesses(response.businesses || []);
    } catch (err) {
      setError('Failed to load businesses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter businesses
  const filteredBusinesses = businesses.filter((b) => {
    if (selectedCategory !== 'all' && b.category !== selectedCategory) return false;
    if (searchQuery && !b.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Keep all your existing JSX but replace mockBusinesses with filteredBusinesses
  // and add loading/error states:

  return (
    <PublicLayout>
      {/* Your existing header code... */}

      {loading && (
        <div className="text-center text-white py-8">Loading businesses...</div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-400/30 text-red-300 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Map filteredBusinesses instead of mockBusinesses */}
      {filteredBusinesses.map((business) => (
        <Link key={business.id} to={`/business/${business.id}`}>
          {/* Your existing card JSX */}
        </Link>
      ))}
    </PublicLayout>
  );
}
