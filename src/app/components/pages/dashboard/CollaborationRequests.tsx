import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { getSentRequests, getReceivedRequests, respondToRequest, requireAuth } from '../../../api/api';

export function CollaborationRequests() {
  const [activeTab, setActiveTab] = useState('received');
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!requireAuth()) return;
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const [received, sent] = await Promise.all([
        getReceivedRequests(),
        getSentRequests(),
      ]);
      setReceivedRequests(received.requests || []);
      setSentRequests(sent.requests || []);
    } catch (err) {
      console.error('Failed to load requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (requestId, status) => {
    try {
      await respondToRequest(requestId, status);
      alert(`Request ${status.toLowerCase()}!`);
      loadRequests(); // Reload
    } catch (err) {
      alert('Failed to respond: ' + err.message);
    }
  };

  const requests = activeTab === 'received' ? receivedRequests : sentRequests;

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Collaboration Requests</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('received')}
            className={`px-6 py-3 rounded-xl font-semibold ${
              activeTab === 'received'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                : 'bg-white/10 text-white/70'
            }`}
          >
            Received
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`px-6 py-3 rounded-xl font-semibold ${
              activeTab === 'sent'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                : 'bg-white/10 text-white/70'
            }`}
          >
            Sent
          </button>
        </div>

        {/* Request Cards */}
        {loading ? (
          <div className="text-white">Loading...</div>
        ) : requests.length === 0 ? (
          <div className="text-center text-indigo-200 py-12">No requests found</div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {activeTab === 'received' ? 'From:' : 'To:'}{' '}
                      {activeTab === 'received'
                        ? request.senderBusiness?.name
                        : request.receiverBusiness?.name}
                    </h3>
                    <p className="text-indigo-200 mb-2">Type: {request.requestType}</p>
                    <p className="text-white/90 mb-2">{request.message}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-sm ${
                    request.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-300' :
                    request.status === 'ACCEPTED' ? 'bg-green-500/20 text-green-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {request.status}
                  </span>
                </div>

                {activeTab === 'received' && request.status === 'PENDING' && (
                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => handleRespond(request.id, 'ACCEPTED')}
                      className="px-5 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRespond(request.id, 'REJECTED')}
                      className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
