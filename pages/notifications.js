import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import Navbar from '@/components/Navbar';
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';
import { Bell, Check, CheckCheck } from 'lucide-react';

export default function Notifications() {
  const { user } = useAuth();
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  if (!user) {
    return (
      <div className="min-h-screen bg-customPrimary-bg pt-16">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Bell className="h-16 w-16 text-text-muted mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-text-primary mb-2">Please log in</h1>
            <p className="text-text-secondary mb-6">You need to be logged in to view notifications</p>
            <Link href="/login" className="btn-primary">
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'answer':
        return '💬';
      case 'vote':
        return '👍';
      case 'comment':
        return '💭';
      default:
        return '🔔';
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read);

  const breadcrumbItems = [
    { label: 'Notifications' }
  ];

  return (
    <div className="min-h-screen bg-customPrimary-bg">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Notifications</h1>
            <p className="text-text-secondary mt-1">
              {unreadNotifications.length} unread notifications
            </p>
          </div>
          
          {unreadNotifications.length > 0 && (
            <button
              onClick={markAllAsRead}
              className="btn-outline flex items-center space-x-2"
            >
              <CheckCheck className="h-4 w-4" />
              <span>Mark all as read</span>
            </button>
          )}
        </div>

        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`card ${
                  !notification.read ? 'border-customPrimary-accent border-opacity-50' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-text-secondary leading-relaxed">
                      {notification.message}
                    </p>
                    
                    {notification.questionTitle && (
                      <Link
                        href={`/question/${notification.questionId}`}
                        className="text-customPrimary-accent hover:text-opacity-80 font-medium block mt-2"
                        onClick={() => markAsRead(notification.id)}
                      >
                        "{notification.questionTitle}"
                      </Link>
                    )}
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-text-muted text-sm">
                        {formatDate(notification.createdAt)}
                      </span>
                      
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-customPrimary-accent hover:text-opacity-80 text-sm flex items-center space-x-1"
                        >
                          <Check className="h-4 w-4" />
                          <span>Mark as read</span>
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {!notification.read && (
                    <div className="w-2 h-2 bg-customPrimary-accent rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 text-text-muted mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-text-primary mb-2">No notifications yet</h2>
            <p className="text-text-secondary">
              When someone answers your questions or votes on your content, you'll see it here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}