import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Store, Plus, Search, Filter, MoveVertical as MoreVertical, CircleCheck as CheckCircle, Circle as XCircle, Clock, Star, Package, DollarSign, X, Mail, Phone, MapPin } from 'lucide-react-native';

export default function AdminMerchantsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'pending' | 'suspended'>('all');
  const [merchantDetailsModalVisible, setMerchantDetailsModalVisible] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<any>(null);

  const merchants = [
    {
      id: 1,
      name: 'متجر الإلكترونيات',
      owner: 'أحمد محمد',
      email: 'ahmed@electronics.com',
      phone: '+963 123 456 789',
      address: 'دمشق، سوريا',
      status: 'active',
      rating: 4.8,
      products: 156,
      orders: 1234,
      revenue: '$45,230',
      joinDate: '2023-01-15',
      image: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=150',
      category: 'إلكترونيات'
    },
    {
      id: 2,
      name: 'متجر الأزياء العصرية',
      owner: 'فاطمة علي',
      email: 'fatima@fashion.com',
      phone: '+963 987 654 321',
      address: 'حلب، سوريا',
      status: 'pending',
      rating: 4.6,
      products: 89,
      orders: 567,
      revenue: '$23,450',
      joinDate: '2023-03-20',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=150',
      category: 'أزياء'
    },
    {
      id: 3,
      name: 'متجر المنزل والحديقة',
      owner: 'محمد حسن',
      email: 'mohamed@home.com',
      phone: '+963 555 123 456',
      address: 'حمص، سوريا',
      status: 'active',
      rating: 4.9,
      products: 234,
      orders: 890,
      revenue: '$34,120',
      joinDate: '2022-11-10',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=150',
      category: 'منزل وحديقة'
    },
    {
      id: 4,
      name: 'متجر الرياضة',
      owner: 'سارة أحمد',
      email: 'sara@sports.com',
      phone: '+963 777 888 999',
      address: 'اللاذقية، سوريا',
      status: 'suspended',
      rating: 4.2,
      products: 67,
      orders: 234,
      revenue: '$12,890',
      joinDate: '2023-05-08',
      image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=150',
      category: 'رياضة'
    },
  ];

  const statusFilters = [
    { key: 'all', label: 'الكل', count: merchants.length },
    { key: 'active', label: 'نشط', count: merchants.filter(m => m.status === 'active').length },
    { key: 'pending', label: 'معلق', count: merchants.filter(m => m.status === 'pending').length },
    { key: 'suspended', label: 'موقوف', count: merchants.filter(m => m.status === 'suspended').length },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#059669';
      case 'pending': return '#f59e0b';
      case 'suspended': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'pending': return 'معلق';
      case 'suspended': return 'موقوف';
      default: return 'غير معروف';
    }
  };

  const handleMerchantAction = (merchantId: number, action: 'approve' | 'suspend' | 'delete') => {
    const merchant = merchants.find(m => m.id === merchantId);
    if (!merchant) return;

    let title = '';
    let message = '';
    
    switch (action) {
      case 'approve':
        title = 'موافقة على التاجر';
        message = `هل تريد الموافقة على ${merchant.name}؟`;
        break;
      case 'suspend':
        title = 'إيقاف التاجر';
        message = `هل تريد إيقاف ${merchant.name}؟`;
        break;
      case 'delete':
        title = 'حذف التاجر';
        message = `هل تريد حذف ${merchant.name} نهائياً؟`;
        break;
    }

    Alert.alert(title, message, [
      { text: 'إلغاء', style: 'cancel' },
      { 
        text: 'تأكيد', 
        style: action === 'delete' ? 'destructive' : 'default',
        onPress: () => {
          Alert.alert('تم بنجاح', `تم ${action === 'approve' ? 'الموافقة على' : action === 'suspend' ? 'إيقاف' : 'حذف'} التاجر`);
        }
      }
    ]);
  };

  const filteredMerchants = merchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         merchant.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || merchant.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e40af', '#3b82f6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>إدارة التجار</Text>
        <Text style={styles.headerSubtitle}>
          مراقبة وإدارة حسابات التجار
        </Text>
        
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#1e40af" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث عن التجار..."
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

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredMerchants.map((merchant) => (
            <TouchableOpacity
              key={merchant.id}
              style={styles.merchantCard}
              onPress={() => {
                setSelectedMerchant(merchant);
                setMerchantDetailsModalVisible(true);
              }}
            >
              <View style={styles.merchantHeader}>
                <Image source={{ uri: merchant.image }} style={styles.merchantImage} />
                
                <View style={styles.merchantInfo}>
                  <Text style={styles.merchantName}>{merchant.name}</Text>
                  <Text style={styles.merchantOwner}>{merchant.owner}</Text>
                  <Text style={styles.merchantCategory}>{merchant.category}</Text>
                  
                  <View style={styles.merchantRating}>
                    <Star size={14} color="#fbbf24" fill="#fbbf24" />
                    <Text style={styles.ratingText}>{merchant.rating}</Text>
                  </View>
                </View>
                
                <View style={styles.merchantActions}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(merchant.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(merchant.status)}</Text>
                  </View>
                  
                  <TouchableOpacity style={styles.moreButton}>
                    <MoreVertical size={20} color="#64748b" />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.merchantStats}>
                <View style={styles.statItem}>
                  <Package size={16} color="#64748b" />
                  <Text style={styles.statValue}>{merchant.products}</Text>
                  <Text style={styles.statLabel}>منتج</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Store size={16} color="#64748b" />
                  <Text style={styles.statValue}>{merchant.orders}</Text>
                  <Text style={styles.statLabel}>طلب</Text>
                </View>
                
                <View style={styles.statItem}>
                  <DollarSign size={16} color="#64748b" />
                  <Text style={styles.statValue}>{merchant.revenue}</Text>
                  <Text style={styles.statLabel}>إيرادات</Text>
                </View>
              </View>
              
              {merchant.status === 'pending' && (
                <View style={styles.pendingActions}>
                  <TouchableOpacity
                    style={styles.approveButton}
                    onPress={() => handleMerchantAction(merchant.id, 'approve')}
                  >
                    <CheckCircle size={16} color="#fff" />
                    <Text style={styles.approveButtonText}>موافقة</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => handleMerchantAction(merchant.id, 'suspend')}
                  >
                    <XCircle size={16} color="#fff" />
                    <Text style={styles.rejectButtonText}>رفض</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Modal
        visible={merchantDetailsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMerchantDetailsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>تفاصيل التاجر</Text>
              <TouchableOpacity
                onPress={() => setMerchantDetailsModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#64748b" />
              </TouchableOpacity>
            </View>
            
            {selectedMerchant && (
              <ScrollView style={styles.modalBody}>
                <View style={styles.merchantDetailHeader}>
                  <Image source={{ uri: selectedMerchant.image }} style={styles.merchantDetailImage} />
                  <View style={styles.merchantDetailInfo}>
                    <Text style={styles.merchantDetailName}>{selectedMerchant.name}</Text>
                    <Text style={styles.merchantDetailOwner}>{selectedMerchant.owner}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(selectedMerchant.status) }]}>
                      <Text style={styles.statusText}>{getStatusText(selectedMerchant.status)}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.contactSection}>
                  <Text style={styles.sectionTitle}>معلومات الاتصال</Text>
                  
                  <View style={styles.contactItem}>
                    <Mail size={20} color="#64748b" />
                    <Text style={styles.contactText}>{selectedMerchant.email}</Text>
                  </View>
                  
                  <View style={styles.contactItem}>
                    <Phone size={20} color="#64748b" />
                    <Text style={styles.contactText}>{selectedMerchant.phone}</Text>
                  </View>
                  
                  <View style={styles.contactItem}>
                    <MapPin size={20} color="#64748b" />
                    <Text style={styles.contactText}>{selectedMerchant.address}</Text>
                  </View>
                </View>
                
                <View style={styles.statsSection}>
                  <Text style={styles.sectionTitle}>الإحصائيات</Text>
                  <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                      <Text style={styles.statCardValue}>{selectedMerchant.products}</Text>
                      <Text style={styles.statCardLabel}>منتج</Text>
                    </View>
                    
                    <View style={styles.statCard}>
                      <Text style={styles.statCardValue}>{selectedMerchant.orders}</Text>
                      <Text style={styles.statCardLabel}>طلب</Text>
                    </View>
                    
                    <View style={styles.statCard}>
                      <Text style={styles.statCardValue}>{selectedMerchant.revenue}</Text>
                      <Text style={styles.statCardLabel}>إيرادات</Text>
                    </View>
                    
                    <View style={styles.statCard}>
                      <Text style={styles.statCardValue}>{selectedMerchant.rating}</Text>
                      <Text style={styles.statCardLabel}>تقييم</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.actionButtons}>
                  {selectedMerchant.status === 'pending' && (
                    <TouchableOpacity
                      style={styles.modalApproveButton}
                      onPress={() => handleMerchantAction(selectedMerchant.id, 'approve')}
                    >
                      <CheckCircle size={20} color="#fff" />
                      <Text style={styles.modalApproveButtonText}>موافقة</Text>
                    </TouchableOpacity>
                  )}
                  
                  <TouchableOpacity
                    style={styles.modalSuspendButton}
                    onPress={() => handleMerchantAction(selectedMerchant.id, 'suspend')}
                  >
                    <Clock size={20} color="#fff" />
                    <Text style={styles.modalSuspendButtonText}>إيقاف</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
  merchantCard: {
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
  merchantHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  merchantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  merchantInfo: {
    flex: 1,
  },
  merchantName: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  merchantOwner: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginBottom: 4,
    textAlign: 'right',
  },
  merchantCategory: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#94a3b8',
    marginBottom: 8,
    textAlign: 'right',
  },
  merchantRating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
    marginLeft: 4,
  },
  merchantActions: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
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
  merchantStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginTop: 2,
  },
  pendingActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  approveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  approveButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
  rejectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  rejectButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '90%',
    maxWidth: 500,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    flex: 1,
    textAlign: 'right',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    padding: 20,
  },
  merchantDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  merchantDetailImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  merchantDetailInfo: {
    flex: 1,
  },
  merchantDetailName: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  merchantDetailOwner: {
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginBottom: 8,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'right',
  },
  contactSection: {
    marginBottom: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  contactText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#374151',
    marginLeft: 12,
    textAlign: 'right',
  },
  statsSection: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  statCardValue: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statCardLabel: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalApproveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 16,
    borderRadius: 12,
    marginRight: 8,
  },
  modalApproveButtonText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
  modalSuspendButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f59e0b',
    paddingVertical: 16,
    borderRadius: 12,
    marginLeft: 8,
  },
  modalSuspendButtonText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
});