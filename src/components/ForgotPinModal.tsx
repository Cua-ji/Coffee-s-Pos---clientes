import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { PinInput } from './PinInput';

interface ForgotPinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPinModal: React.FC<ForgotPinModalProps> = ({ isOpen, onClose }) => {
  const { resetPin } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [newPin, setNewPin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Ingresa un correo electrónico válido.', 'warning');
      return;
    }

    if (newPin.length !== 4) {
      showToast('El nuevo PIN debe tener 4 dígitos.', 'warning');
      return;
    }

    setIsSubmitting(true);
    const result = resetPin(email, newPin);
    setIsSubmitting(false);

    if (result.success) {
      showToast('¡PIN restablecido con éxito! Ahora puedes iniciar sesión.', 'success');
      onClose();
    } else {
      showToast(result.message || 'Error al restablecer PIN', 'error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-sm bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden border border-surface-container p-5 flex flex-col gap-4 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-secondary-fixed/50 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-lg">lock_reset</span>
            </div>
            <h3 className="text-base font-bold text-primary">Recuperar PIN</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        <p className="text-xs text-on-surface-variant">
          Ingresa el correo con el que te registraste y define tu nuevo PIN de 4 dígitos.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-primary">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-primary">Nuevo PIN de 4 dígitos</label>
            <PinInput value={newPin} onChange={setNewPin} />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 rounded-full bg-primary-container text-on-primary hover:bg-primary font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all mt-2"
          >
            <span>Actualizar PIN</span>
            <span className="material-symbols-outlined text-sm">check</span>
          </button>
        </form>
      </div>
    </div>
  );
};
