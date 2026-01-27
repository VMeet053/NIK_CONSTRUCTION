import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import ConfirmModal from '../components/ConfirmModal';

const ConfirmContext = createContext();

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context;
};

export const ConfirmProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState({
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    type: 'danger' // danger, warning, info
  });
  
  const resolveRef = useRef(null);

  const confirm = useCallback(({ 
    title = 'Are you sure?', 
    message = 'This action cannot be undone.', 
    confirmText = 'Yes, Delete', 
    cancelText = 'Cancel',
    type = 'danger'
  }) => {
    setOptions({ title, message, confirmText, cancelText, type });
    setIsOpen(true);

    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setIsOpen(false);
    if (resolveRef.current) {
      resolveRef.current(true);
      resolveRef.current = null;
    }
  }, []);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    if (resolveRef.current) {
      resolveRef.current(false);
      resolveRef.current = null;
    }
  }, []);

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <ConfirmModal
            isOpen={isOpen}
            title={options.title}
            message={options.message}
            confirmText={options.confirmText}
            cancelText={options.cancelText}
            type={options.type}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </AnimatePresence>
    </ConfirmContext.Provider>
  );
};
