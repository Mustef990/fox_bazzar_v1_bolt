import React, { useState } from 'react';
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

  const statusFilters = [
    { key: 'all', label: 'الكل', count: 45 },
    { key: 'new', label: 'جديد', count: 12 },
    { key: 'preparing', label: 'قيد التحضير', count: 8 },
    { key: 'ready', label: 'جاهز للتوصيل', count: 15 },
    { key: 'delivered', label: 'تم التسليم', count: 10 },
  ];

  const orders = [
    {
      id: '#1234',
      customer: {
        name: 'أحمد محمد',
        phone: '+963 123 456 789',
        address: 'شارع الثورة، دمشق، سوريا'
      },
      items: [
        { name: 'هاتف ذكي', quantity: 1, price: 599 },
        { name: 'غطاء حماية', quantity: 2, price: 25 }
      ],
      total: 649,
      status: 'new',
      orderDate: '2024-01-15 14:30',
      estimatedDelivery: '2024-01-16 16:00',
      paymentMethod: 'بطاقة ائتمانية',
      notes: 'يرجى التوصيل بعد الساعة 3 مساءً'
    },
    {
      id: '#1235',
      customer: {
        name: 'فاطمة علي',
        phone: '+963 987 654 321',
        address: 'حي المزة، دمشق، سوريا'
      },
      items: [
        { name: 'لابتوب', quantity: 1, price: 1299 }
      ],
      total: 1299,
      status: 'preparing',
      orderDate: '2024-01-15 12:15',
      estimatedDelivery: '2024-01-16 14:00',
      paymentMethod: 'نقداً عند التسليم',
      notes: ''
    },
    {
      id: '#1236',
      customer: {
        name: 'محمد حسن',
        phone: '+963 555 123 456',
        address: 'حي الصالحية، دمشق، سوريا'
      },
      items: [
        { name: 'ساعة ذكية', quantity: 1, price: 299 },
        { name: 'سماعات', quantity: 1, price: 199 }
      ],
      total: 498,
      status: 'ready',
      orderDate: '2024-01-15 10:45',
      estimatedDelivery: '2024-01-15 18:00',
      paymentMethod: 'محفظة إلكترونية',
      notes: 'طلب عاجل'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return '#3b82f6';
      case 'preparing': return '#f59e0b';
      case 'ready': return '#8b5cf6';
      case 'delivered': return '#059669';
      case 'cancelled': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'جديد';
      case 'preparing': return 'قيد التحضير';
      case 'ready': return 'جاهز للتوصيل';
      case 'delivered': return 'تم التسليم';
      case 'cancelled': return 'ملغي';
      default: return 'غير معروف';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return ShoppingCart;
      case 'preparing': return Clock;
      case 'ready': return Package;
      case 'delivered': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    Alert.alert(
      'تغيير حالة الطلب',
      `هل تريد تغيير حالة الطلب ${orderId} إلى "${getStatusText(newStatus)}"؟`,
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'تأكيد', 
          onPress: () => {
            Alert.alert('تم بنجاح', 'تم تحديث حالة الطلب');
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
          {filteredOrders.map((order) => {
            const StatusIcon = getStatusIcon(order.status);
            return (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View style={styles.orderIdContainer}>
                    <Text style={styles.orderId}>{order.id}</Text>
                    <Text style={styles.orderDate}>{order.orderDate}</Text>
                  </View>
                  
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                    <StatusIcon size={14} color="#fff" />
                    <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
                  </View>
                </View>
                
                <View style={styles.customerInfo}>
                  <View style={styles.customerDetails}>
                    <User size={16} color="#64748b" />
                    <Text style={styles.customerName}>{order.customer.name}</Text>
                  </View>
                  
                  <View style={styles.customerDetails}>
                    <Phone size={16} color="#64748b" />
                    <Text style={styles.customerPhone}>{order.customer.phone}</Text>
                  </View>
                  
                  <View style={styles.customerDetails}>
                    <MapPin size={16} color="#64748b" />
                    <Text style={styles.customerAddress}>{order.customer.address}</Text>
                  </View>
                </View>
                
                <View style={styles.orderItems}>
                  <Text style={styles.itemsTitle}>المنتجات:</Text>
                  {order.items.map((item, index) => (
                    <View key={index} style={styles.orderItem}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemDetails}>
                        {item.quantity} × ${item.price} = ${item.quantity * item.price}
                      </Text>
                    </View>
                  ))}
                  
                  <View style={styles.orderTotal}>
                    <Text style={styles.totalLabel}>الإجمالي:</Text>
                    <Text style={styles.totalAmount}>${order.total}</Text>
                  </View>
                </View>
                
                {order.notes && (
                  <View style={styles.notesContainer}>
                    <Text style={styles.notesLabel}>ملاحظات:</Text>
                    <Text style={styles.notesText}>{order.notes}</Text>
                  </View>
                )}
                
                <View style={styles.orderActions}>
                  {order.status === 'new' && (
                    <>
                      <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: '#f59e0b' }]}
                        onPress={() => handleStatusChange(order.id, 'preparing')}
                      >
                        <Clock size={16} color="#fff" />
                        <Text style={styles.actionButtonText}>بدء التحضير</Text>
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
});