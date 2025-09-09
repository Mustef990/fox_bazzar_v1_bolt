import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';
import { 
  ShoppingCart, 
  Clock, 
  Package, 
  Truck, 
  CircleCheck as CheckCircle,
  MapPin,
  Phone,
  Star,
  Filter
} from 'lucide-react-native';

export default function CustomerOrdersScreen() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const { user } = useAuth();
  const { orders, loading } = useOrders(user?.id, 'customer');

  const statusFilters = [
    { key: 'all', label: 'الكل', count: orders.length },
    { key: 'pending', label: 'معلق', count: orders.filter(o => o.status === 'pending').length },
    { key: 'confirmed', label: 'مؤكد', count: orders.filter(o => o.status === 'confirmed').length },
    { key: 'preparing', label: 'قيد التحضير', count: orders.filter(o => o.status === 'preparing').length },
    { key: 'in_transit', label: 'في الطريق', count: orders.filter(o => o.status === 'in_transit').length },
    { key: 'delivered', label: 'تم التسليم', count: orders.filter(o => o.status === 'delivered').length },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'confirmed': return '#3b82f6';
      case 'preparing': return '#8b5cf6';
      case 'ready': return '#059669';
      case 'in_transit': return '#06b6d4';
      case 'delivered': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'معلق';
      case 'confirmed': return 'مؤكد';
      case 'preparing': return 'قيد التحضير';
      case 'ready': return 'جاهز';
      case 'in_transit': return 'في الطريق';
      case 'delivered': return 'تم التسليم';
      case 'cancelled': return 'ملغي';
      default: return 'غير معروف';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'confirmed': return CheckCircle;
      case 'preparing': return Package;
      case 'ready': return Package;
      case 'in_transit': return Truck;
      case 'delivered': return CheckCircle;
      default: return Clock;
    }
  };

  const filteredOrders = orders.filter(order => 
    selectedStatus === 'all' || order.status === selectedStatus
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#dc2626', '#ef4444']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>طلباتي</Text>
        <Text style={styles.headerSubtitle}>
          تتبع ومراجعة طلباتك
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
          ) : filteredOrders.length === 0 ? (
            <View style={styles.emptyState}>
              <ShoppingCart size={64} color="#94a3b8" />
              <Text style={styles.emptyStateTitle}>لا توجد طلبات</Text>
              <Text style={styles.emptyStateText}>
                ابدأ بالتسوق وإضافة منتجات إلى السلة
              </Text>
            </View>
          ) : filteredOrders.map((order: any) => {
            const StatusIcon = getStatusIcon(order.status);
            return (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View style={styles.orderIdContainer}>
                    <Text style={styles.orderId}>#{order.id.slice(0, 8)}</Text>
                    <Text style={styles.orderDate}>
                      {new Date(order.created_at).toLocaleDateString('ar-SY')}
                    </Text>
                  </View>
                  
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                    <StatusIcon size={14} color="#fff" />
                    <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
                  </View>
                </View>
                
                <View style={styles.merchantInfo}>
                  <Text style={styles.merchantName}>
                    {order.merchant?.name || 'متجر'}
                  </Text>
                  <Text style={styles.orderTotal}>
                    ${order.total_amount}
                  </Text>
                </View>
                
                <View style={styles.deliveryInfo}>
                  <MapPin size={16} color="#64748b" />
                  <Text style={styles.deliveryAddress}>{order.delivery_address}</Text>
                </View>
                
                {order.order_items && order.order_items.length > 0 && (
                  <View style={styles.itemsPreview}>
                    <Text style={styles.itemsTitle}>
                      {order.order_items.length} منتج
                    </Text>
                    <View style={styles.itemsImages}>
                      {order.order_items.slice(0, 3).map((item: any, index: number) => (
                        <Image
                          key={index}
                          source={{ 
                            uri: item.product?.image_url || 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=100'
                          }}
                          style={[styles.itemImage, { marginLeft: index > 0 ? -10 : 0 }]}
                        />
                      ))}
                      {order.order_items.length > 3 && (
                        <View style={styles.moreItems}>
                          <Text style={styles.moreItemsText}>+{order.order_items.length - 3}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                )}
                
                <View style={styles.orderActions}>
                  <TouchableOpacity style={styles.trackButton}>
                    <Truck size={16} color="#fff" />
                    <Text style={styles.trackButtonText}>تتبع الطلب</Text>
                  </TouchableOpacity>
                  
                  {order.status === 'delivered' && (
                    <TouchableOpacity style={styles.reviewButton}>
                      <Star size={16} color="#fff" />
                      <Text style={styles.reviewButtonText}>تقييم</Text>
                    </TouchableOpacity>
                  )}
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
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
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
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    textAlign: 'center',
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
  merchantInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  merchantName: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
  },
  orderTotal: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#dc2626',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'flex-end',
  },
  deliveryAddress: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginRight: 8,
    flex: 1,
    textAlign: 'right',
  },
  itemsPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
  },
  itemsTitle: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
  },
  itemsImages: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  moreItems: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
  },
  moreItemsText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc2626',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  trackButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 6,
  },
  reviewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fbbf24',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  reviewButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 6,
  },
});