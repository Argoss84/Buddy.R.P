import React, { createContext, useContext, useEffect, useState } from 'react';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthenticationContect';

interface ToastContextType {
  showToast: (message: string, options?: ToastOptions) => void;
  showInfoToast: (message: string, options?: ToastOptions) => void;
  showSuccessToast: (message: string, options?: ToastOptions) => void;
  showWarningToast: (message: string, options?: ToastOptions) => void;
  showErrorToast: (message: string, options?: ToastOptions) => void;
  showDefaultToast: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { parameters } = useAuth();
  const [toastOptions, setToastOptions] = useState<ToastOptions>(defaultToastOptions);

  useEffect(() => {
    if (parameters) {
      const toastDuration = parameters.find((param: any) => param.parameter_name === 'ToastDuration');
      if (toastDuration) {
        defaultToastOptions.autoClose = parseInt(toastDuration.parameter_value, 10);
        setToastOptions(defaultToastOptions);
      }
    }
  }, [parameters]);

  const showToast = (message: string, options?: ToastOptions) => {
    toast(message, { ...toastOptions, ...options });
  };

  const showInfoToast = (message: string, options?: ToastOptions) => {
    toast.info(message, { ...toastOptions, ...options });
  };

  const showSuccessToast = (message: string, options?: ToastOptions) => {
    toast.success(message, { ...toastOptions, ...options });
  };

  const showWarningToast = (message: string, options?: ToastOptions) => {
    toast.warn(message, { ...toastOptions, ...options });
  };

  const showErrorToast = (message: string, options?: ToastOptions) => {
    toast.error(message, { ...toastOptions, ...options });
  };

  const showDefaultToast = (message: string, options?: ToastOptions) => {
    toast(message, { ...toastOptions, ...options });
  };

  return (
    <ToastContext.Provider value={{ showToast, showInfoToast, showSuccessToast, showWarningToast, showErrorToast, showDefaultToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};