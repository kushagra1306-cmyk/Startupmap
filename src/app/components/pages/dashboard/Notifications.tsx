import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead, requireAuth } from '../../../api/api';

export function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!requireAuth()) return;
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await getNotifications();
      setNotifications(response.notifications || []);
    } catch (err) {
      console.error('Failed to load notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      loadNotifications(); // Reload
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      loadNotifications(); // Reload
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'COLLAB_REQUEST': return '📨';
      case 'ACCEPTED': return '✅';
      case 'REJECTED': return '❌';
      default: return '💬';
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <button
            onClick={handleMarkAllAsRead}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg"
          >
            Mark all as read
          </button>
        </div>

        {loading ? (
          <div className="text-white">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="text-center text-indigo-200 py-12">No notifications</div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 rounded-2xl flex items-start gap-4 ${
                  notification.isRead ? 'border-white/10' : 'border-indigo-400/50 shadow-xl'
                } border`}
              >
                {!notification.isRead && (
                  <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
                )}

                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-600 text-2xl">
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{notification.type}</h3>
                  <p className="text-indigo-200/80">{notification.message}</p>
                  <p className="text-sm text-indigo-200/50 mt-2">
                    {new Date(notification.created_at).toLocaleString()}
                  </p>
                </div>

                {!notification.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white"
                  >
                    ✓
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
