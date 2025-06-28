import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Truck, MapPin, Clock, DollarSign, Package, CircleCheck as CheckCircle, Navigation, Bell, Star, Activity } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function DeliveryDashboard() {
  const [isOnline, setIsOnline] = useState(true);

  const stats = [
    {
      title: 'طلبات اليوم',
      value: '12',
      change: '+3',
      icon: Package,
      color: '#7c3aed',
      gradient: ['#7c3aed', '#a855f7']
    },
    {
      title: 'المكتملة',
      value: '8',
      change: '+2',
      icon: CheckCircle,
      color: '#059669',
      gradient: ['#059669', '#10b981']
    },
    {
      title: 'أرباح اليوم',
      value: '$85',
      change: '+$15',
      icon: DollarSign,
      color: '#f59e0b',
      gradient: ['#f59e0b', '#fbbf24']
    },
    {
      title: 'متوسط التقييم',
      value: '4.9',
      change: '+0.1',
      icon: Star,
      color: '#3b82f6',
      gradient: ['#3b82f6', '#60a5fa']
    }
  ];

  const activeOrders = [
    {
      id: '#1234',
      customer: 'أحمد محمد',
      address: 'شارع الثورة، دمشق',
      distance: '2.5 كم',
      time: '15 دقيقة',
      amount: '$25',
      status: 'في الطريق'
    },
    {
      id: '#1235',
      customer: 'فاطمة علي',
      address: 'حي المزة، دمشق',
      distance: '1.8 كم',
      time: '10 دقائق',
      amount: '$18',
      status: 'جاهز للاستلام'
    },
  ];

  const quickActions = [
    { title: 'عرض الخريطة', icon: MapPin, color: '#3b82f6' },
    { title: 'طلبات جديدة', icon: Package, color: '#059669' },
    { title: 'تقرير اليوم', icon: Activity, color: '#f59e0b' },
    { title: 'الإعدادات', icon: Bell, color: '#8b5cf6' }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#7c3aed', '#a855f7']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcomeText}>مرحباً بك</Text>
              <Text style={styles.driverName}>محمد أحمد</Text>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>
                {isOnline ? 'متاح' : 'غير متاح'}
              </Text>
              <Switch
                value={isOnline}
                onValueChange={setIsOnline}
                trackColor={{ false: '#64748b', true: '#10b981' }}
                thumbColor={isOnline ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>
          
          <View style={styles.todayStats}>
            <View style={styles.todayStatItem}>
              <Clock size={20} color="#fff" />
              <Text style={styles.todayStatValue}>6 ساعات</Text>
              <Text style={styles.todayStatLabel}>وقت العمل</Text>
            </View>
            <View style={styles.todayStatItem}>
              <Navigation size={20} color="#fff" />
              <Text style={styles.todayStatValue}>45 كم</Text>
              <Text style={styles.todayStatLabel}>المسافة المقطوعة</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <TouchableOpacity key={index} style={styles.statCard}>
              <LinearGradient
                colors={stat.gradient}
                style={styles.statGradient}
              >
                <View style={styles.statIcon}>
                  <stat.icon size={24} color="#fff" />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
                <Text style={styles.statChange}>{stat.change}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>إجراءات سريعة</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickActionCard}>
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <action.icon size={20} color="#fff" />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الطلبات النشطة</Text>
          <View style={styles.ordersContainer}>
            {activeOrders.map((order, index) => (
              <View key={index} style={styles.orderItem}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                    <Text style={styles.statusText}>{order.status}</Text>
                  </View>
                </View>
                
                <View style={styles.orderDetails}>
                  <View style={styles.customerInfo}>
                    <Text style={styles.customerName}>{order.customer}</Text>
                    <View style={styles.addressContainer}>
                      <MapPin size={14} color="#64748b" />
                      <Text style={styles.addressText}>{order.address}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.orderMeta}>
                    <View style={styles.metaItem}>
                      <Navigation size={14} color="#64748b" />
                      <Text style={styles.metaText}>{order.distance}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Clock size={14} color="#64748b" />
                      <Text style={styles.metaText}>{order.time}</Text>
                    </View>
                    <Text style={styles.orderAmount}>{order.amount}</Text>
                  </View>
                </View>
                
                <View style={styles.orderActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <MapPin size={16} color="#fff" />
                    <Text style={styles.actionButtonText}>عرض الخريطة</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
                    <CheckCircle size={16} color="#fff" />
                    <Text style={styles.actionButtonText}>تأكيد التسليم</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'جاهز للاستلام': return '#3b82f6';
    case 'في الطريق': return '#f59e0b';
    case 'تم التسليم': return '#059669';
    default: return '#64748b';
  }
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
  },
  headerContent: {
    flex: 1,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  driverName: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginTop: 4,
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginBottom: 8,
  },
  todayStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  todayStatItem: {
    alignItems: 'center',
  },
  todayStatValue: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginTop: 8,
  },
  todayStatLabel: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: (width - 50) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 8,
  },
  statChange: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'right',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 50) / 2,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
    textAlign: 'center',
  },
  ordersContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  orderItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  orderDetails: {
    marginBottom: 16,
  },
  customerInfo: {
    marginBottom: 8,
  },
  customerName: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
    textAlign: 'right',
    marginBottom: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  addressText: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginRight: 4,
    textAlign: 'right',
  },
  orderMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginLeft: 4,
  },
  orderAmount: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#059669',
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#64748b',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  primaryButton: {
    backgroundColor: '#7c3aed',
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 4,
  },
});