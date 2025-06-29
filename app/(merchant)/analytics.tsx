import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Calendar,
  Filter,
  Download,
  Eye,
  Target
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function MerchantAnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const analyticsData = {
    overview: [
      {
        title: 'إجمالي المبيعات',
        value: '$12,450',
        change: '+15.2%',
        trend: 'up',
        icon: DollarSign,
        color: '#059669'
      },
      {
        title: 'عدد الطلبات',
        value: '156',
        change: '+8.7%',
        trend: 'up',
        icon: ShoppingCart,
        color: '#3b82f6'
      },
      {
        title: 'العملاء الجدد',
        value: '45',
        change: '-2.1%',
        trend: 'down',
        icon: Users,
        color: '#f59e0b'
      },
      {
        title: 'المنتجات المباعة',
        value: '234',
        change: '+12.5%',
        trend: 'up',
        icon: Package,
        color: '#8b5cf6'
      }
    ],
    salesData: [
      { month: 'يناير', sales: 8000, orders: 120 },
      { month: 'فبراير', sales: 9500, orders: 140 },
      { month: 'مارس', sales: 11000, orders: 165 },
      { month: 'أبريل', sales: 12500, orders: 180 },
      { month: 'مايو', sales: 14000, orders: 200 },
      { month: 'يونيو', sales: 15500, orders: 220 },
    ],
    topProducts: [
      { name: 'هاتف ذكي', sales: '$3,450', units: 45, percentage: 28 },
      { name: 'لابتوب', sales: '$2,890', units: 23, percentage: 23 },
      { name: 'ساعة ذكية', sales: '$1,980', units: 67, percentage: 16 },
      { name: 'سماعات', sales: '$1,560', units: 89, percentage: 13 },
      { name: 'كاميرا', sales: '$1,120', units: 12, percentage: 9 },
    ],
    customerMetrics: {
      totalCustomers: 245,
      newCustomers: 45,
      returningCustomers: 200,
      averageOrderValue: '$79.80',
      customerLifetimeValue: '$320'
    }
  };

  const periods = [
    { key: 'week', label: 'أسبوع' },
    { key: 'month', label: 'شهر' },
    { key: 'year', label: 'سنة' }
  ];

  const renderChart = () => {
    const maxSales = Math.max(...analyticsData.salesData.map(item => item.sales));
    
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>مبيعات الأشهر الستة الماضية</Text>
        <View style={styles.chart}>
          {analyticsData.salesData.map((item, index) => {
            const height = (item.sales / maxSales) * 150;
            return (
              <View key={index} style={styles.chartItem}>
                <View style={styles.chartBar}>
                  <LinearGradient
                    colors={['#059669', '#10b981']}
                    style={[styles.chartBarFill, { height }]}
                  />
                </View>
                <Text style={styles.chartLabel}>{item.month}</Text>
                <Text style={styles.chartValue}>${(item.sales / 1000).toFixed(0)}K</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#059669', '#10b981']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>تحليلات المتجر</Text>
        <Text style={styles.headerSubtitle}>
          مراقبة أداء متجرك وإحصائياته
        </Text>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.downloadButton}>
            <Download size={20} color="#fff" />
            <Text style={styles.downloadButtonText}>تصدير التقرير</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodButton,
                selectedPeriod === period.key && styles.activePeriodButton
              ]}
              onPress={() => setSelectedPeriod(period.key as any)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period.key && styles.activePeriodButtonText
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.overviewGrid}>
          {analyticsData.overview.map((metric, index) => (
            <View key={index} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <View style={[styles.metricIcon, { backgroundColor: metric.color }]}>
                  <metric.icon size={20} color="#fff" />
                </View>
                <View style={[
                  styles.trendIndicator,
                  { backgroundColor: metric.trend === 'up' ? '#dcfce7' : '#fef2f2' }
                ]}>
                  {metric.trend === 'up' ? (
                    <TrendingUp size={14} color="#059669" />
                  ) : (
                    <TrendingDown size={14} color="#ef4444" />
                  )}
                  <Text style={[
                    styles.trendText,
                    { color: metric.trend === 'up' ? '#059669' : '#ef4444' }
                  ]}>
                    {metric.change}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricTitle}>{metric.title}</Text>
            </View>
          ))}
        </View>

        {renderChart()}

        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>أفضل المنتجات</Text>
          <View style={styles.productsContainer}>
            {analyticsData.topProducts.map((product, index) => (
              <View key={index} style={styles.productItem}>
                <View style={styles.productRank}>
                  <Text style={styles.rankNumber}>{index + 1}</Text>
                </View>
                
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productUnits}>{product.units} وحدة مباعة</Text>
                </View>
                
                <View style={styles.productSales}>
                  <Text style={styles.salesAmount}>{product.sales}</Text>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View style={[
                        styles.progressFill,
                        { width: `${product.percentage}%` }
                      ]} />
                    </View>
                    <Text style={styles.progressPercentage}>{product.percentage}%</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.customerSection}>
          <Text style={styles.sectionTitle}>مقاييس العملاء</Text>
          <View style={styles.customerGrid}>
            <View style={styles.customerCard}>
              <Text style={styles.customerValue}>{analyticsData.customerMetrics.totalCustomers}</Text>
              <Text style={styles.customerLabel}>إجمالي العملاء</Text>
            </View>
            
            <View style={styles.customerCard}>
              <Text style={styles.customerValue}>{analyticsData.customerMetrics.newCustomers}</Text>
              <Text style={styles.customerLabel}>عملاء جدد</Text>
            </View>
            
            <View style={styles.customerCard}>
              <Text style={styles.customerValue}>{analyticsData.customerMetrics.averageOrderValue}</Text>
              <Text style={styles.customerLabel}>متوسط قيمة الطلب</Text>
            </View>
            
            <View style={styles.customerCard}>
              <Text style={styles.customerValue}>{analyticsData.customerMetrics.customerLifetimeValue}</Text>
              <Text style={styles.customerLabel}>قيمة العميل مدى الحياة</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
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
    marginBottom: 24,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 12,
  },
  downloadButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activePeriodButton: {
    backgroundColor: '#059669',
  },
  periodButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
  },
  activePeriodButtonText: {
    color: '#fff',
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  metricCard: {
    width: (width - 50) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    marginLeft: 4,
  },
  metricValue: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
  },
  chartContainer: {
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
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'right',
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200,
  },
  chartItem: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: 30,
    height: 150,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  chartBarFill: {
    width: '100%',
    borderRadius: 4,
  },
  chartLabel: {
    fontSize: 10,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginBottom: 2,
  },
  chartValue: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
  },
  productsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'right',
  },
  productsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  rankNumber: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    textAlign: 'right',
  },
  productUnits: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginTop: 2,
    textAlign: 'right',
  },
  productSales: {
    alignItems: 'flex-end',
  },
  salesAmount: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#059669',
    marginBottom: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    width: 60,
    height: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 3,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 3,
  },
  progressPercentage: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
    minWidth: 30,
  },
  customerSection: {
    marginBottom: 30,
  },
  customerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  customerCard: {
    width: (width - 50) / 2,
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
  customerValue: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  customerLabel: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    textAlign: 'center',
  },
});