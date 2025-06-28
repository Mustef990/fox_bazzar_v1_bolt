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
  X
} from 'lucide-react-native';
import WalletCard from '@/components/WalletCard';

export default function AdminWalletScreen() {
  const [addFundsModalVisible, setAddFundsModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'SYP'>('USD');
  const [amount, setAmount] = useState('');

  const walletData = {
    USD: {
      balance: '25,430.50',
      transactions: [
        { type: 'income' as const, amount: '500.00', description: 'عمولة من طلب #1234', date: 'اليوم' },
        { type: 'expense' as const, amount: '200.00', description: 'سحب من المحفظة', date: 'أمس' },
        { type: 'income' as const, amount: '1,250.00', description: 'عمولات التجار', date: 'قبل يومين' },
      ]
    },
    SYP: {
      balance: '15,620,000',
      transactions: [
        { type: 'income' as const, amount: '750,000', description: 'عمولة من طلب #5678', date: 'اليوم' },
        { type: 'expense' as const, amount: '300,000', description: 'مصروفات التشغيل', date: 'أمس' },
        { type: 'income' as const, amount: '2,100,000', description: 'رسوم الاشتراكات', date: 'قبل يومين' },
      ]
    }
  };

  const totalStats = [
    {
      title: 'إجمالي الإيرادات',
      value: '$28,650',
      change: '+12.5%',
      icon: TrendingUp,
      color: '#10b981'
    },
    {
      title: 'عمولات التجار',
      value: '$15,200',
      change: '+8.2%',
      icon: DollarSign,
      color: '#3b82f6'
    },
    {
      title: 'رسوم التوصيل',
      value: '$3,450',
      change: '+15.3%',
      icon: Wallet,
      color: '#f59e0b'
    }
  ];

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
        colors={['#1e40af', '#3b82f6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>إدارة المحفظة</Text>
        <Text style={styles.headerSubtitle}>
          مراقبة الأرصدة والمعاملات المالية
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          {totalStats.map((stat, index) => (
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