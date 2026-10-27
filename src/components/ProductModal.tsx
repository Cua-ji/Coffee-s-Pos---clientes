import React, { useState, useEffect } from 'react';
import type { Product, CustomizationOptions } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { currentUser, guestName } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [cupName, setCupName] = useState('');
  const [size, setSize] = useState<CustomizationOptions['size']>('Mediano 12 oz');
  const [milk, setMilk] = useState<CustomizationOptions['milk']>('Entera');
  const [shots, setShots] = useState<CustomizationOptions['shots']>('Normal (1 shot)');
  const [syrup, setSyrup] = useState<CustomizationOptions['syrup']>('Sin endulzante');
  const [ice, setIce] = useState<CustomizationOptions['ice']>('Hielo regular');
  const [warming, setWarming] = useState<CustomizationOptions['warming']>('Calentado al horno');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setCupName(currentUser ? currentUser.name : guestName || 'Cliente');
      if (product.defaultOptions?.size) setSize(product.defaultOptions.size);
      if (product.defaultOptions?.milk) setMilk(product.defaultOptions.milk);
      if (product.defaultOptions?.shots) setShots(product.defaultOptions.shots);
      if (product.defaultOptions?.syrup) setSyrup(product.defaultOptions.syrup);
      if (product.defaultOptions?.ice) setIce(product.defaultOptions.ice);
      if (product.defaultOptions?.warming) setWarming(product.defaultOptions.warming);
      setNotes('');
    }
  }, [product, currentUser, guestName]);

  if (!product) return null;

  const isDrink = product.category === 'caliente' || product.category === 'frio' || product.category === 'te';
  const isColdDrink = product.category === 'frio';
  const isCoffee = product.category === 'caliente' || product.category === 'frio';
  const isBakeryOrSnack = product.category === 'panaderia' || product.category === 'snacks';

  // Calculate live item price
  let unitPrice = product.price;
  if (size === 'Grande 16 oz') unitPrice += 0.70;
  if (milk?.includes('Avena') || milk?.includes('Almendra')) unitPrice += 0.60;
  if (shots?.includes('Doble')) unitPrice += 0.50;
  if (syrup?.includes('Caramelo') || syrup?.includes('Vainilla')) unitPrice += 0.50;

  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const customizations: CustomizationOptions = {
      size,
      ...(isDrink && milk ? { milk } : {}),
      ...(isCoffee && shots ? { shots } : {}),
      ...(isDrink && syrup ? { syrup } : {}),
      ...(isColdDrink && ice ? { ice } : {}),
      ...(isBakeryOrSnack && warming ? { warming } : {}),
      ...(notes.trim() ? { notes: notes.trim() } : {}),
    };

    addToCart(product, customizations, quantity, cupName);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-lg bg-surface-container-lowest rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-surface-container flex flex-col max-h-[92vh] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pull tab on mobile */}
        <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-12 h-1.5 bg-surface-container-high rounded-full"></div>
        </div>

        {/* Modal Hero Header with Image */}
        <div className="relative h-44 sm:h-52 w-full bg-surface-container-low shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent"></div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md active:scale-95 transition-transform z-10"
            aria-label="Cerrar modal"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          {/* Product Title overlay */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="px-2 py-0.5 rounded-full bg-secondary-container/90 text-on-secondary-container text-[11px] font-bold uppercase tracking-wider">
              {product.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold leading-tight mt-1 text-white">
              {product.name}
            </h2>
            <p className="text-xs text-white/80 line-clamp-1 mt-0.5">{product.description}</p>
          </div>
        </div>

        {/* Customization Options Body */}
        <div className="overflow-y-auto px-5 py-4 flex flex-col gap-4 no-scrollbar">
          {/* Cup Name Option */}
          <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-surface-container-low border border-surface-container">
            <label className="text-xs font-bold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-base">local_cafe</span>
              <span>Nombre en el vaso</span>
            </label>
            <input
              type="text"
              value={cupName}
              onChange={(e) => setCupName(e.target.value)}
              placeholder="Ej. Sofía o Alex"
              className="h-10 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/50 text-sm font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Size Selector */}
          {isDrink && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Tamaño del vaso
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Chico 8 oz', label: '8 oz', sub: 'Chico' },
                  { id: 'Mediano 12 oz', label: '12 oz', sub: 'Mediano' },
                  { id: 'Grande 16 oz', label: '16 oz', sub: '+$0.70' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSize(s.id as CustomizationOptions['size'])}
                    className={`py-2 px-1 rounded-xl text-center flex flex-col items-center justify-center transition-all border ${
                      size === s.id
                        ? 'bg-primary-container text-on-primary border-primary shadow-sm'
                        : 'bg-surface-container-low hover:bg-surface-container border-surface-container text-on-surface'
                    }`}
                  >
                    <span className="text-xs font-bold">{s.label}</span>
                    <span className="text-[10px] opacity-80">{s.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milk Options */}
          {isDrink && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Tipo de Leche
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'Entera', label: 'Leche Entera', extra: '' },
                  { id: 'Deslactosada', label: 'Deslactosada', extra: '' },
                  { id: 'Avena Orgánica (+ $0.60)', label: 'Avena Orgánica', extra: '+$0.60' },
                  { id: 'Almendra (+ $0.60)', label: 'Bebida Almendra', extra: '+$0.60' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMilk(m.id as CustomizationOptions['milk'])}
                    className={`p-2.5 rounded-xl text-left flex items-center justify-between border transition-all ${
                      milk === m.id
                        ? 'bg-secondary-fixed/40 border-secondary text-primary font-bold shadow-xs'
                        : 'bg-surface-container-low hover:bg-surface-container border-surface-container text-on-surface'
                    }`}
                  >
                    <span className="text-xs">{m.label}</span>
                    {m.extra && <span className="text-[11px] font-bold text-secondary">{m.extra}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Espresso Shots */}
          {isCoffee && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Intensidad de Espresso
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Normal (1 shot)', label: 'Normal' },
                  { id: 'Doble shot (+ $0.50)', label: 'Doble (+ $0.50)' },
                  { id: 'Descafeinado', label: 'Descafeinado' },
                ].map((sh) => (
                  <button
                    key={sh.id}
                    type="button"
                    onClick={() => setShots(sh.id as CustomizationOptions['shots'])}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-semibold border transition-all ${
                      shots === sh.id
                        ? 'bg-primary-container text-on-primary border-primary'
                        : 'bg-surface-container-low border-surface-container text-on-surface'
                    }`}
                  >
                    {sh.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Syrups / Dulzor */}
          {isDrink && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Endulzante / Jarabe
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'Sin endulzante', label: 'Sin azúcar' },
                  { id: 'Caramelo Artesanal (+ $0.50)', label: 'Caramelo (+ $0.50)' },
                  { id: 'Vainilla Madagascar (+ $0.50)', label: 'Vainilla (+ $0.50)' },
                  { id: 'Stevia Natural', label: 'Stevia Natural' },
                ].map((syr) => (
                  <button
                    key={syr.id}
                    type="button"
                    onClick={() => setSyrup(syr.id as CustomizationOptions['syrup'])}
                    className={`p-2 rounded-xl text-xs text-left border transition-all ${
                      syrup === syr.id
                        ? 'bg-secondary-fixed/40 border-secondary text-primary font-bold'
                        : 'bg-surface-container-low border-surface-container text-on-surface'
                    }`}
                  >
                    {syr.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ice options for cold drinks */}
          {isColdDrink && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Nivel de Hielo
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {['Sin hielo', 'Poco hielo', 'Hielo regular', 'Extra hielo'].map((ic) => (
                  <button
                    key={ic}
                    type="button"
                    onClick={() => setIce(ic as CustomizationOptions['ice'])}
                    className={`py-2 px-1 text-center rounded-xl text-[11px] font-semibold border transition-all ${
                      ice === ic
                        ? 'bg-primary-container text-on-primary border-primary'
                        : 'bg-surface-container-low border-surface-container text-on-surface'
                    }`}
                  >
                    {ic}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bakery warming option */}
          {isBakeryOrSnack && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Temperatura de servicio
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'Calentado al horno', label: '🔥 Calentado al horno' },
                  { id: 'Frío / Natural', label: '❄️ Natural a temperatura' },
                ].map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setWarming(w.id as CustomizationOptions['warming'])}
                    className={`p-2.5 text-center rounded-xl text-xs font-semibold border transition-all ${
                      warming === w.id
                        ? 'bg-primary-container text-on-primary border-primary'
                        : 'bg-surface-container-low border-surface-container text-on-surface'
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notes for barista */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-sm">edit_note</span>
              <span>Instrucciones especiales para el barista</span>
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej. Leche muy caliente, canela espolvoreada..."
              className="h-10 px-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-primary focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 border-t border-surface-container bg-surface-container-lowest flex items-center justify-between gap-3 shrink-0">
          {/* Quantity Controls */}
          <div className="flex items-center bg-surface-container rounded-xl p-1 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-9 h-9 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center active:scale-90 disabled:opacity-40 transition-transform font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <span className="w-8 text-center font-bold text-sm text-primary">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center active:scale-90 transition-transform font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>

          {/* Submit Add Button */}
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 h-12 rounded-xl bg-primary-container text-on-primary hover:bg-primary font-bold text-xs tracking-wide flex items-center justify-between px-4 shadow-md active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary-container">
                shopping_bag
              </span>
              <span>AGREGAR AL PEDIDO</span>
            </div>
            <span className="text-sm font-bold text-secondary-container">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
