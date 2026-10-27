import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { PinInput } from '../components/PinInput';
import { ForgotPinModal } from '../components/ForgotPinModal';

export const AuthPage: React.FC = () => {
  const { login, guestLogin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !email.includes('@')) {
      showToast('Por favor introduce un correo electrónico válido.', 'warning');
      return;
    }

    if (pin.length !== 4) {
      showToast('El PIN debe tener 4 dígitos exactos.', 'warning');
      return;
    }

    const res = login(email, pin);
    if (res.success) {
      showToast('¡Sesión iniciada con éxito! Bienvenido de vuelta. ☕', 'success');
      navigate('/menu');
    } else {
      showToast(res.message || 'Credenciales incorrectas.', 'error');
    }
  };

  const handleGuest = () => {
    guestLogin('Invitado');
    showToast('Has ingresado como invitado. ¡Disfruta tu pedido!', 'info');
    navigate('/menu');
  };

  return (
    <main className="w-full min-h-screen bg-surface flex flex-col justify-center items-center py-6 px-4">
      <div className="flex flex-col w-full max-w-md mx-auto gap-5">
        {/* Brand Header */}
        <div className="flex items-center justify-between py-1">
          <img
            src="/logo.png"
            alt="COFFEE'S POS"
            className="h-12 w-auto object-contain max-w-[210px]"
          />
          <span className="text-[11px] font-bold uppercase tracking-wider text-secondary bg-secondary-fixed/40 px-2.5 py-1 rounded-full border border-secondary-container/40">
            Roastery Express
          </span>
        </div>

        {/* Hero Card Banner */}
        <div className="relative overflow-hidden rounded-lg bg-surface-container-low shadow-sm min-h-[220px] p-5 flex flex-col justify-between">
          <div
            className="absolute inset-0 bg-cover bg-center"
            data-alt="Elegante cafetería de especialidad moderna con luz natural cálida y baristas artesanos"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhhIOTGJjADQoG3mGqsQ9-l3-WZFEdxvCaTJzB-IBlbDQ7cb7NMJszeByNAv_u62y8przL9wc9CObpnzpGJ35ymYQounhxZbDbfj__a4Mpvq90U_IRihJM4_fM1SSHkO5zMOJ6KJ6Fy8iFMzc1enhY2-FDxLxypGTAc7dqXhw0YqC8Vwo-2GU9jbNuqJ9XN86_7XSlWJFTGhyiiWPaRBNOZZqRGW_Vtp2uV2crajhynJMoGsSjdPPfIQ')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent"></div>

          <div className="relative z-10 space-y-1 mt-12">
            <span className="font-label-md text-secondary-fixed tracking-wide uppercase text-xs">
              Bienvenido a la comunidad
            </span>
            <h1 className="font-headline-sm text-headline-sm text-on-primary leading-tight text-2xl font-bold">
              Únete a COFFEE'S POS
            </h1>
            <p className="font-body-md text-tertiary-fixed text-xs">
              Inicia sesión para acceder a tus puntos, favoritos y pedidos guardados.
            </p>
          </div>
        </div>

        {/* 3 Value Cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center text-center p-2.5 rounded-DEFAULT bg-surface-container-lowest border border-outline-variant/40 shadow-sm gap-1">
            <div className="w-8 h-8 rounded-full bg-secondary-fixed/50 text-secondary flex items-center justify-center flex-shrink-0">
              <span
                className="material-symbols-outlined text-body-md text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
            </div>
            <span className="font-semibold text-xs text-on-surface leading-tight">Favoritos</span>
            <span className="text-[11px] text-on-surface-variant leading-tight">En 1 toque</span>
          </div>

          <div className="flex flex-col items-center text-center p-2.5 rounded-DEFAULT bg-surface-container-lowest border border-outline-variant/40 shadow-sm gap-1">
            <div className="w-8 h-8 rounded-full bg-secondary-fixed/50 text-secondary flex items-center justify-center flex-shrink-0">
              <span
                className="material-symbols-outlined text-body-md text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                history
              </span>
            </div>
            <span className="font-semibold text-xs text-on-surface leading-tight">Repite</span>
            <span className="text-[11px] text-on-surface-variant leading-tight">Al instante</span>
          </div>

          <div className="flex flex-col items-center text-center p-2.5 rounded-DEFAULT bg-surface-container-lowest border border-outline-variant/40 shadow-sm gap-1">
            <div className="w-8 h-8 rounded-full bg-secondary-fixed/50 text-secondary flex items-center justify-center flex-shrink-0">
              <span
                className="material-symbols-outlined text-body-md text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                mark_email_read
              </span>
            </div>
            <span className="font-semibold text-xs text-on-surface leading-tight">Recibos</span>
            <span className="text-[11px] text-on-surface-variant leading-tight">A tu correo</span>
          </div>
        </div>

        {/* Main Interactive Form Card */}
        <div className="w-full flex flex-col bg-surface-container-lowest rounded-lg p-5 shadow-md gap-5 border border-outline-variant/40">
          {/* Card Header (Login only, without create account tabs) */}
          <div className="flex flex-col gap-1">
            <h2 className="font-headline-sm text-lg font-bold text-on-surface">
              Inicia sesión
            </h2>
            <p className="font-body-md text-on-surface-variant text-xs">
              Ingresa tus datos para pedir y acumular granos.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Field 1: Email */}
            <div className="flex flex-col gap-1.5">
              <label
                className="flex items-center justify-between font-label-md text-label-md text-on-surface"
                htmlFor="email"
              >
                <span className="flex items-center gap-1.5 font-semibold text-xs sm:text-sm">
                  <span className="material-symbols-outlined text-secondary text-base">mail</span>{' '}
                  1. Correo Electrónico
                </span>
                <span className="font-label-md text-[11px] text-outline">
                  Tu cuenta
                </span>
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full h-12 px-4 rounded-DEFAULT bg-surface-container-low text-on-surface font-body-md text-sm placeholder:text-outline/70 focus:outline-none focus:bg-surface-container transition-all border border-outline-variant/40"
                />
              </div>
            </div>

            {/* Field 2: 4-digit PIN */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 font-label-md text-xs sm:text-sm font-semibold text-on-surface">
                  <span className="material-symbols-outlined text-secondary text-base">pin</span>
                  <span>2. PIN de 4 dígitos</span>
                </label>
                <span className="font-label-md text-[11px] text-outline">
                  Código secreto
                </span>
              </div>

              {/* Functional 4-digit keyboard PIN input (NO virtual keyboard) */}
              <PinInput value={pin} onChange={setPin} />

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-secondary hover:text-on-secondary-container text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">help_outline</span>
                  <span>¿Olvidaste tu PIN?</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-1">
              <button
                type="submit"
                className="w-full h-12 rounded-full bg-primary-container text-on-primary font-label-md text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:bg-primary active:scale-[0.98] transition-all"
              >
                <span>Iniciar sesión</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>

              <button
                type="button"
                onClick={handleGuest}
                className="w-full h-12 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-sm font-semibold flex items-center justify-center gap-2 border border-outline-variant/40 active:scale-[0.98] transition-all text-center"
              >
                <span>Pedir como invitado</span>
                <span className="material-symbols-outlined text-sm text-secondary">
                  fast_forward
                </span>
              </button>

              <p className="text-center text-[11px] text-on-surface-variant leading-tight px-2 pt-1">
                Al continuar aceptas los términos de autoservicio y privacidad.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Forgot PIN Modal */}
      <ForgotPinModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </main>
  );
};
