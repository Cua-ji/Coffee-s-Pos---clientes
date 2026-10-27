export type CategoryId = 'caliente' | 'frio' | 'te' | 'panaderia' | 'snacks';

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  count: number;
}

export interface CustomizationOptions {
  size: 'Chico 8 oz' | 'Mediano 12 oz' | 'Grande 16 oz';
  milk?: 'Entera' | 'Deslactosada' | 'Avena Orgánica (+ $0.60)' | 'Almendra (+ $0.60)';
  shots?: 'Normal (1 shot)' | 'Doble shot (+ $0.50)' | 'Descafeinado';
  syrup?: 'Sin endulzante' | 'Caramelo Artesanal (+ $0.50)' | 'Vainilla Madagascar (+ $0.50)' | 'Stevia Natural';
  ice?: 'Sin hielo' | 'Poco hielo' | 'Hielo regular' | 'Extra hielo';
  warming?: 'Frío / Natural' | 'Calentado al horno';
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  image: string;
  badge?: string;
  isFavorite?: boolean;
  customizable: boolean;
  defaultOptions?: Partial<CustomizationOptions>;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  price: number;
  basePrice: number;
  quantity: number;
  image: string;
  customizations?: CustomizationOptions;
  cupName: string;
}

export interface PastOrderItem {
  id: string;
  productId: string;
  name: string;
  details: string;
  price: number;
  category: CategoryId;
  image: string;
  customizations?: CustomizationOptions;
}

export interface User {
  id: string;
  name: string;
  email: string;
  pin: string;
  granos: number;
  favorites: string[];
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  cupName: string;
  pickupType: 'aqui' | 'llevar';
  paymentMethod: 'card' | 'apple_pay' | 'cash';
  status: 'recibido' | 'preparando' | 'listo' | 'entregado';
  userEmail?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
}
