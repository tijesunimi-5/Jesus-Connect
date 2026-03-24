"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto min-w-[300px] p-4 rounded-2xl shadow-xl border animate-slide-up
              flex items-center gap-3 transition-all
              ${toast.type === 'success' ? 'bg-white border-emerald-100 text-emerald-900' : ''}
              ${toast.type === 'error' ? 'bg-white border-red-100 text-red-900' : ''}
              ${toast.type === 'info' ? 'bg-white border-slate-100 text-slate-900' : ''}
            `}
          >
            <div className={`
              w-8 h-8 rounded-xl flex items-center justify-center shrink-0
              ${toast.type === 'success' ? 'bg-emerald-50 text-emerald-600' : ''}
              ${toast.type === 'error' ? 'bg-red-50 text-red-600' : ''}
              ${toast.type === 'info' ? 'bg-slate-50 text-slate-600' : ''}
            `}>
              {toast.type === 'success' && '✅'}
              {toast.type === 'error' && '⚠️'}
              {toast.type === 'info' && 'ℹ️'}
            </div>
            <p className="text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="ml-auto text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};