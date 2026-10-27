import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  onOrderSuccess: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOrderSuccess }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    totalItemsCount,
    subtotal,
    discount,
    setDiscount,
    grandTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
    submitOrder,
  } = useCart();

  const { currentUser, guestName } = useAuth();
  const { showToast } = useToast();

  const [pickupType, setPickupType] = useState<'aqui' | 'llevar'>('aqui');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cash'>('card');
  const [couponCode, setCouponCode] = useState('');
  const [granosApplied, setGranosApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cart bottom sticky bar summary string
  const cartSummaryString = cart
    .map((item) => item.name)
    .slice(0, 2)
    .join(', ') + (cart.length > 2 ? '...' : '');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'COFFEEFIRST' || code === 'COFFEESPOS' || code === 'TAFFYFIRST' || code === 'BIENVENIDO') {
      const discountVal = subtotal * 0.15;
      setDiscount(discountVal);
      showToast('¡Cupón del 15% aplicado!', 'success');
    } else if (code === 'BARISTA') {
      setDiscount(2.00);
      showToast('¡Descuento de $2.00 aplicado!', 'success');
    } else {
      showToast('Código de cupón no válido.', 'warning');
    }
  };

  const handleToggleGranos = () => {
    if (!currentUser || currentUser.granos < 50) {
      showToast('Necesitas al menos 50 granos para canjear.', 'warning');
      return;
    }

    if (!granosApplied) {
      setDiscount(discount + 1.50);
      setGranosApplied(true);
      showToast('Canjeaste 50 granos por -$1.50', 'success');
    } else {
      setDiscount(Math.max(0, discount - 1.50));
      setGranosApplied(false);
      showToast('Descuento de granos removido', 'info');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      submitOrder(paymentMethod, pickupType);
      setIsSubmitting(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#fc9761', '#974818', '#2d1a12', '#ffb692'],
        });
      } catch (err) {
        console.error(err);
      }

      onOrderSuccess();
    }, 700);
  };

  return (
    <>
      {/* Sticky Mobile/Desktop Thumb-Friendly Cart Checkout Footer (from prototype capture) */}
      {totalItemsCount > 0 && !isCartOpen && (
        <aside aria-label="Carrito de compras" className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-surface/90 backdrop-blur-xl border-t border-surface-container transition-all duration-300">
          <div className="max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="w-full h-14 rounded-2xl bg-primary-container text-on-primary shadow-xl flex items-center justify-between px-4 active:scale-[0.98] transition-all hover:bg-primary"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-[13px] shadow-xs">
                  {totalItemsCount}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[13px] font-bold text-on-primary leading-tight">
                    Ver mi pedido
                  </span>
                  <span className="text-[11px] text-on-secondary-container leading-tight truncate max-w-[190px]">
                    {cartSummaryString || 'Productos seleccionados'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-bold text-secondary-container">
                  ${grandTotal.toFixed(2)}
                </span>
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px] text-on-primary">
                    arrow_forward
                  </span>
                </div>
              </div>
            </button>
          </div>
        </aside>
      )}

      {/* Cart & Checkout Modal / Bottom Sheet */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 animate-fade-in"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-surface-container-lowest rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-surface-container flex flex-col max-h-[92vh] animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top mobile indicator */}
            <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-12 h-1.5 bg-surface-container-high rounded-full"></div>
            </div>

            {/* Header */}
            <div className="px-5 py-3.5 flex items-center justify-between border-b border-surface-container">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-xl">shopping_cart</span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-primary">Tu Pedido en Barra</h2>
                  <p className="text-xs text-on-surface-variant">
                    {totalItemsCount} {totalItemsCount === 1 ? 'producto' : 'productos'} · Para:{' '}
                    <span className="font-bold text-secondary">
                      {currentUser ? currentUser.name : guestName || 'Cliente'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs text-error font-semibold hover:underline px-2 py-1"
                  >
                    Vaciar
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="overflow-y-auto px-5 py-4 flex flex-col gap-4 no-scrollbar">
              {/* Pickup Mode Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-surface-container rounded-2xl">
                <button
                  type="button"
                  onClick={() => setPickupType('aqui')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    pickupType === 'aqui'
                      ? 'bg-primary-container text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">local_cafe</span>
                  <span>Tomar aquí en salón</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPickupType('llevar')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    pickupType === 'llevar'
                      ? 'bg-primary-container text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">takeout_dining</span>
                  <span>Para llevar</span>
                </button>
              </div>

              {/* Items List */}
              {cart.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center gap-2 text-on-surface-variant">
                  <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline">
                    <span className="material-symbols-outlined text-3xl">shopping_basket</span>
                  </div>
                  <p className="font-bold text-primary">Tu carrito está vacío</p>
                  <p className="text-xs text-outline">Explora nuestras especialidades y agrega tus favoritos.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="p-3 rounded-2xl border border-surface-container bg-surface-container-lowest shadow-xs flex items-center justify-between gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover border border-surface-container shrink-0"
                      />

                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-bold text-primary truncate">{item.name}</h4>
                          <span className="text-xs font-bold text-secondary shrink-0">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {item.customizations && (
                          <p className="text-[11px] text-on-surface-variant truncate">
                            {item.customizations.size}
                            {item.customizations.milk ? ` · ${item.customizations.milk}` : ''}
                            {item.customizations.shots ? ` · ${item.customizations.shots}` : ''}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] text-outline">
                            Vaso: <strong>{item.cupName}</strong>
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-[10px] text-outline hover:text-error transition-colors flex items-center gap-0.5"
                          >
                            <span className="material-symbols-outlined text-[13px]">delete</span>
                            <span>Quitar</span>
                          </button>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center bg-surface-container-low rounded-xl p-0.5 border border-surface-container shrink-0">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center active:scale-90"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {item.quantity === 1 ? 'delete' : 'remove'}
                          </span>
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-primary">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center active:scale-90"
                        >
                          <span className="material-symbols-outlined text-[14px]">add</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Granos Rewards Box if logged in */}
              {currentUser && cart.length > 0 && (
                <div className="p-3 rounded-2xl bg-secondary-fixed/20 border border-secondary-container/40 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-xl">
                      workspace_premium
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-primary">Granos COFFEE'S POS</span>
                      <span className="text-[11px] text-on-surface-variant">
                        Tienes {currentUser.granos} granos acumulados
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleToggleGranos}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      granosApplied
                        ? 'bg-secondary text-on-secondary shadow-sm'
                        : 'bg-surface-container-lowest text-secondary border border-secondary-container hover:bg-secondary-fixed/30'
                    }`}
                  >
                    {granosApplied ? 'Canjeado (-$1.50)' : 'Canjear 50 granos'}
                  </button>
                </div>
              )}

              {/* Promo Code Input */}
              {cart.length > 0 && (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Código promo (ej. COFFEEFIRST)"
                      className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs font-medium text-primary placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-10 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-primary active:scale-95 transition-all"
                  >
                    Aplicar
                  </button>
                </form>
              )}

              {/* Payment Method Selector */}
              {cart.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Método de Pago
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-center transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-primary-container text-on-primary border-primary shadow-xs'
                          : 'bg-surface-container-low border-surface-container text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">credit_card</span>
                      <span className="text-[11px] font-bold">Tarjeta</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple_pay')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-center transition-all ${
                        paymentMethod === 'apple_pay'
                          ? 'bg-primary-container text-on-primary border-primary shadow-xs'
                          : 'bg-surface-container-low border-surface-container text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">contactless</span>
                      <span className="text-[11px] font-bold">Apple / Google</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-center transition-all ${
                        paymentMethod === 'cash'
                          ? 'bg-primary-container text-on-primary border-primary shadow-xs'
                          : 'bg-surface-container-low border-surface-container text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">payments</span>
                      <span className="text-[11px] font-bold">Caja / Efectivo</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Summary Calculations */}
              {cart.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col gap-1.5 text-xs">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-secondary font-semibold">
                      <span>Descuento aplicado</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-primary text-sm pt-1.5 border-t border-surface-container">
                    <span>Total a Pagar</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Checkout Action */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-surface-container bg-surface-container-lowest shrink-0">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleCheckout}
                  className="w-full h-13 py-3.5 rounded-xl bg-primary-container text-on-primary hover:bg-primary font-bold text-xs tracking-wider flex items-center justify-between px-5 shadow-lg active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-secondary-container">
                      check_circle
                    </span>
                    <span>{isSubmitting ? 'PROCESANDO PEDIDO...' : 'CONFIRMAR Y PAGAR'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-secondary-container">
                      ${grandTotal.toFixed(2)}
                    </span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
