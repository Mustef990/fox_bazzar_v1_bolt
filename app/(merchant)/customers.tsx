import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Users, 
  Search, 
  Filter, 
  Star, 
  ShoppingCart, 
  DollarSign,
  Calendar,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Heart
} from 'lucide-react-native';

export default function MerchantCustomersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string>('all');

  const customerSegments = [
    { key: 'all', label: 'الكل', count: 245 },
    { key: 'vip', label: 'VIP', count: 25 },
    { key: 'regular', label: 'عادي', count: 180 },
    { key: 'new', label: 'جديد', count: 40 },
  ];

  const customers = [
    {
      id: 1,
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      phone: '+963 123 456 789',
      address: 'دمشق، سوريا',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      segment: 'vip',
      totalOrders: 24,
      totalSpent: 2450,
      averageOrder: 102,
      lastOrder: '2024-01-15',
      joinDate: '2023-06-15',
      rating: 4.9,
      favoriteCategory: 'إلكترونيات',
      loyaltyPoints: 1250
    },
    {
      id: 2,
      name: 'فاطمة علي',
      email: 'fatima@example.com',
      phone: '+963 987 654 321',
      address: 'حلب، سوريا',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      segment: 'regular',
      totalOrders: 12,
      totalSpent: 890,
      averageOrder: 74,
      lastOrder: '2024-01-12',
      joinDate: '2023-08-20',
      rating: 4.7,
      favoriteCategory: 'أزياء',
      loyaltyPoints: 450
    },
    {
      id: 3,
      name: 'محمد حسن',
      email: 'mohamed@example.com',
      phone: '+963 555 123 456',
      address: 'حمص، سوريا',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      segment: 'new',
      totalOrders: 3,
      totalSpent: 245,
      averageOrder: 82,
      lastOrder: '2024-01-10',
      joinDate: '2024-01-05',
      rating: 4.5,
      favoriteCategory: 'رياضة',
      loyaltyPoints: 120
    },
    {
      id: 4,
      name: 'سارة أحمد',
      email: 'sara@example.com',
      phone: '+963 777 888 999',
      address: 'اللاذقية، سوريا',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      segment: 'regular',
      totalOrders: 8,
      totalSpent: 650,
      averageOrder: 81,
      lastOrder: '2024-01-08',
      joinDate: '2023-11-12',
      rating: 4.8,
      favoriteCategory: 'جمال',
      loyaltyPoints: 320
    },
  ];

  const customerStats = [
    {
      title: 'إجمالي العملاء',
      value: '245',
      change: '+12',
      icon: Users,
      color: '#3b82f6'
    },
    {
      title: 'عملاء VIP',
      value: '25',
      change: '+3',
      icon: Star,
      color: '#fbbf24'
    },
    {
      title: 'متوسط الطلب',
      value: '$85',
      change: '+$5',
      icon: DollarSign,
      color: '#059669'
    },
    {
      title: 'معدل العودة',
      value: '68%',
      change: '+5%',
      icon: TrendingUp,
      color: '#8b5cf6'
    }
  ];

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'vip': return '#fbbf24';
      case 'regular': return '#3b82f6';
      case 'new': return '#059669';
      default: return '#64748b';
    }
  };

  const getSegmentText = (segment: string) => {
    switch (segment) {
      case 'vip': return 'VIP';
      case 'regular': return 'عادي';
      case 'new': return 'جديد';
      default: return 'غير معروف';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSegment = selectedSegment === 'all' || customer.segment === selectedSegment;
    return matchesSearch && matchesSegment;
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#059669', '#10b981']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>إدارة العملاء</Text>
        <Text style={styles.headerSubtitle}>
          تحليل ومتابعة قاعدة العملاء
        </Text>
        
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#059669" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث عن العملاء..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            textAlign="right"
          />
          <View style={styles.searchIcon}>
            <Search size={20} color="#64748b" />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          {customerStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                <stat.icon size={20} color="#fff" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
              <Text style={[styles.statChange, { color: stat.color }]}>
                {stat.change}
              </Text>
            </View>
          ))}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.segmentsContainer}>
          {customerSegments.map((segment) => (
            <TouchableOpacity
              key={segment.key}
              style={[
                styles.segmentChip,
                selectedSegment === segment.key && styles.activeSegmentChip
              ]}
              onPress={() => setSelectedSegment(segment.key)}
            >
              <Text style={[
                styles.segmentChipText,
                selectedSegment === segment.key && styles.activeSegmentChipText
              ]}>
                {segment.label}
              </Text>
              <View style={[
                styles.segmentCount,
                selectedSegment === segment.key && styles.activeSegmentCount
              ]}>
                <Text style={[
                  styles.segmentCountText,
                  selectedSegment === segment.key && styles.activeSegmentCountText
                ]}>
                  {segment.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredCustomers.map((customer) => (
            <View key={customer.id} style={styles.customerCard}>
              <View style={styles.customerHeader}>
                <Image source={{ uri: customer.avatar }} style={styles.customerAvatar} />
                
                <View style={styles.customerInfo}>
                  <View style={styles.customerNameRow}>
                    <Text style={styles.customerName}>{customer.name}</Text>
                    <View style={[styles.segmentBadge, { backgroundColor: getSegmentColor(customer.segment) }]}>
                      <Text style={styles.segmentText}>{getSegmentText(customer.segment)}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.contactInfo}>
                    <Mail size={14} color="#64748b" />
                    <Text style={styles.contactText}>{customer.email}</Text>
                  </View>
                  
                  <View style={styles.contactInfo}>
                    <Phone size={14} color="#64748b" />
                    <Text style={styles.contactText}>{customer.phone}</Text>
                  </View>
                  
                  <View style={styles.contactInfo}>
                    <MapPin size={14} color="#64748b" />
                    <Text style={styles.contactText}>{customer.address}</Text>
                  </View>
                </View>
                
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#fbbf24" fill="#fbbf24" />
                  <Text style={styles.ratingText}>{customer.rating}</Text>
                </View>
              </View>
              
              <View style={styles.customerStats}>
                <View style={styles.customerStatItem}>
                  <ShoppingCart size={16} color="#64748b" />
                  <Text style={styles.customerStatValue}>{customer.totalOrders}</Text>
                  <Text style={styles.customerStatLabel}>طلب</Text>
                </View>
                
                <View style={styles.customerStatItem}>
                  <DollarSign size={16} color="#64748b" />
                  <Text style={styles.customerStatValue}>${customer.totalSpent}</Text>
                  <Text style={styles.customerStatLabel}>إجمالي</Text>
                </View>
                
                <View style={styles.customerStatItem}>
                  <TrendingUp size={16} color="#64748b" />
                  <Text style={styles.customerStatValue}>${customer.averageOrder}</Text>
                  <Text style={styles.customerStatLabel}>متوسط</Text>
                </View>
                
                <View style={styles.customerStatItem}>
                  <Heart size={16} color="#64748b" />
                  <Text style={styles.customerStatValue}>{customer.loyaltyPoints}</Text>
                  <Text style={styles.customerStatLabel}>نقطة</Text>
                </View>
              </View>
              
              <View style={styles.customerDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>آخر طلب:</Text>
                  <Text style={styles.detailValue}>{customer.lastOrder}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>تاريخ الانضمام:</Text>
                  <Text style={styles.detailValue}>{customer.joinDate}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>التصنيف المفضل:</Text>
                  <Text style={styles.detailValue}>{customer.favoriteCategory}</Text>
                </View>
              </View>
              
              <View style={styles.customerActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Phone size={16} color="#3b82f6" />
                  <Text style={[styles.actionButtonText, { color: '#3b82f6' }]}>اتصال</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Mail size={16} color="#059669" />
                  <Text style={[styles.actionButtonText, { color: '#059669' }]}>رسالة</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <ShoppingCart size={16} color="#f59e0b" />
                  <Text style={[styles.actionButtonText, { color: '#f59e0b' }]}>الطلبات</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    textAlign: 'right',
  },
  searchIcon: {
    marginRight: 8,
  },
  filterButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 4,
  },
  statChange: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
  },
  segmentsContainer: {
    marginBottom: 20,
  },
  segmentChip: {
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
  activeSegmentChip: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  segmentChipText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
    marginRight: 8,
  },
  activeSegmentChipText: {
    color: '#fff',
  },
  segmentCount: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  activeSegmentCount: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  segmentCountText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
  },
  activeSegmentCountText: {
    color: '#fff',
  },
  customerCard: {
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
  customerHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  customerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  customerInfo: {
    flex: 1,
  },
  customerNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    flex: 1,
    textAlign: 'right',
  },
  segmentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  segmentText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    justifyContent: 'flex-end',
  },
  contactText: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginRight: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
    marginLeft: 4,
  },
  customerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 16,
  },
  customerStatItem: {
    alignItems: 'center',
  },
  customerStatValue: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginTop: 4,
  },
  customerStatLabel: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginTop: 2,
  },
  customerDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#1e293b',
  },
  customerActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    marginLeft: 4,
  },
});