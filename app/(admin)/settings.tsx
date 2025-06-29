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
import { 
  Settings,
  Bell,
  Shield,
  Globe,
  DollarSign,
  Truck,
  Mail,
  Database,
  Users,
  ChevronRight,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react-native';

export default function AdminSettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const settingsCategories = [
    {
      title: 'الإعدادات العامة',
      items: [
        {
          title: 'الإشعارات',
          subtitle: 'إدارة إشعارات النظام',
          icon: Bell,
          color: '#f59e0b',
          hasSwitch: true,
          switchValue: notificationsEnabled,
          onSwitchChange: setNotificationsEnabled
        },
        {
          title: 'وضع الصيانة',
          subtitle: 'تفعيل وضع الصيانة للموقع',
          icon: Shield,
          color: '#ef4444',
          hasSwitch: true,
          switchValue: maintenanceMode,
          onSwitchChange: setMaintenanceMode
        },
        {
          title: 'اللغة والمنطقة',
          subtitle: 'إعدادات اللغة والمنطقة الزمنية',
          icon: Globe,
          color: '#3b82f6',
          onPress: () => console.log('Language settings')
        },
      ]
    },
    {
      title: 'إعدادات المالية',
      items: [
        {
          title: 'العملات المدعومة',
          subtitle: 'إدارة العملات المقبولة',
          icon: DollarSign,
          color: '#059669',
          onPress: () => console.log('Currency settings')
        },
        {
          title: 'رسوم التوصيل',
          subtitle: 'تحديد رسوم التوصيل',
          icon: Truck,
          color: '#8b5cf6',
          onPress: () => console.log('Delivery fees')
        },
      ]
    },
    {
      title: 'إعدادات النظام',
      items: [
        {
          title: 'النسخ الاحتياطي التلقائي',
          subtitle: 'نسخ احتياطي يومي للبيانات',
          icon: Database,
          color: '#06b6d4',
          hasSwitch: true,
          switchValue: autoBackup,
          onSwitchChange: setAutoBackup
        },
        {
          title: 'إشعارات البريد الإلكتروني',
          subtitle: 'إرسال تقارير عبر البريد',
          icon: Mail,
          color: '#f59e0b',
          hasSwitch: true,
          switchValue: emailNotifications,
          onSwitchChange: setEmailNotifications
        },
        {
          title: 'إدارة المستخدمين',
          subtitle: 'صلاحيات وأدوار المستخدمين',
          icon: Users,
          color: '#64748b',
          onPress: () => console.log('User management')
        },
      ]
    }
  ];

  const systemActions = [
    {
      title: 'تصدير البيانات',
      subtitle: 'تصدير جميع بيانات النظام',
      icon: Download,
      color: '#059669',
      onPress: () => handleExportData()
    },
    {
      title: 'استيراد البيانات',
      subtitle: 'استيراد بيانات من ملف',
      icon: Upload,
      color: '#3b82f6',
      onPress: () => handleImportData()
    },
    {
      title: 'إعادة تشغيل النظام',
      subtitle: 'إعادة تشغيل الخدمات',
      icon: RefreshCw,
      color: '#f59e0b',
      onPress: () => handleSystemRestart()
    },
  ];

  const handleExportData = () => {
    Alert.alert(
      'تصدير البيانات',
      'هل تريد تصدير جميع بيانات النظام؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'تصدير', 
          onPress: () => Alert.alert('جاري التصدير', 'سيتم إشعارك عند اكتمال العملية')
        }
      ]
    );
  };

  const handleImportData = () => {
    Alert.alert(
      'استيراد البيانات',
      'تحذير: هذه العملية ستستبدل البيانات الحالية',
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'استيراد', 
          style: 'destructive',
          onPress: () => Alert.alert('جاري الاستيراد', 'يرجى عدم إغلاق التطبيق')
        }
      ]
    );
  };

  const handleSystemRestart = () => {
    Alert.alert(
      'إعادة تشغيل النظام',
      'هل تريد إعادة تشغيل جميع خدمات النظام؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'إعادة تشغيل', 
          style: 'destructive',
          onPress: () => Alert.alert('جاري إعادة التشغيل', 'سيتم إعادة تشغيل النظام خلال دقائق')
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1e40af', '#3b82f6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>إعدادات النظام</Text>
        <Text style={styles.headerSubtitle}>
          إدارة وتخصيص إعدادات المنصة
        </Text>
      </LinearGradient>

      <View style={styles.content}>
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

        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>إجراءات النظام</Text>
          
          <View style={styles.categoryContainer}>
            {systemActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionItem}
                onPress={action.onPress}
              >
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: action.color }]}>
                    <action.icon size={20} color="#fff" />
                  </View>
                  
                  <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>{action.title}</Text>
                    <Text style={styles.settingSubtitle}>{action.subtitle}</Text>
                  </View>
                </View>
                
                <ChevronRight size={20} color="#94a3b8" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.systemInfo}>
          <Text style={styles.systemInfoTitle}>معلومات النظام</Text>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>إصدار التطبيق</Text>
              <Text style={styles.infoValue}>v1.0.0</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>آخر تحديث</Text>
              <Text style={styles.infoValue}>2024-01-15</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>حالة الخادم</Text>
              <Text style={[styles.infoValue, { color: '#059669' }]}>متصل</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>استخدام التخزين</Text>
              <Text style={styles.infoValue}>2.4 GB</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Fox Bazzar Admin Panel v1.0.0
          </Text>
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
  actionItem: {
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
  systemInfo: {
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
  systemInfoTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'right',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginBottom: 4,
    textAlign: 'right',
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    textAlign: 'right',
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