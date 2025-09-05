export interface User {
  id: string;
  email: string;
  role: 'admin' | 'merchant' | 'customer' | 'delivery';
  name: string;
  phone?: string;
  address?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  merchant_id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  category: string;
  stock: number;
  sku: string;
  image_url?: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  rating: number;
  reviews_count: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_id: string;
  merchant_id: string;
  delivery_id?: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'in_transit' | 'delivered' | 'cancelled';
  total_amount: number;
  delivery_address: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  currency: 'USD' | 'SYP';
  balance: number;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  wallet_id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  reference_id?: string;
  created_at: string;
}