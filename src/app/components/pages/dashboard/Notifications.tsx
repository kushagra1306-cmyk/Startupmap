import { DashboardLayout } from '../../layouts/DashboardLayout';

const mockNotifications = [
  {
    id: 1,
    type: 'request',
    title: 'New collaboration request',
    message: 'MetalWorks Inc sent you a collaboration request for raw material sourcing',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'accepted',
    title: 'Request accepted',
    message: 'TechBridge Solutions accepted your partnership request',
    time: '5 hours ago',
    read: false,
  },
  {
    id: 3,
    type: 'system',
    title: 'Profile verified',
    message: 'Your business profile "EcoTech Manufacturing" has been verified',
    time: '1 day ago',
    read: true,
  },
  {
    id: 4,
    type: 'message',
    title: 'New message',
    message: 'PrintPro Design sent you a message about your design collaboration request',
    time: '2 days ago',
    read: true,
  },
  {
    id: 5,
    type: 'rejected',
    title: 'Request declined',
    message: 'LogiTrans Shipping declined your logistics partnership request',
    time: '3 days ago',
    read: true,
  },
];

const getNotificationStyle = (type: string) => {
  const styles = {
    request: { bg: 'from-blue-500/20 to-cyan-500/20', icon: '📨', iconBg: 'from-blue-500 to-cyan-600', shadow: 'shadow-blue-500/50' },
    accepted: { bg: 'from-green-500/20 to-emerald-500/20', icon: '✅', iconBg: 'from-green-500 to-emerald-600', shadow: 'shadow-green-500/50' },
    rejected: { bg: 'from-red-500/20 to-pink-500/20', icon: '❌', iconBg: 'from-red-500 to-pink-600', shadow: 'shadow-red-500/50' },
    system: { bg: 'from-purple-500/20 to-indigo-500/20', icon: '⚙️', iconBg: 'from-purple-500 to-indigo-600', shadow: 'shadow-purple-500/50' },
    message: { bg: 'from-indigo-500/20 to-purple-500/20', icon: '💬', iconBg: 'from-indigo-500 to-purple-600', shadow: 'shadow-indigo-500/50' },
  };
  return styles[type as keyof typeof styles] || styles.message;
};

export function Notifications() {
  return (
    <DashboardLayout>
      <div>
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mb-2">
              Notifications
            </h1>
            <p className="text-indigo-200/80">Stay updated with your business activities</p>
          </div>
          <button className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-lg transition-all shadow-lg">
            Mark all as read
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg shadow-indigo-500/50 font-semibold">
            All
          </button>
          <button className="px-4 py-2 bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 hover:text-white rounded-lg transition-all">
            Unread
          </button>
          <button className="px-4 py-2 bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 hover:text-white rounded-lg transition-all">
            Requests
          </button>
          <button className="px-4 py-2 bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 hover:text-white rounded-lg transition-all">
            Messages
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {mockNotifications.map((notification) => {
            const style = getNotificationStyle(notification.type);
            return (
              <div
                key={notification.id}
                className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 rounded-2xl flex items-start gap-4 border transition-all hover:shadow-2xl ${
                  notification.read ? 'border-white/10' : 'border-indigo-400/50 shadow-xl'
                }`}
              >
                {/* Decorative background */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${style.bg} rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity`}></div>
                
                <div className="relative flex items-start gap-4 flex-1">
                  {/* Unread Indicator */}
                  {!notification.read && (
                    <div className="w-3 h-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mt-1 flex-shrink-0 animate-pulse shadow-lg shadow-indigo-500/50"></div>
                  )}

                  {/* Notification Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${style.iconBg} shadow-lg ${style.shadow} group-hover:scale-110 transition-transform`}
                  >
                    <span className="text-xl">{style.icon}</span>
                  </div>

                  {/* Notification Content */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{notification.title}</h3>
                    <p className="text-indigo-200/80 mb-2">{notification.message}</p>
                    <p className="text-sm text-indigo-200/50">{notification.time}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    {!notification.read && (
                      <button className="w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-all shadow-lg">
                        ✓
                      </button>
                    )}
                    <button className="w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-red-500/20 hover:border-red-400/30 rounded-lg flex items-center justify-center text-white hover:text-red-300 transition-all shadow-lg">
                      ×
                    </button>
                  </div>
                </div>

                {!notification.read && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-b-2xl"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-xl transition-all shadow-lg hover:scale-105">
            Load More Notifications
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}