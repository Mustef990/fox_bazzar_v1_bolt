import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, ShoppingBag, Heart, MapPin, CreditCard, Bell, Shield, CircleHelp as HelpCircle, LogOut, CreditCard as Edit, Star, Gift, Truck, Phone, Mail, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const userStats = [
    { title: 'الطلبات', value: '24', icon: ShoppingBag, color: '#3b82f6' },
    { title: 'المفضلة', value: '12', icon: Heart, color: '#ef4444' },
    { title: 'النقاط', value: '1,250', icon: Star, color: '#fbbf24' },
    { title: 'الكوبونات', value: '5', icon: Gift, color: '#8b5cf6' },
  ];

  const menuItems = [
    {
      title: 'معلومات الحساب',
      icon: User,
      color: '#3b82f6',
      onPress: () => console.log('Account info')
    },
    {
      title: 'طلباتي',
      icon: ShoppingBag,
      color: '#059669',
      onPress: () => console.log('My orders')
    },
    {
      title: 'العناوين',
      icon: MapPin,
      color: '#f59e0b',
      onPress: () => console.log('Addresses')
    },
    {
      title: 'طرق الدفع',
      icon: CreditCard,
      color: '#8b5cf6',
      onPress: () => console.log('Payment methods')
    },
    {
      title: 'الإعدادات',
      icon: Settings,
      color: '#64748b',
      onPress: () => console.log('Settings')
    },
    {
      title: 'الأمان والخصوصية',
      icon: Shield,
      color: '#dc2626',
      onPress: () => console.log('Security')
    },
    {
      title: 'المساعدة والدعم',
      icon: HelpCircle,
      color: '#06b6d4',
      onPress: () => console.log('Help')
    },
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
        colors={['#dc2626', '#ef4444']}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Edit size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>أحمد محمد</Text>
            <Text style={styles.userEmail}>ahmed.mohamed@example.com</Text>
            <View style={styles.userLevel}>
              <Star size={16} color="#fbbf24" fill="#fbbf24" />
              <Text style={styles.levelText}>عضو ذهبي</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editProfileButton}>
            <Edit size={18} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          {userStats.map((stat, index) => (
            <TouchableOpacity key={index} style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                <stat.icon size={20} color="#fff" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={styles.quickActionIcon}>
              <Truck size={24} color="#059669" />
            </View>
            <Text style={styles.quickActionText}>تتبع الطلب</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={styles.quickActionIcon}>
              <Gift size={24} color="#8b5cf6" />
            </View>
            <Text style={styles.quickActionText}>الكوبونات</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={styles.quickActionIcon}>
              <HelpCircle size={24} color="#06b6d4" />
            </View>
            <Text style={styles.quickActionText}>المساعدة</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.sectionTitle}>معلومات الاتصال</Text>
          
          <View style={styles.contactItem}>
            <Phone size={20} color="#64748b" />
            <Text style={styles.contactText}>+963 123 456 789</Text>
            <TouchableOpacity style={styles.contactEditButton}>
              <Edit size={16} color="#64748b" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.contactItem}>
            <Mail size={20} color="#64748b" />
            <Text style={styles.contactText}>ahmed.mohamed@example.com</Text>
            <TouchableOpacity style={styles.contactEditButton}>
              <Edit size={16} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>الإعدادات السريعة</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={20} color="#f59e0b" />
              <Text style={styles.settingText}>الإشعارات</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#e2e8f0', true: '#dc2626' }}
              thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <MapPin size={20} color="#059669" />
              <Text style={styles.settingText}>تحديد الموقع</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: '#e2e8f0', true: '#dc2626' }}
              thumbColor={locationEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>القائمة الرئيسية</Text>
          
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                  <item.icon size={20} color="#fff" />
                </View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <ChevronRight size={20} color="#94a3b8" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.logoutText}>تسجيل الخروج</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Fox Bazzar v1.0.0</Text>
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
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  userLevel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 4,
  },
  editProfileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    padding: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  quickActionItem: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'right',
  },
  contactInfo: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
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
  contactEditButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
    marginLeft: 12,
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#fecaca',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#ef4444',
    marginLeft: 8,
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