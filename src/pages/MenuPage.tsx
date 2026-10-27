import React, { useState, useMemo } from 'react';
import { CATEGORIES, INITIAL_PRODUCTS } from '../data/products';
import type { CategoryId, Product } from '../types';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { CartDrawer } from '../components/CartDrawer';
import { OrderHistoryModal } from '../components/OrderHistoryModal';
import { ProfileModal } from '../components/ProfileModal';
import { NotificationsModal } from '../components/NotificationsModal';
import { OrderConfirmationModal } from '../components/OrderConfirmationModal';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const MenuPage: React.FC = () => {
  const { currentUser } = useAuth();
  const {
    selectedCustomizingProduct,
    setSelectedCustomizingProduct,
  } = useCart();

  const [activeCategory, setActiveCategory] = useState<CategoryId>('caliente');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  // Filter products by category and favorites
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      // Favorite filter
      if (showOnlyFavorites) {
        const isFav = currentUser
          ? currentUser.favorites.includes(product.id)
          : product.isFavorite;
        return isFav;
      }

      // Filter by category
      return product.category === activeCategory;
    });
  }, [activeCategory, showOnlyFavorites, currentUser]);

  const currentCategoryData = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased select-none w-full min-h-screen flex flex-col pb-28 overflow-x-hidden">
      {/* Top Application Header */}
      <Header
        onToggleFavorites={() => setShowOnlyFavorites((prev) => !prev)}
        showOnlyFavorites={showOnlyFavorites}
      />

      {/* Main Content Area */}
      <main className="w-full flex-1 bg-surface overflow-x-hidden">
        <div className="w-full max-w-[1280px] mx-auto p-4 flex flex-col gap-4">
          <div className="w-full max-w-md mx-auto flex flex-col gap-3">
            {/* Horizontal Categories Scroll Bar (Matches Prototype Capture) */}
            {!showOnlyFavorites && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none no-scrollbar -mx-2 px-2">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full shrink-0 shadow-sm active:scale-95 transition-all ${
                        isActive
                          ? 'bg-primary-container text-on-primary'
                          : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isActive ? 'text-secondary-container' : ''
                        }`}
                      >
                        {cat.icon}
                      </span>
                      <span className={`text-[13px] whitespace-nowrap ${isActive ? 'font-bold' : 'font-semibold'}`}>
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Category Title & Counter */}
            <div className="flex items-center justify-between pt-1 px-1">
              <div className="flex flex-col">
                <span className="text-[11px] text-secondary font-bold uppercase tracking-wider">
                  {showOnlyFavorites ? 'Tus Selecciones' : 'Especialidad de la casa'}
                </span>
                <h2 className="text-[20px] font-bold text-primary tracking-tight">
                  {showOnlyFavorites
                    ? 'Tus Favoritos'
                    : currentCategoryData?.name}
                </h2>
              </div>
              <span className="text-[12px] bg-surface-container px-2.5 py-0.5 rounded-full text-on-surface-variant font-medium">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'variedad' : 'variedades'}
              </span>
            </div>

            {/* Mobile / Responsive Products Grid (2 columns as in prototype) */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center gap-2">
                <span className="material-symbols-outlined text-4xl text-outline">search_off</span>
                <p className="text-sm font-bold text-primary">No se encontraron especialidades</p>
                <p className="text-xs text-outline">Intenta con otra búsqueda o categoría.</p>
                {showOnlyFavorites && (
                  <button
                    type="button"
                    onClick={() => setShowOnlyFavorites(false)}
                    className="mt-2 px-4 py-2 rounded-full bg-primary-container text-on-primary text-xs font-bold"
                  >
                    Ver todo el menú
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 pb-6">
                {filteredProducts.map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenCustomize={(p) => setSelectedCustomizingProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Cart Checkout Drawer & Sticky Bar */}
      <CartDrawer onOrderSuccess={() => setIsConfirmationOpen(true)} />

      {/* Product Customization Modal */}
      <ProductModal
        product={selectedCustomizingProduct}
        onClose={() => setSelectedCustomizingProduct(null)}
      />

      {/* Order History Modal (from prototype) */}
      <OrderHistoryModal />

      {/* Profile & Rewards Modal */}
      <ProfileModal />

      {/* Notifications Drawer */}
      <NotificationsModal />

      {/* Order Success Ticket Confirmation Modal */}
      <OrderConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      />
    </div>
  );
};
