import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Store, Bell, Shield, CreditCard, Truck, Users, ChartBar as BarChart3, Mail, Phone, MapPin, ChevronRight, CreditCard as Edit, Camera } from 'lucide-react-native';

export default function MerchantSettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoAcceptOrders, setAutoAcceptOrders] = useState(false);
  const [vacationMode, setVacationMode] = useState(false);

  const storeInfo = {
    name: 'متجر الإلكترونيات',
    description: 'متجر متخصص في بيع الأجهزة الإلكترونية والاكسسوارات',
    phone: '+963 123 456 789',
    email: 'store@electronics.com',
    address: 'شارع الثورة، دمشق، سوريا',
    workingHours: '9:00 ص - 10:00 م',
    rating: 4.8,
    totalOrders: 1234
  };

  const settingsCategories = [
    {
      title: 'إعدادات المتجر',
      items: [
        {
          title: 'معلومات المتجر',
          subtitle: 'تعديل اسم ووصف المتجر',
          icon: Store,
          color: '#059669',
          onPress: () => console.log('Store info')
        },
        {
          title: 'ساعات العمل',
          subtitle: 'تحديد أوقات فتح وإغلاق المتجر',
          icon: MapPin,
          color: '#3b82f6',
          onPress: () => console.log('Working hours')
        },
        {
          title: 'وضع الإجازة',
          subtitle: 'إيقاف استقبال الطلبات مؤقتاً',
          icon: Shield,
          color: '#f59e0b',
          hasSwitch: true,
          switchValue: vacationMode,
          onSwitchChange: setVacationMode
        },
      ]
    },
    {
      title: 'إعدادات الطلبات',
      items: [
        {
          title: 'قبول الطلبات تلقائياً',
          subtitle: 'قبول الطلبات الجديدة تلقائياً',
          icon: Users,
          color: '#8b5cf6',
          hasSwitch: true,
          switchValue: autoAcceptOrders,
          onSwitchChange: setAutoAcceptOrders
        },
        {
          title: 'إعدادات التوصيل',
          subtitle: 'تحديد مناطق ورسوم التوصيل',
          icon: Truck,
          color: '#ef4444',
          onPress: () => console.log('Delivery settings')
        },
      ]
    },
    {
      title: 'إعدادات المالية',
      items: [
        {
          title: 'طرق الدفع',
          subtitle: 'إدارة طرق الدفع المقبولة',
          icon: CreditCard,
          color: '#10b981',
          onPress: () => console.log('Payment methods')
        },
        {
          title: 'التقارير المالية',
          subtitle: 'عرض وتصدير التقارير المالية',
          icon: BarChart3,
          color: '#06b6d4',
          onPress: () => console.log('Financial reports')
        },
      ]
    },
    {
      title: 'إعدادات التواصل',
      items: [
        {
          title: 'الإشعارات',
          subtitle: 'إدارة إشعارات الطلبات والرسائل',
          icon: Bell,
          color: '#f59e0b',
          hasSwitch: true,
          switchValue: notificationsEnabled,
          onSwitchChange: setNotificationsEnabled
        },
        {
          title: 'إشعارات البريد الإلكتروني',
          subtitle: 'تلقي تقارير عبر البريد الإلكتروني',
          icon: Mail,
          color: '#3b82f6',
          onPress: () => console.log('Email notifications')
        },
      ]
    }
  ];

  const handleLogout = () => {
    Alert.alert(
      'تسجيل الخروج',
      'هل تريد تسجيل الخروج من حسابك؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'تسجيل الخروج', 
          style: 'destructive',
          onPress: () => console.log('Logout')
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#059669', '#10b981']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>إعدادات المتجر</Text>
        <Text style={styles.headerSubtitle}>
          إدارة وتخصيص إعدادات متجرك
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.storeInfoCard}>
          <View style={styles.storeHeader}>
            <View style={styles.storeImageContainer}>
              <Store size={40} color="#059669" />
              <TouchableOpacity style={styles.editImageButton}>
                <Camera size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.storeDetails}>
              <Text style={styles.storeName}>{storeInfo.name}</Text>
              <Text style={styles.storeDescription}>{storeInfo.description}</Text>
              
              <View style={styles.storeStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{storeInfo.rating}</Text>
                  <Text style={styles.statLabel}>تقييم</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{storeInfo.totalOrders}</Text>
                  <Text style={styles.statLabel}>طلب</Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity style={styles.editButton}>
              <Edit size={20} color="#059669" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Phone size={16} color="#64748b" />
              <Text style={styles.contactText}>{storeInfo.phone}</Text>
            </View>
            
            <View style={styles.contactItem}>
              <Mail size={16} color="#64748b" />
              <Text style={styles.contactText}>{storeInfo.email}</Text>
            </View>
            
            <View style={styles.contactItem}>
              <MapPin size={16} color="#64748b" />
              <Text style={styles.contactText}>{storeInfo.address}</Text>
            </View>
          </View>
        </View>

        {settingsCategories.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            
            <View style={styles.categoryContainer}>
              {category.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={styles.settingItem}
                  onPress={item.onPress}
                  disabled={item.hasSwitch}
                >
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIcon, { backgroundColor: item.color }]}>
                      <item.icon size={20} color="#fff" />
                    </View>
                    
                    <View style={styles.settingText}>
                      <Text style={styles.settingTitle}>{item.title}</Text>
                      <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.settingRight}>
                    {item.hasSwitch ? (
                      <Switch
                        value={item.switchValue}
                        onValueChange={item.onSwitchChange}
                        trackColor={{ false: '#e2e8f0', true: item.color }}
                        thumbColor={item.switchValue ? '#fff' : '#f4f3f4'}
                      />
                    ) : (
                      <ChevronRight size={20} color="#94a3b8" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>تسجيل الخروج</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Fox Bazzar Merchant v1.0.0</Text>
          <Text style={styles.footerSubtext}>
            جميع الحقوق محفوظة © 2024
          </Text>
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
    padding: 20,
  },
  storeInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  storeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  storeImageContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeDetails: {
    flex: 1,
  },
  storeName: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  storeDescription: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginBottom: 12,
    textAlign: 'right',
  },
  storeStats: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statItem: {
    alignItems: 'center',
    marginLeft: 20,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#059669',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginTop: 2,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'flex-end',
  },
  contactText: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginRight: 8,
  },
  categorySection: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'right',
  },
  categoryContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    textAlign: 'right',
  },
  settingRight: {
    marginLeft: 16,
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fecaca',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#ef4444',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#94a3b8',
  },
});