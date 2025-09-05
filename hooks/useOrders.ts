import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Order } from '@/types/database';

export function useOrders(userId?: string, role?: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId, role]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('orders')
        .select(`
          *,
          customer:profiles!customer_id(name, phone),
          merchant:profiles!merchant_id(name),
          delivery:profiles!delivery_id(name, phone),
          order_items(
            *,
            product:products(name, image_url)
          )
        `)
        .order('created_at', { ascending: false });

      // Filter based on user role
      if (role === 'customer') {
        query = query.eq('customer_id', userId);
      } else if (role === 'merchant') {
        query = query.eq('merchant_id', userId);
      } else if (role === 'delivery') {
        query = query.eq('delivery_id', userId);
      }
      // Admin can see all orders (no filter)

      const { data, error } = await query;

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في تحميل الطلبات');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'خطأ في تحديث حالة الطلب';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  const createOrder = async (orderData: {
    merchant_id: string;
    total_amount: number;
    delivery_address: string;
    notes?: string;
    items: Array<{
      product_id: string;
      quantity: number;
      price: number;
    }>;
  }) => {
    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          customer_id: userId,
          merchant_id: orderData.merchant_id,
          total_amount: orderData.total_amount,
          delivery_address: orderData.delivery_address,
          notes: orderData.notes
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        ...item
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      await fetchOrders(); // Refresh orders list
      return { data: order, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'خطأ في إنشاء الطلب';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    updateOrderStatus,
    createOrder
  };
}