import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Store, 
  Users, 
  ShoppingCart, 
  Truck,
  ShieldCheck 
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const { role } = useLocalSearchParams<{ role: string }>();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const getRoleInfo = () => {
    switch (role) {
      case 'admin':
        return {
          title: 'دخول الإدارة',
          icon: ShieldCheck,
          gradient: ['#1e40af', '#3b82f6'],
          route: '/(admin)'
        };
      case 'merchant':
        return {
          title: 'دخول التاجر',
          icon: Store,
          gradient: ['#059669', '#10b981'],
          route: '/(merchant)'
        };
      case 'customer':
        return {
          title: 'دخول الزبون',
          icon: ShoppingCart,
          gradient: ['#dc2626', '#ef4444'],
          route: '/(customer)'
        };
      case 'delivery':
        return {
          title: 'دخول مندوب التوصيل',
          icon: Truck,
          gradient: ['#7c3aed', '#a855f7'],
          route: '/(delivery)'
        };
      default:
        return {
          title: 'تسجيل الدخول',
          icon: Users,
          gradient: ['#1e40af', '#3b82f6'],
          route: '/(customer)'
        };
    }
  };

  const roleInfo = getRoleInfo();
  const IconComponent = roleInfo.icon;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول');
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        Alert.alert('خطأ في تسجيل الدخول', error.message);
        return;
      }
      
      if (data.user) {
        // التحقق من دور المستخدم
        const userRole = data.user.user_metadata?.role || 'customer';
        
        if (userRole !== role) {
          Alert.alert('خطأ', 'هذا الحساب غير مخصص لهذا الدور');
          return;
        }
        
        router.replace(roleInfo.route);
      }
    } catch (err) {
      Alert.alert('خطأ', 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    router.push(`/(auth)/register?role=${role}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={roleInfo.gradient}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowRight size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <IconComponent size={48} color="#fff" />
          </View>
          <Text style={styles.headerTitle}>{roleInfo.title}</Text>
          <Text style={styles.headerSubtitle}>
            مرحباً بعودتك إلى سوق العرب
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Text style={styles.formTitle}>تسجيل الدخول</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>البريد الإلكتروني</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="أدخل بريدك الإلكتروني"
              placeholderTextColor="#94a3b8"
              keyboardType="email-address"
              autoCapitalize="none"
              textAlign="right"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>كلمة المرور</Text>
            <View style={styles.passwordContainer}>
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#64748b" />
                ) : (
                  <Eye size={20} color="#64748b" />
                )}
              </TouchableOpacity>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="أدخل كلمة المرور"
                placeholderTextColor="#94a3b8"
                secureTextEntry={!showPassword}
                textAlign="right"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>
              نسيت كلمة المرور؟
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <LinearGradient
              colors={roleInfo.gradient}
              style={styles.loginGradient}
            >
              <Text style={styles.loginButtonText}>
                {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>أو</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>
              ليس لديك حساب؟ سجل الآن
            </Text>
          </TouchableOpacity>
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
  backButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  form: {
    flex: 1,
  },
  formTitle: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 30,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#f8fafc',
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    textAlign: 'right',
  },
  eyeIcon: {
    padding: 16,
  },
  forgotPassword: {
    alignItems: 'center',
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#3b82f6',
  },
  loginButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  loginGradient: {
    padding: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
  },
  registerButton: {
    alignItems: 'center',
    padding: 16,
  },
  registerButtonText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#3b82f6',
  },
});