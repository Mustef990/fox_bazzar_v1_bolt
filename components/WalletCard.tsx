import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DollarSign, Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';

interface WalletCardProps {
  currency: 'USD' | 'SYP';
  balance: string;
  onAddFunds?: () => void;
  onWithdraw?: () => void;
  transactions?: Array<{
    type: 'income' | 'expense';
    amount: string;
    description: string;
    date: string;
  }>;
}

export default function WalletCard({ 
  currency, 
  balance, 
  onAddFunds, 
  onWithdraw,
  transactions = []
}: WalletCardProps) {
  const isUSD = currency === 'USD';
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isUSD ? ['#059669', '#10b981'] : ['#dc2626', '#ef4444']}
        style={styles.walletCard}
      >
        <View style={styles.cardHeader}>
          <View style={styles.currencyInfo}>
            <DollarSign size={24} color="#fff" />
            <Text style={styles.currencyText}>
              {isUSD ? 'محفظة الدولار' : 'محفظة الليرة السورية'}
            </Text>
          </View>
        </View>
        
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceAmount}>{balance}</Text>
          <Text style={styles.currencySymbol}>
            {isUSD ? 'USD' : 'SYP'}
          </Text>
        </View>
        
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.actionButton} onPress={onAddFunds}>
            <Plus size={16} color="#fff" />
            <Text style={styles.actionButtonText}>إيداع</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={onWithdraw}>
            <ArrowUpRight size={16} color="#fff" />
            <Text style={styles.actionButtonText}>سحب</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      {transactions.length > 0 && (
        <View style={styles.transactionsContainer}>
          <Text style={styles.transactionsTitle}>آخر المعاملات</Text>
          {transactions.slice(0, 3).map((transaction, index) => (
            <View key={index} style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                {transaction.type === 'income' ? (
                  <ArrowDownLeft size={16} color="#10b981" />
                ) : (
                  <ArrowUpRight size={16} color="#ef4444" />
                )}
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionDescription}>
                  {transaction.description}
                </Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text style={[
                styles.transactionAmount,
                { color: transaction.type === 'income' ? '#10b981' : '#ef4444' }
              ]}>
                {transaction.type === 'income' ? '+' : '-'}{transaction.amount}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  walletCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  balanceAmount: {
    fontSize: 36,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  currencySymbol: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
  transactionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  transactionsTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'right',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#374151',
    textAlign: 'right',
  },
  transactionDate: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginTop: 2,
    textAlign: 'right',
  },
  transactionAmount: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
  },
});