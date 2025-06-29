import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Package, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  Users,
  Eye,
  Plus,
  Bell,
  Star,
  Activity,
  Menu,
  Megaphone,
  Wallet,
  Settings,
  ChartBar as BarChart3,
  Store
} from 'lucide-react-native';
import SideMenu from '@/components/SideMenu';

const { width } = Dimensions.get('window');

export default function MerchantDashboard() {
  const [sideMenuVisible, setSideMenuVisible] = useState(false);

  const stats = [
    {
      title: 'إجمالي المنتجات',
      value: '156',
      change: '+12',
      icon: Package,
      color: '#059669',
      gradient: ['#059669', '#10b981']
    },
    {
      title: 'الطلبات الجديدة',
      value: '23',
      change: '+5',
      icon: ShoppingCart,
      color: '#3b82f6',
      gradient: ['#3b82f6', '#60a5fa']
    },
    {
      title: 'المبيعات اليوم',
      value: '$1,250',
      change: '+18%',
      icon: DollarSign,
      color: '#f59e0b',
      gradient: ['#f59e0b', '#fbbf24']
    },
    {
      title: 'العملاء الجدد',
      value: '45',
      change: '+8',
      icon: Users,
      color: '#8b5cf6',
      gradient: ['#8b5cf6', '#a78bfa']
    }
  ];

  const quickActions = [
    { title: 'إضافة منتج', icon: Plus, color: '#059669' },
    { title: 'مراجعة الطلبات', icon: Eye, color: '#3b82f6' },
    { title: 'إنشاء إعلان', icon: Bell, color: '#f59e0b' },
    { title: 'تقارير المبيعات', icon: TrendingUp, color: '#8b5cf6' }
  ];

  const recentOrders = [
    { id: '#1234', customer: 'أحمد محمد', amount: '$125', status: 'جديد', time: 'منذ 5 دقائق' },
    { id: '#1235', customer: 'فاطمة علي', amount: '$89', status: 'قيد التحضير', time: 'منذ 15 دقيقة' },
    { id: '#1236', customer: 'محمد حسن', amount: '$200', status: 'جاهز للتوصيل', time: 'منذ 30 دقيقة' },
  ];

  const topProducts = [
    { name: 'هاتف ذكي', sales: 45, image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { name: 'لابتوب', sales: 32, image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=150' },
    { name: 'ساعة ذكية', sales: 28, image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=150' },
  ];

  const sideMenuSections = [
    {
      id: 'business',
      title: 'إدارة الأعمال',
      icon: Store,
      color: '#059669',
      items: [
        {
          id: 'customers',
          title: 'إدارة العملاء',
          icon: Users,
          color: '#3b82f6',
          onPress: () => console.log('Navigate to customers')
        },
        {
          id: 'analytics',
          title: 'تحليلات المتجر',
          icon: BarChart3,
          color: '#8b5cf6',
          onPress: () => console.log('Navigate to analytics')
        }
      ]
    },
    {
      id: 'marketing',
      title: 'التسويق والترويج',
      icon: Megaphone,
      color: '#f59e0b',
      items: [
        {
          id: 'ads',
          title: 'إدارة الإعلانات',
          icon: Megaphone,
          color: '#f59e0b',
          onPress: () => console.log('Navigate to ads')
        },
        {
          id: 'promotions',
          title: 'العروض والخصومات',
          icon: TrendingUp,
          color: '#ef4444',
          onPress: () => console.log('Navigate to promotions')
        }
      ]
    },
    {
      id: 'financial',
      title: 'الإدارة المالية',
      icon: Wallet,
      color: '#10b981',
      items: [
        {
          id: 'wallet',
          title: 'المحفظة',
          icon: Wallet,
          color: '#059669',
          onPress: () => console.log('Navigate to wallet')
        },
        {
          id: 'earnings',
          title: 'تقارير الأرباح',
          icon: DollarSign,
          color: '#10b981',
          onPress: () => console.log('Navigate to earnings')
        }
      ]
    },
    {
      id: 'settings',
      title: 'الإعدادات',
      icon: Settings,
      color: '#64748b',
      items: [
        {
          id: 'store-settings',
          title: 'إعدادات المتجر',
          icon: Settings,
          color: '#64748b',
          onPress: () => console.log('Navigate to settings')
        },
        {
          id: 'notifications',
          title: 'إعدادات الإشعارات',
          icon: Bell,
          color: '#f59e0b',
          onPress: () => console.log('Navigate to notifications')
        }
      ]
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#059669', '#10b981']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcomeText}>مرحباً بك</Text>
              <Text style={styles.merchantName}>متجر الإلكترونيات</Text>
            </View>
            
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.notificationButton}>
                <Bell size={24} color="#fff" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>5</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.menuButton}
                onPress={() => setSideMenuVisible(true)}
              >
                <Menu size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.todayStats}>
            <View style={styles.todayStatItem}>
              <DollarSign size={20} color="#fff" />
              <Text style={styles.todayStatValue}>$1,250</Text>
              <Text style={styles.todayStatLabel}>مبيعات اليوم</Text>
            </View>
            <View style={styles.todayStatItem}>
              <Star size={20} color="#fff" />
              <Text style={styles.todayStatValue}>4.8</Text>
              <Text style={styles.todayStatLabel}>تقييم المتجر</Text>
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
          <Text style={styles.sectionTitle}>أحدث الطلبات</Text>
          <View style={styles.ordersContainer}>
            {recentOrders.map((order, index) => (
              <View key={index} style={styles.orderItem}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.customerName}>{order.customer}</Text>
                  <Text style={styles.orderTime}>{order.time}</Text>
                </View>
                <View style={styles.orderDetails}>
                  <Text style={styles.orderAmount}>{order.amount}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                    <Text style={styles.statusText}>{order.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>المنتجات الأكثر مبيعاً</Text>
          <View style={styles.productsContainer}>
            {topProducts.map((product, index) => (
              <View key={index} style={styles.productItem}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productSales}>{product.sales} مبيعة</Text>
                </View>
                <View style={styles.productRank}>
                  <Text style={styles.rankNumber}>{index + 1}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      <SideMenu
        visible={sideMenuVisible}
        onClose={() => setSideMenuVisible(false)}
        title="القائمة الإضافية"
        subtitle="المزيد من الخيارات والإعدادات"
        menuSections={sideMenuSections}
        gradientColors={['#059669', '#10b981']}
      />
    </ScrollView>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'جديد': return '#3b82f6';
    case 'قيد التحضير': return '#f59e0b';
    case 'جاهز للتوصيل': return '#059669';
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
  merchantName: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    textAlign: 'right',
  },
  customerName: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginTop: 2,
    textAlign: 'right',
  },
  orderTime: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#94a3b8',
    marginTop: 2,
    textAlign: 'right',
  },
  orderDetails: {
    alignItems: 'flex-end',
  },
  orderAmount: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#059669',
    marginBottom: 4,
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
  productsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    textAlign: 'right',
  },
  productSales: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginTop: 2,
    textAlign: 'right',
  },
  productRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankNumber: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
});