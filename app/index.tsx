import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { 
  Store, 
  Users, 
  ShoppingCart, 
  Truck,
  Star,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
    setTimeout(() => {
      router.push(`/(auth)/login?role=${role}`);
    }, 300);
  };

  const roles = [
    {
      id: 'admin',
      title: 'الإدارة العامة',
      description: 'إدارة شاملة للمنصة والمراقبة',
      icon: ShieldCheck,
      gradient: ['#1e40af', '#3b82f6'],
      color: '#1e40af'
    },
    {
      id: 'merchant',
      title: 'التاجر',
      description: 'إدارة المتجر والمنتجات',
      icon: Store,
      gradient: ['#059669', '#10b981'],
      color: '#059669'
    },
    {
      id: 'customer',
      title: 'الزبون',
      description: 'تسوق واستكشاف المنتجات',
      icon: ShoppingCart,
      gradient: ['#dc2626', '#ef4444'],
      color: '#dc2626'
    },
    {
      id: 'delivery',
      title: 'مندوب التوصيل',
      description: 'استلام وتوصيل الطلبات',
      icon: Truck,
      gradient: ['#7c3aed', '#a855f7'],
      color: '#7c3aed'
    }
  ];

  const features = [
    {
      icon: Globe,
      title: 'منصة شاملة',
      description: 'حلول متكاملة لجميع احتياجات التجارة الإلكترونية'
    },
    {
      icon: Zap,
      title: 'سرعة فائقة',
      description: 'أداء محسن وتجربة مستخدم سلسة'
    },
    {
      icon: Star,
      title: 'جودة عالية',
      description: 'معايير عالمية في الأمان والموثوقية'
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1e3a8a', '#3b82f6', '#60a5fa']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.appTitle}>سوق العرب</Text>
          <Text style={styles.appSubtitle}>منصة التجارة الإلكترونية الشاملة</Text>
          
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <feature.icon size={24} color="#fff" />
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>اختر دورك في المنصة</Text>
        <Text style={styles.sectionSubtitle}>
          كل دور له واجهة مخصصة وأدوات متقدمة
        </Text>

        <View style={styles.rolesContainer}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[
                styles.roleCard,
                selectedRole === role.id && styles.selectedRole
              ]}
              onPress={() => handleRoleSelection(role.id)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={selectedRole === role.id ? role.gradient : ['#f8fafc', '#f1f5f9']}
                style={styles.roleGradient}
              >
                <View style={styles.roleIcon}>
                  <role.icon 
                    size={32} 
                    color={selectedRole === role.id ? '#fff' : role.color} 
                  />
                </View>
                <Text style={[
                  styles.roleTitle,
                  selectedRole === role.id && styles.selectedRoleTitle
                ]}>
                  {role.title}
                </Text>
                <Text style={[
                  styles.roleDescription,
                  selectedRole === role.id && styles.selectedRoleDescription
                ]}>
                  {role.description}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            مرحباً بك في منصة سوق العرب - حيث تلتقي التجارة بالتكنولوجيا
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
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 36,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 18,
    fontFamily: 'Tajawal-Regular',
    color: '#e2e8f0',
    textAlign: 'center',
    marginBottom: 30,
  },
  featuresContainer: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    backdropFilter: 'blur(10px)',
  },
  featureText: {
    marginLeft: 16,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#e2e8f0',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 30,
  },
  rolesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  roleCard: {
    width: (width - 50) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  selectedRole: {
    transform: [{ scale: 1.02 }],
    elevation: 8,
    shadowOpacity: 0.2,
  },
  roleGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 160,
  },
  roleIcon: {
    marginBottom: 16,
  },
  roleTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  selectedRoleTitle: {
    color: '#fff',
  },
  roleDescription: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
  selectedRoleDescription: {
    color: '#e2e8f0',
  },
  footer: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
});