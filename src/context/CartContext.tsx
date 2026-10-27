import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, CustomizationOptions, Order, PastOrderItem, Product, NotificationItem } from '../types';
import { INITIAL_PAST_ORDERS } from '../data/initialOrders';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, customizations?: CustomizationOptions, quantity?: number, cupName?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  discount: number;
  setDiscount: (val: number) => void;
  grandTotal: number;
  pastOrders: PastOrderItem[];
  reorderPastItem: (pastItem: PastOrderItem) => void;
  reorderAllPastItems: () => void;
  completedOrders: Order[];
  submitOrder: (paymentMethod: 'card' | 'apple_pay' | 'cash', pickupType: 'aqui' | 'llevar') => Order;
  // Modals & Drawers state
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isHistoryOpen: boolean;
  setIsHistoryOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  selectedCustomizingProduct: Product | null;
  setSelectedCustomizingProduct: (p: Product | null) => void;
  lastCompletedOrder: Order | null;
  setLastCompletedOrder: (o: Order | null) => void;
  notifications: NotificationItem[];
  markNotificationsAsRead: () => void;
  unreadNotificationsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: "¡Bienvenido a COFFEE'S POS!",
    message: 'Disfruta de café de especialidad tostado localmente y granos con cada pedido.',
    time: 'Hace 5 min',
    read: false,
    icon: 'local_cafe',
  },
  {
    id: 'notif-2',
    title: 'Doble Granos en Café Frío',
    message: 'Hoy obtén el doble de granos al ordenar Nitro Cold Brew o Caramel Iced Latte.',
    time: 'Hace 1 hora',
    read: false,
    icon: 'star',
  },
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, isGuest, guestName, addGranos } = useAuth();
  const { showToast } = useToast();

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('taffy_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [pastOrders, setPastOrders] = useState<PastOrderItem[]>(() => {
    const saved = localStorage.getItem('taffy_past_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PAST_ORDERS;
  });

  const [completedOrders, setCompletedOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('taffy_completed_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [discount, setDiscount] = useState<number>(0);

  // Drawer / Modals UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedCustomizingProduct, setSelectedCustomizingProduct] = useState<Product | null>(null);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);

  useEffect(() => {
    localStorage.setItem('taffy_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('taffy_past_orders', JSON.stringify(pastOrders));
  }, [pastOrders]);

  useEffect(() => {
    localStorage.setItem('taffy_completed_orders', JSON.stringify(completedOrders));
  }, [completedOrders]);

  const addToCart = (
    product: Product,
    customizations?: CustomizationOptions,
    quantity = 1,
    cupName?: string
  ) => {
    let finalPrice = product.price;

    // Calculate customization cost extras
    if (customizations) {
      if (customizations.size === 'Grande 16 oz') finalPrice += 0.70;
      if (customizations.milk?.includes('Avena') || customizations.milk?.includes('Almendra')) finalPrice += 0.60;
      if (customizations.shots?.includes('Doble')) finalPrice += 0.50;
      if (customizations.syrup?.includes('Caramelo') || customizations.syrup?.includes('Vainilla')) finalPrice += 0.50;
    }

    const assignedCupName =
      cupName || (currentUser ? currentUser.name : isGuest ? guestName : 'Cliente');

    const newItem: CartItem = {
      cartItemId: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      productId: product.id,
      name: product.name,
      price: finalPrice,
      basePrice: product.price,
      quantity,
      image: product.image,
      customizations,
      cupName: assignedCupName,
    };

    setCart((prev) => [...prev, newItem]);
    showToast(`"${product.name}" agregado al pedido`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
  };

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const grandTotal = Math.max(0, subtotal - discount);

  const reorderPastItem = (pastItem: PastOrderItem) => {
    const assignedCupName = currentUser ? currentUser.name : isGuest ? guestName : 'Cliente';
    const newItem: CartItem = {
      cartItemId: `reorder-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      productId: pastItem.productId,
      name: pastItem.name,
      price: pastItem.price,
      basePrice: pastItem.price,
      quantity: 1,
      image: pastItem.image,
      customizations: pastItem.customizations,
      cupName: assignedCupName,
    };

    setCart((prev) => [...prev, newItem]);
    showToast(`"${pastItem.name}" añadido a tu pedido`, 'success');
  };

  const reorderAllPastItems = () => {
    const assignedCupName = currentUser ? currentUser.name : isGuest ? guestName : 'Cliente';
    const newItems: CartItem[] = pastOrders.map((past, index) => ({
      cartItemId: `reorder-all-${Date.now()}-${index}`,
      productId: past.productId,
      name: past.name,
      price: past.price,
      basePrice: past.price,
      quantity: 1,
      image: past.image,
      customizations: past.customizations,
      cupName: assignedCupName,
    }));

    setCart((prev) => [...prev, ...newItems]);
    setIsHistoryOpen(false);
    setIsCartOpen(true);
    showToast(`Se agregaron ${newItems.length} pedidos al carrito`, 'success');
  };

  const submitOrder = (
    paymentMethod: 'card' | 'apple_pay' | 'cash',
    pickupType: 'aqui' | 'llevar'
  ): Order => {
    const orderNumber = `#T-${Math.floor(100 + Math.random() * 900)}`;
    const assignedCupName = currentUser ? currentUser.name : isGuest ? guestName : 'Cliente';

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber,
      date: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      subtotal,
      discount,
      total: grandTotal,
      cupName: assignedCupName,
      pickupType,
      paymentMethod,
      status: 'recibido',
      userEmail: currentUser?.email,
    };

    setCompletedOrders((prev) => [newOrder, ...prev]);
    setLastCompletedOrder(newOrder);

    // Also append new items to past orders history
    cart.forEach((cItem) => {
      const existing = pastOrders.find((p) => p.name === cItem.name);
      if (!existing) {
        const newPast: PastOrderItem = {
          id: `past-${Date.now()}-${cItem.productId}`,
          productId: cItem.productId,
          name: cItem.name,
          details: cItem.customizations
            ? `${cItem.customizations.size} · ${cItem.customizations.milk || 'Original'}`
            : 'Selección de la casa',
          price: cItem.price,
          category: 'caliente',
          image: cItem.image,
          customizations: cItem.customizations,
        };
        setPastOrders((prev) => [newPast, ...prev]);
      }
    });

    // Add reward points (10 granos per item ordered)
    if (currentUser) {
      addGranos(totalItemsCount * 10);
    }

    // Add status notification
    const orderNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Pedido ${orderNumber} Confirmado`,
      message: `Tu pedido para "${assignedCupName}" está en preparación en barra.`,
      time: 'Ahora',
      read: false,
      icon: 'receipt_long',
    };
    setNotifications((prev) => [orderNotif, ...prev]);

    clearCart();
    setIsCartOpen(false);

    return newOrder;
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        discount,
        setDiscount,
        grandTotal,
        pastOrders,
        reorderPastItem,
        reorderAllPastItems,
        completedOrders,
        submitOrder,
        isCartOpen,
        setIsCartOpen,
        isHistoryOpen,
        setIsHistoryOpen,
        isProfileOpen,
        setIsProfileOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        selectedCustomizingProduct,
        setSelectedCustomizingProduct,
        lastCompletedOrder,
        setLastCompletedOrder,
        notifications,
        markNotificationsAsRead,
        unreadNotificationsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
