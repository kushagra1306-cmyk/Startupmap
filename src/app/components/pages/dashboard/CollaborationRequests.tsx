import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';

const mockRequestsReceived = [
  {
    id: 1,
    businessName: 'MetalWorks Inc',
    type: 'Raw material sourcing',
    message: 'We need aluminum sheets for our manufacturing process. Can you supply?',
    status: 'Pending',
    date: '2 days ago',
  },
  {
    id: 2,
    businessName: 'PrintPro Design',
    type: 'Design collaboration',
    message: 'Looking to collaborate on packaging design for our new product line.',
    status: 'Pending',
    date: '3 days ago',
  },
  {
    id: 3,
    businessName: 'TechBridge Solutions',
    type: 'Partnership',
    message: 'Interested in forming a strategic partnership for our enterprise clients.',
    status: 'Accepted',
    date: '1 week ago',
  },
];

const mockRequestsSent = [
  {
    id: 4,
    businessName: 'GreenEnergy Co',
    type: 'Equipment rental',
    message: 'Need to rent industrial equipment for a 3-month project.',
    status: 'Pending',
    date: '4 days ago',
  },
  {
    id: 5,
    businessName: 'LogiTrans Shipping',
    type: 'Logistics partnership',
    message: 'Looking for reliable logistics partner for our distribution network.',
    status: 'Rejected',
    date: '2 weeks ago',
  },
];

export function CollaborationRequests() {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');

  const requests = activeTab === 'received' ? mockRequestsReceived : mockRequestsSent;

  return (
    <DashboardLayout>
      <div>
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mb-2">
            Collaboration Requests
          </h1>
          <p className="text-indigo-200/80">Manage incoming and outgoing requests</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('received')}
            className={`relative px-6 py-3 font-semibold rounded-xl transition-all ${
              activeTab === 'received'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/50'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
          >
            Received
            {activeTab === 'received' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`relative px-6 py-3 font-semibold rounded-xl transition-all ${
              activeTab === 'sent'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/50'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
          >
            Sent
            {activeTab === 'sent' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full"></div>
            )}
          </button>
        </div>

        {/* Request Cards */}
        <div className="space-y-4">
          {requests.map((request, index) => (
            <div key={request.id} className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/20 hover:border-indigo-400/50 shadow-xl hover:shadow-2xl transition-all overflow-hidden">
              {/* Decorative background */}
              <div className={`absolute top-0 right-0 w-64 h-64 ${
                index % 3 === 0 ? 'bg-indigo-500/10' :
                index % 3 === 1 ? 'bg-purple-500/10' :
                'bg-cyan-500/10'
              } rounded-full blur-3xl group-hover:opacity-50 transition-opacity`}></div>
              
              <div className="relative flex items-start justify-between mb-4">
                <div className="flex gap-4 flex-1">
                  {/* Business Avatar */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${
                    index % 3 === 0 ? 'from-indigo-500 to-purple-600' :
                    index % 3 === 1 ? 'from-purple-500 to-pink-600' :
                    'from-cyan-500 to-blue-600'
                  } rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                    index % 3 === 0 ? 'shadow-indigo-500/50' :
                    index % 3 === 1 ? 'shadow-purple-500/50' :
                    'shadow-cyan-500/50'
                  } group-hover:scale-110 transition-transform`}>
                    <span className="text-white font-bold text-lg">
                      {request.businessName.charAt(0)}
                    </span>
                  </div>

                  {/* Request Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {activeTab === 'received' ? 'From:' : 'To:'} {request.businessName}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                          request.status === 'Pending'
                            ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'
                            : request.status === 'Accepted'
                            ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                            : 'bg-red-500/20 text-red-300 border border-red-400/30'
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>

                    <p className="text-sm text-indigo-200/70 mb-3">
                      <span className="font-medium text-indigo-300">Type:</span> {request.type}
                    </p>

                    <p className="text-white/90 mb-3">{request.message}</p>

                    <p className="text-sm text-indigo-200/50">{request.date}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {activeTab === 'received' && request.status === 'Pending' && (
                <div className="relative flex gap-3 pt-4 border-t border-white/10">
                  <button className="px-5 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg shadow-lg shadow-green-500/30 hover:scale-105 transition-all font-semibold">
                    Accept
                  </button>
                  <button className="px-5 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white rounded-lg shadow-lg shadow-red-500/30 hover:scale-105 transition-all font-semibold">
                    Reject
                  </button>
                  <button className="px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-lg ml-auto transition-all shadow-lg">
                    View Details
                  </button>
                </div>
              )}

              {activeTab === 'sent' && (
                <div className="relative flex gap-3 pt-4 border-t border-white/10">
                  <button className="px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-lg transition-all shadow-lg">
                    View Details
                  </button>
                  {request.status === 'Pending' && (
                    <button className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg shadow-lg shadow-indigo-500/30 hover:scale-105 transition-all font-semibold">
                      Cancel Request
                    </button>
                  )}
                </div>
              )}
              
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${
                index % 3 === 0 ? 'from-indigo-500 to-purple-500' :
                index % 3 === 1 ? 'from-purple-500 to-pink-500' :
                'from-cyan-500 to-blue-500'
              } transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`}></div>
            </div>
          ))}

          {/* Empty State */}
          {requests.length === 0 && (
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-12 text-center rounded-2xl shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                📭
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No requests {activeTab === 'received' ? 'received' : 'sent'} yet
              </h3>
              <p className="text-indigo-200/70">
                {activeTab === 'received'
                  ? 'When businesses send you collaboration requests, they will appear here.'
                  : 'Start exploring nearby startups to send collaboration requests.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}