import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { ArrowRight, Eye, EyeOff, User, Mail, Phone } from 'lucide-react-native';

export default function RegisterScreen() {
  const { role } = useLocalSearchParams<{ role: string }>();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('خطأ', 'كلمة المرور غير متطابقة');
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await signUp(formData.email, formData.password, {
        name: formData.name,
        phone: formData.phone,
        role: role || 'customer'
      });
      
      if (error) {
        Alert.alert('خطأ في التسجيل', error.message);
        return;
      }
      
      Alert.alert('نجح التسجيل', 'تم إنشاء حسابك بنجاح', [
        { text: 'حسناً', onPress: () => router.replace(`/(auth)/login?role=${role}`) }
      ]);
    } catch (err) {
      Alert.alert('خطأ', 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1e40af', '#3b82f6']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowRight size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>إنشاء حساب جديد</Text>
          <Text style={styles.headerSubtitle}>
            انضم إلى عائلة سوق العرب
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Text style={styles.formTitle}>بيانات التسجيل</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>الاسم الكامل</Text>
            <View style={styles.inputWrapper}>
              <User size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholder="أدخل اسمك الكامل"
                placeholderTextColor="#94a3b8"
                textAlign="right"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>البريد الإلكتروني</Text>
            <View style={styles.inputWrapper}>
              <Mail size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="أدخل بريدك الإلكتروني"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                textAlign="right"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>رقم الهاتف</Text>
            <View style={styles.inputWrapper}>
              <Phone size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                placeholder="أدخل رقم هاتفك"
                placeholderTextColor="#94a3b8"
                keyboardType="phone-pad"
                textAlign="right"
              />
            </View>
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
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                placeholder="أدخل كلمة المرور"
                placeholderTextColor="#94a3b8"
                secureTextEntry={!showPassword}
                textAlign="right"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>تأكيد كلمة المرور</Text>
            <View style={styles.passwordContainer}>
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIcon}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#64748b" />
                ) : (
                  <Eye size={20} color="#64748b" />
                )}
              </TouchableOpacity>
              <TextInput
                style={styles.passwordInput}
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                placeholder="أعد إدخال كلمة المرور"
                placeholderTextColor="#94a3b8"
                secureTextEntry={!showConfirmPassword}
                textAlign="right"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
          >
            <LinearGradient
              colors={['#1e40af', '#3b82f6']}
              style={styles.registerGradient}
            >
              <Text style={styles.registerButtonText}>
                {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => router.replace(`/(auth)/login?role=${role}`)}
          >
            <Text style={styles.loginLinkText}>
              لديك حساب بالفعل؟ سجل دخولك
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#f8fafc',
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    textAlign: 'right',
  },
  inputIcon: {
    marginLeft: 16,
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
  registerButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 20,
  },
  registerGradient: {
    padding: 16,
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  loginLink: {
    alignItems: 'center',
    padding: 16,
  },
  loginLinkText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#3b82f6',
  },
});