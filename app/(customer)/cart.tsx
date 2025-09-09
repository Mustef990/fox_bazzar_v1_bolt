import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';
import { useCart } from '@/hooks/useCart';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard,
  MapPin,
  Clock,
  Tag
} from 'lucide-react-native';

export default function CartScreen() {
  const { user } = useAuth();
  const { createOrder } = useOrders(user?.id, 'customer');
  const { 
    cartItems, 
    loading: cartLoading, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    getCartTotal 
  } = useCart();

  const removeItem = (id: string) => {
    Alert.alert(
      'حذف المنتج',
      'هل تريد حذف هذا المنتج من السلة؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'حذف', 
          style: 'destructive',
          onPress: () => removeFromCart(id)
        }
      ]
    );
  };

  const subtotal = getCartTotal();
  const savings = cartItems.reduce((sum, item) => {
    if (item.original_price) {
      return sum + ((item.original_price - item.price) * item.quantity);
    }
    return sum;
  }, 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      Alert.alert('السلة فارغة', 'أضف منتجات إلى السلة أولاً');
      return;
    }
    
    if (!user) {
      Alert.alert('تسجيل الدخول مطلوب', 'يرجى تسجيل الدخول لإتمام الطلب');
      return;
    }
    
    // تجميع المنتجات حسب التاجر
    const merchantGroups = cartItems.reduce((groups: any, item) => {
      const merchantId = item.merchant_id || 'default-merchant';
      if (!groups[merchantId]) {
        groups[merchantId] = [];
      }
      groups[merchantId].push(item);
      return groups;
    }, {});
    
    try {
      // إنشاء طلب منفصل لكل تاجر
      for (const [merchantId, items] of Object.entries(merchantGroups)) {
        const orderItems = (items as any[]).map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        }));
        
        const orderTotal = (items as any[]).reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const { error } = await createOrder({
          merchant_id: merchantId,
          total_amount: orderTotal + (orderTotal > 50 ? 0 : 10), // إضافة رسوم التوصيل
          delivery_address: 'شارع الثورة، دمشق، سوريا', // يجب أن يأتي من ملف المستخدم
          notes: 'طلب من التطبيق',
          items: orderItems
        });
        
        if (error) {
          Alert.alert('خطأ في الطلب', error);
          return;
        }
      }
      
      // مسح السلة بعد نجاح الطلب
      clearCart();
      Alert.alert('تم الطلب بنجاح', 'سيتم التواصل معك قريباً لتأكيد الطلب');
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء إنشاء الطلب');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#dc2626', '#ef4444']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>سلة التسوق</Text>
        <Text style={styles.headerSubtitle}>
          {cartItems.length} منتج في السلة
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyCart}>
            <ShoppingCart size={64} color="#94a3b8" />
            <Text style={styles.emptyCartTitle}>السلة فارغة</Text>
            <Text style={styles.emptyCartText}>
              ابدأ بإضافة منتجات إلى سلة التسوق
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.itemsContainer}>
              {cartItems.map((item: any) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image source={{ 
                    uri: item.image_url || 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=300'
                  }} style={styles.itemImage} />
                  
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemMerchant}>متجر</Text>
                    
                    <View style={styles.priceContainer}>
                      {item.original_price && (
                        <Text style={styles.originalPrice}>${item.original_price}</Text>
                      )}
                      <Text style={styles.currentPrice}>${item.price}</Text>
                    </View>
                    
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={16} color="#dc2626" />
                      </TouchableOpacity>
                      
                      <Text style={styles.quantity}>{item.quantity}</Text>
                      
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={16} color="#dc2626" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  <View style={styles.itemActions}>
                    <Text style={styles.itemTotal}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeItem(item.id)}
                    >
                      <Trash2 size={20} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.deliveryInfo}>
              <View style={styles.deliveryHeader}>
                <MapPin size={20} color="#059669" />
                <Text style={styles.deliveryTitle}>معلومات التوصيل</Text>
              </View>
              <Text style={styles.deliveryAddress}>
                شارع الثورة، دمشق، سوريا
              </Text>
              <View style={styles.deliveryTime}>
                <Clock size={16} color="#64748b" />
                <Text style={styles.deliveryTimeText}>
                  التوصيل خلال 30-45 دقيقة
                </Text>
              </View>
            </View>

            <View style={styles.promoSection}>
              <View style={styles.promoHeader}>
                <Tag size={20} color="#f59e0b" />
                <Text style={styles.promoTitle}>كود الخصم</Text>
              </View>
              <TouchableOpacity style={styles.promoButton}>
                <Text style={styles.promoButtonText}>أضف كود خصم</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>المجموع الفرعي</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            
            {savings > 0 && (
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: '#059669' }]}>
                  توفير
                </Text>
                <Text style={[styles.summaryValue, { color: '#059669' }]}>
                  -${savings.toFixed(2)}
                </Text>
              </View>
            )}
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>رسوم التوصيل</Text>
              <Text style={styles.summaryValue}>
                {shipping === 0 ? 'مجاني' : `$${shipping.toFixed(2)}`}
              </Text>
            </View>
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>الإجمالي</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <LinearGradient
              colors={['#dc2626', '#ef4444']}
              style={styles.checkoutGradient}
            >
              <CreditCard size={20} color="#fff" />
              <Text style={styles.checkoutButtonText}>
                إتمام الطلب - ${total.toFixed(2)}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emptyCart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  emptyCartTitle: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyCartText: {
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    textAlign: 'center',
  },
  itemsContainer: {
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  itemMerchant: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginBottom: 8,
    textAlign: 'right',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  originalPrice: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#94a3b8',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  currentPrice: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#dc2626',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  quantity: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginHorizontal: 16,
  },
  itemActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTotal: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#059669',
    marginBottom: 12,
  },
  removeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryInfo: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  deliveryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginLeft: 8,
  },
  deliveryAddress: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    textAlign: 'right',
    marginBottom: 8,
  },
  deliveryTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  deliveryTimeText: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginRight: 4,
  },
  promoSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  promoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  promoTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginLeft: 8,
  },
  promoButton: {
    borderWidth: 2,
    borderColor: '#f59e0b',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  promoButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#f59e0b',
  },
  checkoutContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
  },
  totalValue: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#dc2626',
  },
  checkoutButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  checkoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
});