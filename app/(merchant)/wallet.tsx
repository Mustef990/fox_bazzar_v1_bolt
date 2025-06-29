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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Wallet,
  Plus,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  X,
  CreditCard,
  Banknote
} from 'lucide-react-native';
import WalletCard from '@/components/WalletCard';

export default function MerchantWalletScreen() {
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'SYP'>('USD');
  const [amount, setAmount] = useState('');

  const walletData = {
    USD: {
      balance: '3,450.75',
      transactions: [
        { type: 'income' as const, amount: '125.00', description: 'مبيعات اليوم', date: 'اليوم' },
        { type: 'expense' as const, amount: '25.00', description: 'رسوم المنصة', date: 'أمس' },
        { type: 'income' as const, amount: '89.50', description: 'طلب #1234', date: 'قبل يومين' },
      ]
    },
    SYP: {
      balance: '2,850,000',
      transactions: [
        { type: 'income' as const, amount: '450,000', description: 'مبيعات الأسبوع', date: 'اليوم' },
        { type: 'expense' as const, amount: '75,000', description: 'رسوم التحويل', date: 'أمس' },
        { type: 'income' as const, amount: '320,000', description: 'طلبات متعددة', date: 'قبل يومين' },
      ]
    }
  };

  const earningsStats = [
    {
      title: 'أرباح اليوم',
      value: '$125',
      change: '+15%',
      icon: TrendingUp,
      color: '#10b981'
    },
    {
      title: 'أرباح الشهر',
      value: '$3,450',
      change: '+22%',
      icon: DollarSign,
      color: '#3b82f6'
    },
    {
      title: 'متوسط الطلب',
      value: '$85',
      change: '+8%',
      icon: Wallet,
      color: '#f59e0b'
    }
  ];

  const handleWithdraw = (currency: 'USD' | 'SYP') => {
    setSelectedCurrency(currency);
    setWithdrawModalVisible(true);
  };

  const confirmWithdraw = () => {
    if (!amount) {
      Alert.alert('خطأ', 'يرجى إدخال المبلغ');
      return;
    }
    
    Alert.alert(
      'تأكيد السحب',
      `هل تريد سحب ${amount} ${selectedCurrency}؟`,
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'تأكيد', 
          onPress: () => {
            setWithdrawModalVisible(false);
            setAmount('');
            Alert.alert('تم السحب', 'سيتم تحويل المبلغ خلال 24 ساعة');
          }
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
        <Text style={styles.headerTitle}>محفظة التاجر</Text>
        <Text style={styles.headerSubtitle}>
          إدارة أرباحك ومعاملاتك المالية
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          {earningsStats.map((stat, index) => (
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

        <WalletCard
          currency="USD"
          balance={walletData.USD.balance}
          transactions={walletData.USD.transactions}
          onWithdraw={() => handleWithdraw('USD')}
        />

        <WalletCard
          currency="SYP"
          balance={walletData.SYP.balance}
          transactions={walletData.SYP.transactions}
          onWithdraw={() => handleWithdraw('SYP')}
        />

        <View style={styles.payoutSection}>
          <Text style={styles.sectionTitle}>طرق السحب</Text>
          
          <View style={styles.payoutMethods}>
            <TouchableOpacity style={styles.payoutMethod}>
              <CreditCard size={24} color="#3b82f6" />
              <View style={styles.payoutInfo}>
                <Text style={styles.payoutTitle}>حساب بنكي</Text>
                <Text style={styles.payoutDescription}>تحويل مباشر للحساب البنكي</Text>
              </View>
              <Text style={styles.payoutFee}>رسوم: 2%</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.payoutMethod}>
              <Banknote size={24} color="#059669" />
              <View style={styles.payoutInfo}>
                <Text style={styles.payoutTitle}>محفظة إلكترونية</Text>
                <Text style={styles.payoutDescription}>تحويل فوري للمحفظة الإلكترونية</Text>
              </View>
              <Text style={styles.payoutFee}>رسوم: 1%</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>نصائح لزيادة الأرباح</Text>
          
          <View style={styles.tipCard}>
            <TrendingUp size={20} color="#10b981" />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>حسن من جودة منتجاتك</Text>
              <Text style={styles.tipText}>
                المنتجات عالية الجودة تحصل على تقييمات أفضل ومبيعات أكثر
              </Text>
            </View>
          </View>
          
          <View style={styles.tipCard}>
            <DollarSign size={20} color="#3b82f6" />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>استخدم العروض والخصومات</Text>
              <Text style={styles.tipText}>
                العروض الذكية تجذب المزيد من العملاء وتزيد من حجم المبيعات
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Modal
        visible={withdrawModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setWithdrawModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                سحب من محفظة {selectedCurrency === 'USD' ? 'الدولار' : 'الليرة السورية'}
              </Text>
              <TouchableOpacity
                onPress={() => setWithdrawModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#64748b" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <Text style={styles.inputLabel}>المبلغ</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                placeholder={`أدخل المبلغ بـ ${selectedCurrency}`}
                placeholderTextColor="#94a3b8"
                keyboardType="numeric"
                textAlign="right"
              />
              
              <View style={styles.withdrawInfo}>
                <Text style={styles.withdrawInfoTitle}>معلومات السحب</Text>
                <Text style={styles.withdrawInfoText}>
                  • الحد الأدنى للسحب: {selectedCurrency === 'USD' ? '$50' : '100,000 ل.س'}
                </Text>
                <Text style={styles.withdrawInfoText}>
                  • رسوم السحب: 2% من المبلغ
                </Text>
                <Text style={styles.withdrawInfoText}>
                  • مدة التحويل: 1-3 أيام عمل
                </Text>
              </View>
              
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setWithdrawModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>إلغاء</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={confirmWithdraw}
                >
                  <LinearGradient
                    colors={['#059669', '#10b981']}
                    style={styles.confirmGradient}
                  >
                    <ArrowUpRight size={16} color="#fff" />
                    <Text style={styles.confirmButtonText}>سحب</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 4,
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
    fontSize: 18,
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
  payoutSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'right',
  },
  payoutMethods: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  payoutMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  payoutInfo: {
    flex: 1,
    marginLeft: 16,
  },
  payoutTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    textAlign: 'right',
  },
  payoutDescription: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginTop: 2,
    textAlign: 'right',
  },
  payoutFee: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#f59e0b',
  },
  tipsSection: {
    marginBottom: 30,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tipContent: {
    flex: 1,
    marginLeft: 12,
  },
  tipTitle: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  tipText: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    textAlign: 'right',
    lineHeight: 18,
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
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'right',
  },
  amountInput: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    backgroundColor: '#f8fafc',
    textAlign: 'right',
    marginBottom: 20,
  },
  withdrawInfo: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  withdrawInfoTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'right',
  },
  withdrawInfoText: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginBottom: 4,
    textAlign: 'right',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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