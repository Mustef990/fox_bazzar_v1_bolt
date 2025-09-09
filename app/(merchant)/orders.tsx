import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ShoppingCart, Search, Filter, Clock, CircleCheck as CheckCircle, Circle as XCircle, Package, Truck, MapPin, Phone, User } from 'lucide-react-native';

export default function MerchantOrdersScreen() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const { user } = useAuth();
  const { orders, loading, updateOrderStatus } = useOrders(user?.id, 'merchant');

  const statusFilters = [
    { key: 'all', label: 'الكل', count: orders.length },
    { key: 'pending', label: 'معلق', count: orders.filter(o => o.status === 'pending').length },
    { key: 'confirmed', label: 'مؤكد', count: orders.filter(o => o.status === 'confirmed').length },
    { key: 'preparing', label: 'قيد التحضير', count: orders.filter(o => o.status === 'preparing').length },
    { key: 'ready', label: 'جاهز', count: orders.filter(o => o.status === 'ready').length },
    { key: 'delivered', label: 'تم التسليم', count: orders.filter(o => o.status === 'delivered').length },
  ];


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#3b82f6';
      case 'confirmed': return '#059669';
      case 'preparing': return '#f59e0b';
      case 'ready': return '#8b5cf6';
      case 'delivered': return '#059669';
      case 'cancelled': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'معلق';
      case 'confirmed': return 'مؤكد';
      case 'preparing': return 'قيد التحضير';
      case 'ready': return 'جاهز للتوصيل';
      case 'delivered': return 'تم التسليم';
      case 'cancelled': return 'ملغي';
      default: return 'غير معروف';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return ShoppingCart;
      case 'confirmed': return CheckCircle;
      case 'preparing': return Clock;
      case 'ready': return Package;
      case 'delivered': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    Alert.alert(
      'تغيير حالة الطلب',
      `هل تريد تغيير حالة الطلب إلى "${getStatusText(newStatus)}"؟`,
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'تأكيد', 
          onPress: async () => {
            const { error } = await updateOrderStatus(orderId, newStatus as any);
            if (error) {
              Alert.alert('خطأ', error);
            } else {
              Alert.alert('تم بنجاح', 'تم تحديث حالة الطلب');
            }
          }
        }
      ]
    );
  };

  const filteredOrders = orders.filter(order => 
    selectedStatus === 'all' || order.status === selectedStatus
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#059669', '#10b981']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>إدارة الطلبات</Text>
        <Text style={styles.headerSubtitle}>
          متابعة ومعالجة طلبات العملاء
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          {statusFilters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterChip,
                selectedStatus === filter.key && styles.activeFilterChip
              ]}
              onPress={() => setSelectedStatus(filter.key)}
            >
              <Text style={[
                styles.filterChipText,
                selectedStatus === filter.key && styles.activeFilterChipText
              ]}>
                {filter.label}
              </Text>
              <View style={[
                styles.filterCount,
                selectedStatus === filter.key && styles.activeFilterCount
              ]}>
                <Text style={[
                  styles.filterCountText,
                  selectedStatus === filter.key && styles.activeFilterCountText
                ]}>
                  {filter.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>جاري تحميل الطلبات...</Text>
            </View>
          ) : filteredOrders.map((order: any) => {
            const StatusIcon = getStatusIcon(order.status);
            return (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View style={styles.orderIdContainer}>
                    <Text style={styles.orderId}>#{order.id.slice(0, 8)}</Text>
                    <Text style={styles.orderDate}>{new Date(order.created_at).toLocaleDateString('ar-SY')}</Text>
                  </View>
                  
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                    <StatusIcon size={14} color="#fff" />
                    <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
                  </View>
                </View>
                
                <View style={styles.customerInfo}>
                  <View style={styles.customerDetails}>
                    <User size={16} color="#64748b" />
                    <Text style={styles.customerName}>{order.customer?.name || 'عميل'}</Text>
                  </View>
                  
                  <View style={styles.customerDetails}>
                    <Phone size={16} color="#64748b" />
                    <Text style={styles.customerPhone}>{order.customer?.phone || 'غير متوفر'}</Text>
                  </View>
                  
                  <View style={styles.customerDetails}>
                    <MapPin size={16} color="#64748b" />
                    <Text style={styles.customerAddress}>{order.delivery_address}</Text>
                  </View>
                </View>
                
                <View style={styles.orderItems}>
                  <Text style={styles.itemsTitle}>المنتجات:</Text>
                  {order.order_items?.map((item: any, index: number) => (
                    <View key={index} style={styles.orderItem}>
                      <Text style={styles.itemName}>{item.product?.name || 'منتج'}</Text>
                      <Text style={styles.itemDetails}>
                        {item.quantity} × ${item.price} = ${item.quantity * item.price}
                      </Text>
                    </View>
                  ))}
                  
                  <View style={styles.orderTotal}>
                    <Text style={styles.totalLabel}>الإجمالي:</Text>
                    <Text style={styles.totalAmount}>${order.total_amount}</Text>
                  </View>
                </View>
                
                {order.notes && (
                  <View style={styles.notesContainer}>
                    <Text style={styles.notesLabel}>ملاحظات:</Text>
                    <Text style={styles.notesText}>{order.notes}</Text>
                  </View>
                )}
                
                <View style={styles.orderActions}>
                  {order.status === 'pending' && (
                    <>
                      <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: '#059669' }]}
                        onPress={() => handleStatusChange(order.id, 'confirmed')}
                      >
                        <CheckCircle size={16} color="#fff" />
                        <Text style={styles.actionButtonText}>تأكيد الطلب</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: '#ef4444' }]}
                        onPress={() => handleStatusChange(order.id, 'cancelled')}
                      >
                        <XCircle size={16} color="#fff" />
                        <Text style={styles.actionButtonText}>إلغاء</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  
                  {order.status === 'confirmed' && (
                    <>
                      <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: '#f59e0b' }]}
                        onPress={() => handleStatusChange(order.id, 'preparing')}
                      >
                        <Clock size={16} color="#fff" />
                        <Text style={styles.actionButtonText}>بدء التحضير</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  
                  {order.status === 'preparing' && (
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: '#8b5cf6' }]}
                      onPress={() => handleStatusChange(order.id, 'ready')}
                    >
                      <Package size={16} color="#fff" />
                      <Text style={styles.actionButtonText}>جاهز للتوصيل</Text>
                    </TouchableOpacity>
                  )}
                  
                  {order.status === 'ready' && (
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: '#059669' }]}
                      onPress={() => handleStatusChange(order.id, 'delivered')}
                    >
                      <CheckCircle size={16} color="#fff" />
                      <Text style={styles.actionButtonText}>تم التسليم</Text>
                    </TouchableOpacity>
                  )}
                  
                  <TouchableOpacity style={styles.contactButton}>
                    <Phone size={16} color="#3b82f6" />
                    <Text style={[styles.actionButtonText, { color: '#3b82f6' }]}>اتصال</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
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
  filtersContainer: {
    marginBottom: 20,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  activeFilterChip: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  filterChipText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
    marginRight: 8,
  },
  activeFilterChipText: {
    color: '#fff',
  },
  filterCount: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  activeFilterCount: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  filterCountText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
  },
  activeFilterCountText: {
    color: '#fff',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderIdContainer: {
    flex: 1,
  },
  orderId: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    textAlign: 'right',
  },
  orderDate: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginTop: 2,
    textAlign: 'right',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 4,
  },
  customerInfo: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  customerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'flex-end',
  },
  customerName: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginRight: 8,
  },
  customerPhone: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginRight: 8,
  },
  customerAddress: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginRight: 8,
    flex: 1,
    textAlign: 'right',
  },
  orderItems: {
    marginBottom: 16,
  },
  itemsTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'right',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemName: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#374151',
    flex: 1,
    textAlign: 'right',
  },
  itemDetails: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
  },
  totalAmount: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#059669',
  },
  notesContainer: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  notesLabel: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
    marginBottom: 4,
    textAlign: 'right',
  },
  notesText: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    textAlign: 'right',
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
    minWidth: '45%',
    justifyContent: 'center',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#3b82f6',
    marginBottom: 8,
    minWidth: '45%',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 6,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
  },
});