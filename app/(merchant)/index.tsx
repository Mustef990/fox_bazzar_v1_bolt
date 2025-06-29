import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
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
  Activity
} from 'lucide-react-native';

// UI Components
import Layout from '@/components/ui/Layout';
import Header from '@/components/ui/Header';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import Grid from '@/components/ui/Grid';
import Badge from '@/components/ui/Badge';
import { colors } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function MerchantDashboard() {
  const stats = [
    {
      title: 'إجمالي المنتجات',
      value: '156',
      change: '+12',
      icon: Package,
      gradient: colors.merchant
    },
    {
      title: 'الطلبات الجديدة',
      value: '23',
      change: '+5',
      icon: ShoppingCart,
      gradient: colors.primary
    },
    {
      title: 'المبيعات اليوم',
      value: '$1,250',
      change: '+18%',
      icon: DollarSign,
      gradient: colors.warning
    },
    {
      title: 'العملاء الجدد',
      value: '45',
      change: '+8',
      icon: Users,
      gradient: ['#8b5cf6', '#a78bfa']
    }
  ];

  const quickActions = [
    { title: 'إضافة منتج', icon: Plus, color: colors.merchant[0] },
    { title: 'مراجعة الطلبات', icon: Eye, color: colors.primary[500] },
    { title: 'إنشاء إعلان', icon: Bell, color: colors.warning[500] },
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

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'جديد': return 'info';
      case 'قيد التحضير': return 'warning';
      case 'جاهز للتوصيل': return 'success';
      default: return 'default';
    }
  };

  const NotificationButton = () => (
    <TouchableOpacity style={{
      position: 'relative',
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Bell size={24} color="#fff" />
      <View style={{
        position: 'absolute',
        top: -2,
        right: -2,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#ef4444',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{
          fontSize: 12,
          fontFamily: 'Cairo-Bold',
          color: '#fff',
        }}>5</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <Header
        title="متجر الإلكترونيات"
        subtitle="مرحباً بعودتك"
        gradient={colors.merchant}
        rightElement={<NotificationButton />}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 16,
        }}>
          <View style={{ alignItems: 'center' }}>
            <DollarSign size={20} color="#fff" />
            <Text style={{
              fontSize: 20,
              fontFamily: 'Cairo-Bold',
              color: '#fff',
              marginTop: 8,
            }}>$1,250</Text>
            <Text style={{
              fontSize: 14,
              fontFamily: 'Tajawal-Regular',
              color: 'rgba(255, 255, 255, 0.9)',
              marginTop: 4,
            }}>مبيعات اليوم</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Star size={20} color="#fff" />
            <Text style={{
              fontSize: 20,
              fontFamily: 'Cairo-Bold',
              color: '#fff',
              marginTop: 8,
            }}>4.8</Text>
            <Text style={{
              fontSize: 14,
              fontFamily: 'Tajawal-Regular',
              color: 'rgba(255, 255, 255, 0.9)',
              marginTop: 4,
            }}>تقييم المتجر</Text>
          </View>
        </View>
      </Header>

      <Layout>
        {/* Stats Grid */}
        <Grid columns={2} spacing={16}>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              gradient={stat.gradient}
            />
          ))}
        </Grid>

        {/* Quick Actions */}
        <Section title="إجراءات سريعة">
          <Grid columns={2} spacing={16}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index}>
                <Card style={{ alignItems: 'center', minHeight: 100 }}>
                  <View style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: action.color,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 12,
                  }}>
                    <action.icon size={20} color="#fff" />
                  </View>
                  <Text style={{
                    fontSize: 14,
                    fontFamily: 'Cairo-Bold',
                    color: '#374151',
                    textAlign: 'center',
                  }}>{action.title}</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </Grid>
        </Section>

        {/* Recent Orders */}
        <Section title="أحدث الطلبات">
          <Card padding="none">
            {recentOrders.map((order, index) => (
              <View key={index} style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 16,
                borderBottomWidth: index < recentOrders.length - 1 ? 1 : 0,
                borderBottomColor: '#f1f5f9',
              }}>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 16,
                    fontFamily: 'Cairo-Bold',
                    color: '#1e293b',
                    textAlign: 'right',
                  }}>{order.id}</Text>
                  <Text style={{
                    fontSize: 14,
                    fontFamily: 'Tajawal-Regular',
                    color: '#64748b',
                    marginTop: 2,
                    textAlign: 'right',
                  }}>{order.customer}</Text>
                  <Text style={{
                    fontSize: 12,
                    fontFamily: 'Tajawal-Regular',
                    color: '#94a3b8',
                    marginTop: 2,
                    textAlign: 'right',
                  }}>{order.time}</Text>
                </View>
                
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{
                    fontSize: 16,
                    fontFamily: 'Cairo-Bold',
                    color: colors.merchant[0],
                    marginBottom: 4,
                  }}>{order.amount}</Text>
                  <Badge variant={getStatusVariant(order.status)}>
                    {order.status}
                  </Badge>
                </View>
              </View>
            ))}
          </Card>
        </Section>

        {/* Top Products */}
        <Section title="المنتجات الأكثر مبيعاً">
          <Card padding="none">
            {topProducts.map((product, index) => (
              <View key={index} style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                borderBottomWidth: index < topProducts.length - 1 ? 1 : 0,
                borderBottomColor: '#f1f5f9',
              }}>
                <Image 
                  source={{ uri: product.image }} 
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    marginRight: 12,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 16,
                    fontFamily: 'Cairo-Bold',
                    color: '#1e293b',
                    textAlign: 'right',
                  }}>{product.name}</Text>
                  <Text style={{
                    fontSize: 14,
                    fontFamily: 'Tajawal-Regular',
                    color: '#64748b',
                    marginTop: 2,
                    textAlign: 'right',
                  }}>{product.sales} مبيعة</Text>
                </View>
                <View style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: colors.merchant[0],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Text style={{
                    fontSize: 16,
                    fontFamily: 'Cairo-Bold',
                    color: '#fff',
                  }}>{index + 1}</Text>
                </View>
              </View>
            ))}
          </Card>
        </Section>
      </Layout>
    </View>
  );
}