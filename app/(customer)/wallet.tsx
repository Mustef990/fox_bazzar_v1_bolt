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
  Gift,
  ShoppingCart,
  Zap
} from 'lucide-react-native';
import WalletCard from '@/components/WalletCard';

export default function CustomerWalletScreen() {
  const [addFundsModalVisible, setAddFundsModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'SYP'>('USD');
  const [amount, setAmount] = useState('');

  const walletData = {
    USD: {
      balance: '450.75',
      transactions: [
        { type: 'expense' as const, amount: '25.00', description: 'شراء من متجر الإلكترونيات', date: 'اليوم' },
        { type: 'income' as const, amount: '50.00', description: 'إيداع من البطاقة الائتمانية', date: 'أمس' },
        { type: 'expense' as const, amount: '15.50', description: 'رسوم التوصيل', date: 'قبل يومين' },
      ]
    },
    SYP: {
      balance: '125,000',
      transactions: [
        { type: 'expense' as const, amount: '35,000', description: 'شراء من السوق المحلي', date: 'اليوم' },
        { type: 'income' as const, amount: '100,000', description: 'تحويل من الحساب البنكي', date: 'أمس' },
        { type: 'expense' as const, amount: '20,000', description: 'فاتورة الخدمات', date: 'قبل يومين' },
      ]
    }
  };

  const quickActions = [
    {
      title: 'إيداع سريع',
      subtitle: 'أضف أموال للمحفظة',
      icon: Plus,
      color: '#059669',
      action: () => setAddFundsModalVisible(true)
    },
    {
      title: 'كوبون خصم',
      subtitle: 'استخدم كوبون للخصم',
      icon: Gift,
      color: '#8b5cf6',
      action: () => console.log('Use coupon')
    },
    {
      title: 'دفع فاتورة',
      subtitle: 'ادفع فواتيرك بسهولة',
      icon: CreditCard,
      color: '#f59e0b',
      action: () => console.log('Pay bill')
    },
    {
      title: 'تحويل سريع',
      subtitle: 'حول أموال لصديق',
      icon: ArrowUpRight,
      color: '#3b82f6',
      action: () => console.log('Transfer money')
    },
  ];

  const rewardProgram = {
    currentPoints: 1250,
    nextReward: 2000,
    rewardsEarned: 3,
    cashback: '2.5%'
  };

  const handleAddFunds = (currency: 'USD' | 'SYP') => {
    setSelectedCurrency(currency);
    setAddFundsModalVisible(true);
  };

  const handleWithdraw = (currency: 'USD' | 'SYP') => {
    Alert.alert(
      'سحب من المحفظة',
      `هل تريد سحب مبلغ من محفظة ${currency === 'USD' ? 'الدولار' : 'الليرة السورية'}؟`
    );
  };

  const confirmAddFunds = () => {
    if (!amount) {
      Alert.alert('خطأ', 'يرجى إدخال المبلغ');
      return;
    }
    
    Alert.alert(
      'تأكيد الإيداع',
      `هل تريد إيداع ${amount} ${selectedCurrency}؟`,
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'تأكيد', 
          onPress: () => {
            setAddFundsModalVisible(false);
            setAmount('');
            Alert.alert('نجح الإيداع', 'تم إيداع المبلغ بنجاح');
          }
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
        <Text style={styles.headerTitle}>محفظتي</Text>
        <Text style={styles.headerSubtitle}>
          إدارة أموالك ومدفوعاتك بسهولة
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.rewardsSection}>
          <LinearGradient
            colors={['#8b5cf6', '#a78bfa']}
            style={styles.rewardsCard}
          >
            <View style={styles.rewardsHeader}>
              <Text style={styles.rewardsTitle}>برنامج المكافآت</Text>
              <Gift size={24} color="#fff" />
            </View>
            
            <View style={styles.rewardsContent}>
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsValue}>{rewardProgram.currentPoints}</Text>
                <Text style={styles.pointsLabel}>نقطة متاحة</Text>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[
                    styles.progressFill, 
                    { width: `${(rewardProgram.currentPoints / rewardProgram.nextReward) * 100}%` }
                  ]} />
                </View>
                <Text style={styles.progressText}>
                  {rewardProgram.nextReward - rewardProgram.currentPoints} نقطة للمكافأة التالية
                </Text>
              </View>
              
              <View style={styles.rewardsStats}>
                <View style={styles.rewardStat}>
                  <Text style={styles.rewardStatValue}>{rewardProgram.rewardsEarned}</Text>
                  <Text style={styles.rewardStatLabel}>مكافآت مستلمة</Text>
                </View>
                <View style={styles.rewardStat}>
                  <Text style={styles.rewardStatValue}>{rewardProgram.cashback}</Text>
                  <Text style={styles.rewardStatLabel}>استرداد نقدي</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>إجراءات سريعة</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionCard}
                onPress={action.action}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <action.icon size={24} color="#fff" />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <WalletCard
          currency="USD"
          balance={walletData.USD.balance}
          transactions={walletData.USD.transactions}
          onAddFunds={() => handleAddFunds('USD')}
          onWithdraw={() => handleWithdraw('USD')}
        />

        <WalletCard
          currency="SYP"
          balance={walletData.SYP.balance}
          transactions={walletData.SYP.transactions}
          onAddFunds={() => handleAddFunds('SYP')}
          onWithdraw={() => handleWithdraw('SYP')}
        />

        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>نصائح للتوفير</Text>
          <View style={styles.tipCard}>
            <Zap size={20} color="#f59e0b" />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>استخدم كوبونات الخصم</Text>
              <Text style={styles.tipText}>
                وفر حتى 30% على مشترياتك باستخدام كوبونات الخصم المتاحة
              </Text>
            </View>
          </View>
          
          <View style={styles.tipCard}>
            <ShoppingCart size={20} color="#059669" />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>اجمع نقاط المكافآت</Text>
              <Text style={styles.tipText}>
                احصل على نقاط مع كل عملية شراء واستبدلها بمكافآت قيمة
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Modal
        visible={addFundsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddFundsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                إيداع في محفظة {selectedCurrency === 'USD' ? 'الدولار' : 'الليرة السورية'}
              </Text>
              <TouchableOpacity
                onPress={() => setAddFundsModalVisible(false)}
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
              
              <View style={styles.paymentMethods}>
                <Text style={styles.paymentMethodsTitle}>طريقة الدفع</Text>
                
                <TouchableOpacity style={styles.paymentMethod}>
                  <CreditCard size={20} color="#3b82f6" />
                  <Text style={styles.paymentMethodText}>بطاقة ائتمانية</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.paymentMethod}>
                  <Wallet size={20} color="#059669" />
                  <Text style={styles.paymentMethodText}>محفظة إلكترونية</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setAddFundsModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>إلغاء</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={confirmAddFunds}
                >
                  <LinearGradient
                    colors={['#059669', '#10b981']}
                    style={styles.confirmGradient}
                  >
                    <Plus size={16} color="#fff" />
                    <Text style={styles.confirmButtonText}>إيداع</Text>
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
  rewardsSection: {
    marginBottom: 30,
  },
  rewardsCard: {
    borderRadius: 20,
    padding: 24,
  },
  rewardsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rewardsTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  rewardsContent: {
    alignItems: 'center',
  },
  pointsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pointsValue: {
    fontSize: 36,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  pointsLabel: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  rewardsStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  rewardStat: {
    alignItems: 'center',
  },
  rewardStatValue: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  rewardStatLabel: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  quickActionsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'right',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    textAlign: 'center',
  },
  tipsSection: {
    marginTop: 20,
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
    marginBottom: 24,
  },
  paymentMethods: {
    marginBottom: 24,
  },
  paymentMethodsTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
    marginBottom: 12,
    textAlign: 'right',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  paymentMethodText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
    marginLeft: 12,
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