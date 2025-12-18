import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';
import { getBusinessById, sendCollaborationRequest, isLoggedIn } from '../../../../api/api';

interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  city: string;
  contactEmail: string;
}

export function BusinessProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);

  // Collaboration request form
  const [requestType, setRequestType] = useState('');
  const [message, setMessage] = useState('');
  const [senderBusinessId, setSenderBusinessId] = useState('');

  useEffect(() => {
    loadBusiness();
  }, [id]);

  const loadBusiness = async () => {
    try {
      setLoading(true);
      const response = await getBusinessById(id!);
      setBusiness(response.business);
    } catch (err) {
      setError('Failed to load business');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn()) {
      alert('Please login first');
      navigate('/');
      return;
    }

    try {
      await sendCollaborationRequest({
        senderBusinessId: parseInt(senderBusinessId),
        receiverBusinessId: parseInt(id!),
        requestType,
        message,
      });
      alert('Collaboration request sent!');
      setShowRequestModal(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      alert('Failed to send request: ' + errorMessage);
    }
  };

  if (loading) return <PublicLayout><div className="text-white">Loading...</div></PublicLayout>;
  if (error) return <PublicLayout><div className="text-red-300">{error}</div></PublicLayout>;
  if (!business) return <PublicLayout><div className="text-white">Business not found</div></PublicLayout>;

  return (
    <PublicLayout>
      <div className="container mx-auto px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">{business.name}</h1>
          <p className="text-indigo-200 mb-6">{business.category}</p>
          <p className="text-white/90 mb-4">{business.description}</p>
          <p className="text-indigo-200/70 mb-2">📍 {business.city}</p>
          <p className="text-indigo-200/70 mb-6">📧 {business.contactEmail}</p>

          <button
            onClick={() => setShowRequestModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold"
          >
            Send Collaboration Request
          </button>
        </div>
      </div>

      {/* Collaboration Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-6">Send Collaboration Request</h2>
            
            <form onSubmit={handleSendRequest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-2">Your Business ID</label>
                <input
                  type="number"
                  value={senderBusinessId}
                  onChange={(e) => setSenderBusinessId(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-2">Request Type</label>
                <input
                  type="text"
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  placeholder="e.g., Design Collaboration"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-2">Message</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button type="submit" className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold">
                  Send Request
                </button>
                <button type="button" onClick={() => setShowRequestModal(false)} className="px-4 py-2 bg-white/10 text-white rounded-lg">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}