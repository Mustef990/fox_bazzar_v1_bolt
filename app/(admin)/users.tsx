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
  Users,
  Search,
  Filter,
  UserPlus,
  MoreVertical,
  Shield,
  ShieldOff,
  Trash2,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Star
} from 'lucide-react-native';

export default function AdminUsersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<'all' | 'customer' | 'merchant' | 'delivery'>('all');

  const users = [
    {
      id: 1,
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      phone: '+963 123 456 789',
      role: 'customer',
      status: 'active',
      joinDate: '2023-01-15',
      lastActive: 'منذ ساعة',
      orders: 24,
      spent: '$1,250',
      location: 'دمشق، سوريا',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.8
    },
    {
      id: 2,
      name: 'فاطمة علي',
      email: 'fatima@example.com',
      phone: '+963 987 654 321',
      role: 'merchant',
      status: 'active',
      joinDate: '2023-03-20',
      lastActive: 'منذ 30 دقيقة',
      orders: 156,
      spent: '$15,420',
      location: 'حلب، سوريا',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.9
    },
    {
      id: 3,
      name: 'محمد حسن',
      email: 'mohamed@example.com',
      phone: '+963 555 123 456',
      role: 'delivery',
      status: 'active',
      joinDate: '2022-11-10',
      lastActive: 'منذ 5 دقائق',
      orders: 89,
      spent: '$3,450',
      location: 'حمص، سوريا',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.7
    },
    {
      id: 4,
      name: 'سارة أحمد',
      email: 'sara@example.com',
      phone: '+963 777 888 999',
      role: 'customer',
      status: 'suspended',
      joinDate: '2023-05-08',
      lastActive: 'منذ يومين',
      orders: 12,
      spent: '$680',
      location: 'اللاذقية، سوريا',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.2
    },
    {
      id: 5,
      name: 'خالد يوسف',
      email: 'khaled@example.com',
      phone: '+963 333 444 555',
      role: 'customer',
      status: 'inactive',
      joinDate: '2023-02-14',
      lastActive: 'منذ أسبوع',
      orders: 8,
      spent: '$320',
      location: 'طرطوس، سوريا',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.0
    },
  ];

  const roleFilters = [
    { key: 'all', label: 'الكل', count: users.length },
    { key: 'customer', label: 'عملاء', count: users.filter(u => u.role === 'customer').length },
    { key: 'merchant', label: 'تجار', count: users.filter(u => u.role === 'merchant').length },
    { key: 'delivery', label: 'توصيل', count: users.filter(u => u.role === 'delivery').length },
  ];

  const userStats = [
    {
      title: 'إجمالي المستخدمين',
      value: users.length.toString(),
      change: '+12',
      icon: Users,
      color: '#3b82f6'
    },
    {
      title: 'المستخدمين النشطين',
      value: users.filter(u => u.status === 'active').length.toString(),
      change: '+8',
      icon: Shield,
      color: '#059669'
    },
    {
      title: 'المستخدمين الجدد',
      value: '45',
      change: '+15',
      icon: UserPlus,
      color: '#f59e0b'
    },
    {
      title: 'المستخدمين المعلقين',
      value: users.filter(u => u.status === 'suspended').length.toString(),
      change: '-2',
      icon: ShieldOff,
      color: '#ef4444'
    }
  ];

  const getRoleText = (role: string) => {
    switch (role) {
      case 'customer': return 'عميل';
      case 'merchant': return 'تاجر';
      case 'delivery': return 'مندوب توصيل';
      default: return 'غير معروف';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'customer': return '#3b82f6';
      case 'merchant': return '#059669';
      case 'delivery': return '#8b5cf6';
      default: return '#64748b';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#059669';
      case 'inactive': return '#f59e0b';
      case 'suspended': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'suspended': return 'معلق';
      default: return 'غير معروف';
    }
  };

  const handleUserAction = (userId: number, action: 'suspend' | 'activate' | 'delete') => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    let title = '';
    let message = '';
    
    switch (action) {
      case 'suspend':
        title = 'إيقاف المستخدم';
        message = `هل تريد إيقاف ${user.name}؟`;
        break;
      case 'activate':
        title = 'تفعيل المستخدم';
        message = `هل تريد تفعيل ${user.name}؟`;
        break;
      case 'delete':
        title = 'حذف المستخدم';
        message = `هل تريد حذف ${user.name} نهائياً؟`;
        break;
    }

    Alert.alert(title, message, [
      { text: 'إلغاء', style: 'cancel' },
      { 
        text: 'تأكيد', 
        style: action === 'delete' ? 'destructive' : 'default',
        onPress: () => {
          Alert.alert('تم بنجاح', `تم ${action === 'suspend' ? 'إيقاف' : action === 'activate' ? 'تفعيل' : 'حذف'} المستخدم`);
        }
      }
    ]);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1e40af', '#3b82f6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>إدارة المستخدمين</Text>
        <Text style={styles.headerSubtitle}>
          مراقبة وإدارة حسابات المستخدمين
        </Text>
        
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#1e40af" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث عن المستخدمين..."
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
          {userStats.map((stat, index) => (
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
          {roleFilters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterChip,
                selectedRole === filter.key && styles.activeFilterChip
              ]}
              onPress={() => setSelectedRole(filter.key as any)}
            >
              <Text style={[
                styles.filterChipText,
                selectedRole === filter.key && styles.activeFilterChipText
              ]}>
                {filter.label}
              </Text>
              <View style={[
                styles.filterCount,
                selectedRole === filter.key && styles.activeFilterCount
              ]}>
                <Text style={[
                  styles.filterCountText,
                  selectedRole === filter.key && styles.activeFilterCountText
                ]}>
                  {filter.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.usersContainer}>
          {filteredUsers.map((user) => (
            <View key={user.id} style={styles.userCard}>
              <View style={styles.userHeader}>
                <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
                
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                  
                  <View style={styles.userMeta}>
                    <View style={[styles.roleBadge, { backgroundColor: getRoleColor(user.role) }]}>
                      <Text style={styles.roleText}>{getRoleText(user.role)}</Text>
                    </View>
                    
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(user.status) }]}>
                      <Text style={styles.statusText}>{getStatusText(user.status)}</Text>
                    </View>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.moreButton}>
                  <MoreVertical size={20} color="#64748b" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.userDetails}>
                <View style={styles.detailItem}>
                  <Phone size={14} color="#64748b" />
                  <Text style={styles.detailText}>{user.phone}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <MapPin size={14} color="#64748b" />
                  <Text style={styles.detailText}>{user.location}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Calendar size={14} color="#64748b" />
                  <Text style={styles.detailText}>انضم في {user.joinDate}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Star size={14} color="#fbbf24" fill="#fbbf24" />
                  <Text style={styles.detailText}>تقييم {user.rating}</Text>
                </View>
              </View>
              
              <View style={styles.userStats}>
                <View style={styles.userStatItem}>
                  <Text style={styles.userStatValue}>{user.orders}</Text>
                  <Text style={styles.userStatLabel}>طلب</Text>
                </View>
                
                <View style={styles.userStatItem}>
                  <Text style={styles.userStatValue}>{user.spent}</Text>
                  <Text style={styles.userStatLabel}>إجمالي الإنفاق</Text>
                </View>
                
                <View style={styles.userStatItem}>
                  <Text style={styles.userStatValue}>{user.lastActive}</Text>
                  <Text style={styles.userStatLabel}>آخر نشاط</Text>
                </View>
              </View>
              
              <View style={styles.userActions}>
                {user.status === 'active' ? (
                  <TouchableOpacity
                    style={styles.suspendButton}
                    onPress={() => handleUserAction(user.id, 'suspend')}
                  >
                    <ShieldOff size={16} color="#fff" />
                    <Text style={styles.suspendButtonText}>إيقاف</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.activateButton}
                    onPress={() => handleUserAction(user.id, 'activate')}
                  >
                    <Shield size={16} color="#fff" />
                    <Text style={styles.activateButtonText}>تفعيل</Text>
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleUserAction(user.id, 'delete')}
                >
                  <Trash2 size={16} color="#fff" />
                  <Text style={styles.deleteButtonText}>حذف</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
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
    backgroundColor: '#1e40af',
    borderColor: '#1e40af',
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
  usersContainer: {
    marginBottom: 30,
  },
  userCard: {
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
  userHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginBottom: 8,
    textAlign: 'right',
  },
  userMeta: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  roleText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
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
  userDetails: {
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
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 16,
  },
  userStatItem: {
    alignItems: 'center',
  },
  userStatValue: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  userStatLabel: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
  },
  userActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  suspendButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f59e0b',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  suspendButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
  activateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  activateButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  deleteButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
});