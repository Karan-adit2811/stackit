'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-text-secondary hover:text-text-primary transition-colors"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-customPrimary-danger text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-customPrimary-card border border-gray-600 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-600">
            <h3 className="text-text-primary font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-customPrimary-accent hover:text-opacity-80 text-sm flex items-center space-x-1"
              >
                <CheckCheck className="h-4 w-4" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-700 last:border-b-0 hover:bg-customPrimary-bg transition-colors ${
                    !notification.read ? 'bg-customPrimary-accent bg-opacity-5' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {notification.message}
                      </p>
                      {notification.questionTitle && (
                        <Link
                          href={`/question/${notification.questionId}`}
                          className="text-customPrimary-accent hover:text-opacity-80 text-sm font-medium block mt-1 truncate"
                          onClick={() => {
                            markAsRead(notification.id);
                            setIsOpen(false);
                          }}
                        >
                          "{notification.questionTitle}"
                        </Link>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-text-muted text-xs">
                          {formatDate(notification.createdAt)}
                        </span>
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-customPrimary-accent hover:text-opacity-80 text-xs flex items-center space-x-1"
                          >
                            <Check className="h-3 w-3" />
                            <span>Mark read</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 text-text-muted mx-auto mb-3" />
                <p className="text-text-muted">No notifications yet</p>
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-600 text-center">
              <Link
                href="/notifications"
                className="text-customPrimary-accent hover:text-opacity-80 text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                View all notifications
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;