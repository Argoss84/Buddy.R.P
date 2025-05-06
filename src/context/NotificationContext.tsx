import React, { createContext, useContext, useEffect } from 'react';
import { notifServices } from '../services/NotifServices';
import { useAuth } from './AuthenticationContect';
import { useToast } from './ToastContext';

interface NotificationContextType {
  // Add any context values if needed in the future
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userInfo : user } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    if (user) {
      // Subscribe to user-specific notifications
      notifServices.subscribeToNotifications(user[0].id, (payload: any) => {
        const notification = payload.new;
        showToast(notification.content, {
          position: "top-right",
          autoClose: 1000,
        });
      });

      // Subscribe to global notifications
      notifServices.subscribeToGlobalNotifications((payload: any) => {
        const notification = payload.new;
        showToast(notification.content, {
          position: "top-right",
          autoClose: 1000,
          type: "info"
        });
      });

      // Cleanup subscription on unmount
      return () => {
        notifServices.unsubscribe();
      };
    }
  }, [user, showToast]);

  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}; 