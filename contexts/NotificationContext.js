import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'answer',
    message: 'John Doe answered your question "How to handle async/await in React components?"',
    questionId: 1,
    questionTitle: 'How to handle async/await in React components?',
    read: false,
    createdAt: '2024-01-15T12:30:00Z'
  },
  {
    id: 2,
    type: 'vote',
    message: 'Your answer received 5 upvotes',
    questionId: 2,
    questionTitle: 'SQL JOIN vs subquery performance comparison',
    read: false,
    createdAt: '2024-01-15T10:15:00Z'
  },
  {
    id: 3,
    type: 'comment',
    message: 'Sarah commented on your answer',
    questionId: 1,
    questionTitle: 'How to handle async/await in React components?',
    read: true,
    createdAt: '2024-01-14T16:45:00Z'
  }
];

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Load notifications for logged in user
      setNotifications(mockNotifications);
    } else {
      setNotifications([]);
    }
  }, [user]);

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      read: false,
      createdAt: new Date().toISOString(),
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};