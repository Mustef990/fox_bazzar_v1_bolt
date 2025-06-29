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
  DollarSign,
  TrendingUp,
  Users,
  BarChart3
} from 'lucide-react-native';

export default function MerchantAdsScreen() {
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
      title: 'خصم 30% على الإلكترونيات',
      description: 'عرض خاص لمدة محدودة على جميع المنتجات الإلكترونية',
      budget: '$200',
      spent: '$145',
      impressions: '12,450',
      clicks: '1,230',
      conversions: '89',
      status: 'active',
      image: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=300',
      startDate: '2024-01-10',
      endDate: '2024-01-25',
      targetAudience: 'إلكترونيات',
      ctr: '9.8%',
      cpc: '$0.12'
    },
    {
      id: 2,
      title: 'منتجات جديدة وصلت',
      description: 'اكتشف أحدث المنتجات في متجرنا',
      budget: '$150',
      spent: '$89',
      impressions: '8,920',
      clicks: '890',
      conversions: '45',
      status: 'active',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300',
      startDate: '2024-01-12',
      endDate: '2024-01-27',
      targetAudience: 'الكل',
      ctr: '10.0%',
      cpc: '$0.10'
    },
    {
      id: 3,
      title: 'توصيل مجاني',
      description: 'توصيل مجاني على جميع الطلبات فوق $50',
      budget: '$100',
      spent: '$100',
      impressions: '5,670',
      clicks: '456',
      conversions: '67',
      status: 'completed',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=300',
      startDate: '2024-01-01',
      endDate: '2024-01-15',
      targetAudience: 'عملاء جدد',
      ctr: '8.0%',
      cpc: '$0.22'
    },
  ];

  const adStats = [
    {
      title: 'إجمالي الإعلانات',
      value: '8',
      change: '+2',
      icon: Megaphone,
      color: '#3b82f6'
    },
    {
      title: 'الإعلانات النشطة',
      value: '5',
      change: '+1',
      icon: TrendingUp,
      color: '#059669'
    },
    {
      title: 'إجمالي المشاهدات',
      value: '27.0K',
      change: '+15%',
      icon: Eye,
      color: '#f59e0b'
    },
    {
      title: 'معدل التحويل',
      value: '5.2%',
      change: '+0.8%',
      icon: Target,
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
      case 'active': return '#059669';
      case 'completed': return '#64748b';
      case 'paused': return '#f59e0b';
      default: return '#64748b';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'completed': return 'مكتمل';
      case 'paused': return 'متوقف';
      default: return 'غير معروف';
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#059669', '#10b981']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>إدارة الإعلانات</Text>
        <Text style={styles.headerSubtitle}>
          إنشاء ومراقبة حملاتك الإعلانية
        </Text>
        
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setCreateAdModalVisible(true)}
        >
          <Plus size={20} color="#fff" />
          <Text style={styles.createButtonText}>إنشاء إعلان جديد</Text>
        </TouchableOpacity>
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

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>إعلاناتك الحالية</Text>
          
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
                      <Text style={styles.statusText}>{getStatusText(ad.status)}</Text>
                    </View>
                  </View>
                </View>
              </View>
              
              <View style={styles.adPerformance}>
                <View style={styles.performanceItem}>
                  <Eye size={16} color="#64748b" />
                  <Text style={styles.performanceValue}>{ad.impressions}</Text>
                  <Text style={styles.performanceLabel}>مشاهدة</Text>
                </View>
                
                <View style={styles.performanceItem}>
                  <Target size={16} color="#64748b" />
                  <Text style={styles.performanceValue}>{ad.clicks}</Text>
                  <Text style={styles.performanceLabel}>نقرة</Text>
                </View>
                
                <View style={styles.performanceItem}>
                  <TrendingUp size={16} color="#64748b" />
                  <Text style={styles.performanceValue}>{ad.conversions}</Text>
                  <Text style={styles.performanceLabel}>تحويل</Text>
                </View>
                
                <View style={styles.performanceItem}>
                  <BarChart3 size={16} color="#64748b" />
                  <Text style={styles.performanceValue}>{ad.ctr}</Text>
                  <Text style={styles.performanceLabel}>CTR</Text>
                </View>
              </View>
              
              <View style={styles.budgetProgress}>
                <View style={styles.budgetInfo}>
                  <Text style={styles.budgetLabel}>الميزانية المستخدمة</Text>
                  <Text style={styles.budgetText}>{ad.spent} من {ad.budget}</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[
                    styles.progressFill, 
                    { width: `${(parseInt(ad.spent.replace('$', '')) / parseInt(ad.budget.replace('$', ''))) * 100}%` }
                  ]} />
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
        </ScrollView>
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
                    colors={['#059669', '#10b981']}
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
  adPerformance: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 16,
  },
  performanceItem: {
    alignItems: 'center',
  },
  performanceValue: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginTop: 4,
  },
  performanceLabel: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginTop: 2,
  },
  budgetProgress: {
    marginBottom: 16,
  },
  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  budgetLabel: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
  },
  budgetText: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 4,
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