import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Truck,
  Search,
  Filter,
  MapPin,
  Clock,
  Package,
  Star,
  Phone,
  Navigation,
  CheckCircle,
  XCircle,
  MoreVertical,
  UserPlus
} from 'lucide-react-native';

export default function AdminDeliveryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'available' | 'busy' | 'offline'>('all');

  const deliveryPersons = [
    {
      id: 1,
      name: 'محمد أحمد',
      phone: '+963 123 456 789',
      email: 'mohamed@delivery.com',
      status: 'available',
      rating: 4.9,
      completedOrders: 234,
      currentOrders: 0,
      location: 'دمشق، سوريا',
      joinDate: '2023-01-15',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      vehicle: 'دراجة نارية',
      earnings: '$2,450',
      workingHours: '8 ساعات'
    },
    {
      id: 2,
      name: 'أحمد علي',
      phone: '+963 987 654 321',
      email: 'ahmed@delivery.com',
      status: 'busy',
      rating: 4.7,
      completedOrders: 189,
      currentOrders: 2,
      location: 'حلب، سوريا',
      joinDate: '2023-02-20',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      vehicle: 'سيارة',
      earnings: '$1,890',
      workingHours: '6 ساعات'
    },
    {
      id: 3,
      name: 'خالد محمود',
      phone: '+963 555 123 456',
      email: 'khaled@delivery.com',
      status: 'available',
      rating: 4.8,
      completedOrders: 156,
      currentOrders: 1,
      location: 'حمص، سوريا',
      joinDate: '2022-11-10',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      vehicle: 'دراجة نارية',
      earnings: '$1,560',
      workingHours: '7 ساعات'
    },
    {
      id: 4,
      name: 'يوسف حسن',
      phone: '+963 777 888 999',
      email: 'youssef@delivery.com',
      status: 'offline',
      rating: 4.5,
      completedOrders: 98,
      currentOrders: 0,
      location: 'اللاذقية، سوريا',
      joinDate: '2023-03-15',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      vehicle: 'دراجة هوائية',
      earnings: '$980',
      workingHours: '4 ساعات'
    },
  ];

  const statusFilters = [
    { key: 'all', label: 'الكل', count: deliveryPersons.length },
    { key: 'available', label: 'متاح', count: deliveryPersons.filter(d => d.status === 'available').length },
    { key: 'busy', label: 'مشغول', count: deliveryPersons.filter(d => d.status === 'busy').length },
    { key: 'offline', label: 'غير متصل', count: deliveryPersons.filter(d => d.status === 'offline').length },
  ];

  const deliveryStats = [
    {
      title: 'إجمالي المندوبين',
      value: deliveryPersons.length.toString(),
      change: '+5',
      icon: Truck,
      color: '#7c3aed'
    },
    {
      title: 'المندوبين المتاحين',
      value: deliveryPersons.filter(d => d.status === 'available').length.toString(),
      change: '+2',
      icon: CheckCircle,
      color: '#059669'
    },
    {
      title: 'الطلبات النشطة',
      value: deliveryPersons.reduce((sum, d) => sum + d.currentOrders, 0).toString(),
      change: '+8',
      icon: Package,
      color: '#f59e0b'
    },
    {
      title: 'متوسط التقييم',
      value: (deliveryPersons.reduce((sum, d) => sum + d.rating, 0) / deliveryPersons.length).toFixed(1),
      change: '+0.2',
      icon: Star,
      color: '#3b82f6'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#059669';
      case 'busy': return '#f59e0b';
      case 'offline': return '#64748b';
      default: return '#64748b';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'متاح';
      case 'busy': return 'مشغول';
      case 'offline': return 'غير متصل';
      default: return 'غير معروف';
    }
  };

  const handleDeliveryAction = (deliveryId: number, action: 'approve' | 'suspend' | 'delete') => {
    const delivery = deliveryPersons.find(d => d.id === deliveryId);
    if (!delivery) return;

    let title = '';
    let message = '';
    
    switch (action) {
      case 'approve':
        title = 'موافقة على المندوب';
        message = `هل تريد الموافقة على ${delivery.name}؟`;
        break;
      case 'suspend':
        title = 'إيقاف المندوب';
        message = `هل تريد إيقاف ${delivery.name}؟`;
        break;
      case 'delete':
        title = 'حذف المندوب';
        message = `هل تريد حذف ${delivery.name} نهائياً؟`;
        break;
    }

    Alert.alert(title, message, [
      { text: 'إلغاء', style: 'cancel' },
      { 
        text: 'تأكيد', 
        style: action === 'delete' ? 'destructive' : 'default',
        onPress: () => {
          Alert.alert('تم بنجاح', `تم ${action === 'approve' ? 'الموافقة على' : action === 'suspend' ? 'إيقاف' : 'حذف'} المندوب`);
        }
      }
    ]);
  };

  const filteredDeliveryPersons = deliveryPersons.filter(delivery => {
    const matchesSearch = delivery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         delivery.phone.includes(searchQuery);
    const matchesStatus = selectedStatus === 'all' || delivery.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#7c3aed', '#a855f7']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>إدارة التوصيل</Text>
        <Text style={styles.headerSubtitle}>
          مراقبة وإدارة مندوبي التوصيل
        </Text>
        
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#7c3aed" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث عن المندوبين..."
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
          {deliveryStats.map((stat, index) => (
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

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          {statusFilters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterChip,
                selectedStatus === filter.key && styles.activeFilterChip
              ]}
              onPress={() => setSelectedStatus(filter.key as any)}
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

        <View style={styles.deliveryContainer}>
          {filteredDeliveryPersons.map((delivery) => (
            <View key={delivery.id} style={styles.deliveryCard}>
              <View style={styles.deliveryHeader}>
                <Image source={{ uri: delivery.avatar }} style={styles.deliveryAvatar} />
                
                <View style={styles.deliveryInfo}>
                  <Text style={styles.deliveryName}>{delivery.name}</Text>
                  <Text style={styles.deliveryVehicle}>{delivery.vehicle}</Text>
                  
                  <View style={styles.deliveryMeta}>
                    <View style={styles.ratingContainer}>
                      <Star size={14} color="#fbbf24" fill="#fbbf24" />
                      <Text style={styles.ratingText}>{delivery.rating}</Text>
                    </View>
                    
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(delivery.status) }]}>
                      <Text style={styles.statusText}>{getStatusText(delivery.status)}</Text>
                    </View>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.moreButton}>
                  <MoreVertical size={20} color="#64748b" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.deliveryDetails}>
                <View style={styles.detailItem}>
                  <Phone size={14} color="#64748b" />
                  <Text style={styles.detailText}>{delivery.phone}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <MapPin size={14} color="#64748b" />
                  <Text style={styles.detailText}>{delivery.location}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Clock size={14} color="#64748b" />
                  <Text style={styles.detailText}>يعمل {delivery.workingHours} اليوم</Text>
                </View>
              </View>
              
              <View style={styles.deliveryStats}>
                <View style={styles.deliveryStatItem}>
                  <Text style={styles.deliveryStatValue}>{delivery.completedOrders}</Text>
                  <Text style={styles.deliveryStatLabel}>طلب مكتمل</Text>
                </View>
                
                <View style={styles.deliveryStatItem}>
                  <Text style={styles.deliveryStatValue}>{delivery.currentOrders}</Text>
                  <Text style={styles.deliveryStatLabel}>طلب نشط</Text>
                </View>
                
                <View style={styles.deliveryStatItem}>
                  <Text style={styles.deliveryStatValue}>{delivery.earnings}</Text>
                  <Text style={styles.deliveryStatLabel}>الأرباح</Text>
                </View>
              </View>
              
              <View style={styles.deliveryActions}>
                <TouchableOpacity style={styles.trackButton}>
                  <Navigation size={16} color="#fff" />
                  <Text style={styles.trackButtonText}>تتبع الموقع</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.contactButton}>
                  <Phone size={16} color="#fff" />
                  <Text style={styles.contactButtonText}>اتصال</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.addDeliveryButton}>
          <LinearGradient
            colors={['#7c3aed', '#a855f7']}
            style={styles.addDeliveryGradient}
          >
            <UserPlus size={20} color="#fff" />
            <Text style={styles.addDeliveryButtonText}>إضافة مندوب جديد</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    backgroundColor: '#7c3aed',
    borderColor: '#7c3aed',
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
  deliveryContainer: {
    marginBottom: 30,
  },
  deliveryCard: {
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
  deliveryHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  deliveryAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryName: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  deliveryVehicle: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginBottom: 8,
    textAlign: 'right',
  },
  deliveryMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'flex-end',
  },
  detailText: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginRight: 8,
  },
  deliveryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 16,
  },
  deliveryStatItem: {
    alignItems: 'center',
  },
  deliveryStatValue: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  deliveryStatLabel: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
  },
  deliveryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  trackButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  contactButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
  addDeliveryButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  addDeliveryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  addDeliveryButtonText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
});