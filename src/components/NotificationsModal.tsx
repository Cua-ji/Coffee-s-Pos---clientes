import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';

export const NotificationsModal: React.FC = () => {
  const { isNotificationsOpen, setIsNotificationsOpen, notifications, markNotificationsAsRead } =
    useCart();

  useEffect(() => {
    if (isNotificationsOpen) {
      markNotificationsAsRead();
    }
  }, [isNotificationsOpen, markNotificationsAsRead]);

  if (!isNotificationsOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 animate-fade-in"
      onClick={() => setIsNotificationsOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md bg-surface-container-lowest rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-surface-container flex flex-col max-h-[85vh] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-primary">Avisos & Novedades</h2>
              <p className="text-xs text-on-surface-variant">Mantente al día con tu café</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsNotificationsOpen(false)}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* List */}
        <div className="p-4 flex flex-col gap-2.5 overflow-y-auto no-scrollbar">
          {notifications.length === 0 ? (
            <p className="text-center py-8 text-xs text-outline">No tienes notificaciones pendientes.</p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container flex gap-3 items-start"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary-fixed/50 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-base">{notif.icon}</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-primary truncate">{notif.title}</h4>
                    <span className="text-[10px] text-outline shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-snug">{notif.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
