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
import { 
  Megaphone,
  Plus,
  Eye,
  Edit,
  Trash2,
  X,
  Calendar,
  Target,
  DollarSign
} from 'lucide-react-native';

export default function AdminAdsScreen() {
  const [createAdModalVisible, setCreateAdModalVisible] = useState(false);
  const [adData, setAdData] = useState({
    title: '',
    description: '',
    budget: '',
    duration: '',
    targetAudience: 'all'
  });

  const ads = [
    {
      id: 1,
      title: 'خصم 50% على الإلكترونيات',
      description: 'عرض محدود لمدة أسبوع على جميع المنتجات الإلكترونية',
      budget: '$500',
      views: '12,450',
      clicks: '1,230',
      status: 'نشط',
      image: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=300',
      startDate: '2024-01-15',
      endDate: '2024-01-22'
    },
    {
      id: 2,
      title: 'توصيل مجاني',
      description: 'توصيل مجاني على جميع الطلبات فوق $50',
      budget: '$300',
      views: '8,920',
      clicks: '890',
      status: 'نشط',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=300',
      startDate: '2024-01-10',
      endDate: '2024-01-31'
    },
    {
      id: 3,
      title: 'عروض الشتاء',
      description: 'تخفيضات هائلة على ملابس الشتاء',
      budget: '$200',
      views: '5,670',
      clicks: '456',
      status: 'منتهي',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300',
      startDate: '2024-01-01',
      endDate: '2024-01-14'
    },
  ];

  const adStats = [
    {
      title: 'إجمالي الإعلانات',
      value: '15',
      change: '+3',
      icon: Megaphone,
      color: '#3b82f6'
    },
    {
      title: 'الإعلانات النشطة',
      value: '8',
      change: '+2',
      icon: Eye,
      color: '#059669'
    },
    {
      title: 'إجمالي المشاهدات',
      value: '45.2K',
      change: '+12%',
      icon: Target,
      color: '#f59e0b'
    },
    {
      title: 'الميزانية المستخدمة',
      value: '$2,450',
      change: '+$300',
      icon: DollarSign,
      color: '#8b5cf6'
    }
  ];

  const handleCreateAd = () => {
    if (!adData.title || !adData.description || !adData.budget) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    Alert.alert(
      'تأكيد الإنشاء',
      'هل تريد إنشاء هذا الإعلان؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'إنشاء', 
          onPress: () => {
            setCreateAdModalVisible(false);
            setAdData({ title: '', description: '', budget: '', duration: '', targetAudience: 'all' });
            Alert.alert('نجح الإنشاء', 'تم إنشاء الإعلان بنجاح');
          }
        }
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return '#059669';
      case 'منتهي': return '#64748b';
      case 'معلق': return '#f59e0b';
      default: return '#64748b';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1e40af', '#3b82f6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>إدارة الإعلانات</Text>
          <Text style={styles.headerSubtitle}>
            إنشاء ومراقبة الحملات الإعلانية
          </Text>
          
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => setCreateAdModalVisible(true)}
          >
            <Plus size={20} color="#fff" />
            <Text style={styles.createButtonText}>إنشاء إعلان جديد</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          {adStats.map((stat, index) => (
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

        <View style={styles.adsContainer}>
          <Text style={styles.sectionTitle}>الإعلانات الحالية</Text>
          
          {ads.map((ad) => (
            <View key={ad.id} style={styles.adCard}>
              <View style={styles.adHeader}>
                <Image source={{ uri: ad.image }} style={styles.adImage} />
                <View style={styles.adInfo}>
                  <Text style={styles.adTitle}>{ad.title}</Text>
                  <Text style={styles.adDescription}>{ad.description}</Text>
                  <View style={styles.adMeta}>
                    <Text style={styles.adBudget}>الميزانية: {ad.budget}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ad.status) }]}>
                      <Text style={styles.statusText}>{ad.status}</Text>
                    </View>
                  </View>
                </View>
              </View>
              
              <View style={styles.adStats}>
                <View style={styles.adStatItem}>
                  <Eye size={16} color="#64748b" />
                  <Text style={styles.adStatValue}>{ad.views}</Text>
                  <Text style={styles.adStatLabel}>مشاهدة</Text>
                </View>
                <View style={styles.adStatItem}>
                  <Target size={16} color="#64748b" />
                  <Text style={styles.adStatValue}>{ad.clicks}</Text>
                  <Text style={styles.adStatLabel}>نقرة</Text>
                </View>
                <View style={styles.adStatItem}>
                  <Calendar size={16} color="#64748b" />
                  <Text style={styles.adStatValue}>{ad.endDate}</Text>
                  <Text style={styles.adStatLabel}>ينتهي في</Text>
                </View>
              </View>
              
              <View style={styles.adActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Eye size={16} color="#3b82f6" />
                  <Text style={[styles.actionButtonText, { color: '#3b82f6' }]}>عرض</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Edit size={16} color="#f59e0b" />
                  <Text style={[styles.actionButtonText, { color: '#f59e0b' }]}>تعديل</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Trash2 size={16} color="#ef4444" />
                  <Text style={[styles.actionButtonText, { color: '#ef4444' }]}>حذف</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      <Modal
        visible={createAdModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCreateAdModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>إنشاء إعلان جديد</Text>
              <TouchableOpacity
                onPress={() => setCreateAdModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#64748b" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>عنوان الإعلان</Text>
                <TextInput
                  style={styles.input}
                  value={adData.title}
                  onChangeText={(text) => setAdData(prev => ({ ...prev, title: text }))}
                  placeholder="أدخل عنوان الإعلان"
                  placeholderTextColor="#94a3b8"
                  textAlign="right"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>وصف الإعلان</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={adData.description}
                  onChangeText={(text) => setAdData(prev => ({ ...prev, description: text }))}
                  placeholder="أدخل وصف الإعلان"
                  placeholderTextColor="#94a3b8"
                  multiline
                  numberOfLines={4}
                  textAlign="right"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>الميزانية ($)</Text>
                <TextInput
                  style={styles.input}
                  value={adData.budget}
                  onChangeText={(text) => setAdData(prev => ({ ...prev, budget: text }))}
                  placeholder="أدخل الميزانية"
                  placeholderTextColor="#94a3b8"
                  keyboardType="numeric"
                  textAlign="right"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>مدة الإعلان (أيام)</Text>
                <TextInput
                  style={styles.input}
                  value={adData.duration}
                  onChangeText={(text) => setAdData(prev => ({ ...prev, duration: text }))}
                  placeholder="أدخل مدة الإعلان"
                  placeholderTextColor="#94a3b8"
                  keyboardType="numeric"
                  textAlign="right"
                />
              </View>
              
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setCreateAdModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>إلغاء</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleCreateAd}
                >
                  <LinearGradient
                    colors={['#1e40af', '#3b82f6']}
                    style={styles.confirmGradient}
                  >
                    <Megaphone size={16} color="#fff" />
                    <Text style={styles.confirmButtonText}>إنشاء الإعلان</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  headerContent: {
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
    marginBottom: 24,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  createButtonText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
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
  adsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'right',
  },
  adCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  adHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  adImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  adInfo: {
    flex: 1,
  },
  adTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  adDescription: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginBottom: 8,
    textAlign: 'right',
  },
  adMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adBudget: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
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
  adStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 16,
  },
  adStatItem: {
    alignItems: 'center',
  },
  adStatValue: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginTop: 4,
  },
  adStatLabel: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginTop: 2,
  },
  adActions: {
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
    maxWidth: 400,
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
    fontSize: 18,
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
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'right',
  },
  input: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    backgroundColor: '#f8fafc',
    textAlign: 'right',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
  },
  confirmButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginLeft: 8,
  },
  confirmGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
});