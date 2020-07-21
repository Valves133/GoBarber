import React, { createContext, useContext, useCallback } from 'react';

import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

const toastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('AddToast');
  }, []);

  const removeToast = useCallback(() => {
    console.log('removeToast');
  }, []);

  return (
    <toastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
    </toastContext.Provider>
  );
};

// Criação do Hook Toast
function useToast(): ToastContextData {
  const context = useContext(toastContext);

  if (!context) {
    throw new Error('useToaast must be used within a ToastProvider');
  }
  return context;
}

export { ToastProvider, useToast };
