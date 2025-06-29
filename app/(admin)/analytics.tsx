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
import { ChartBar as BarChart3, TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Calendar, Filter, Download, Eye, Target } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function AdminAnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const analyticsData = {
    overview: [
      {
        title: 'إجمالي الإيرادات',
        value: '$45,230',
        change: '+12.5%',
        trend: 'up',
        icon: DollarSign,
        color: '#059669'
      },
      {
        title: 'المستخدمين النشطين',
        value: '8,420',
        change: '+8.2%',
        trend: 'up',
        icon: Users,
        color: '#3b82f6'
      },
      {
        title: 'إجمالي الطلبات',
        value: '1,234',
        change: '-2.1%',
        trend: 'down',
        icon: ShoppingCart,
        color: '#f59e0b'
      },
      {
        title: 'معدل التحويل',
        value: '3.2%',
        change: '+0.5%',
        trend: 'up',
        icon: Target,
        color: '#8b5cf6'
      }
    ],
    salesData: [
      { month: 'يناير', sales: 12000, orders: 340 },
      { month: 'فبراير', sales: 15000, orders: 420 },
      { month: 'مارس', sales: 18000, orders: 510 },
      { month: 'أبريل', sales: 22000, orders: 630 },
      { month: 'مايو', sales: 25000, orders: 720 },
      { month: 'يونيو', sales: 28000, orders: 810 },
    ],
    topCategories: [
      { name: 'إلكترونيات', sales: '$15,420', percentage: 34 },
      { name: 'أزياء', sales: '$12,350', percentage: 27 },
      { name: 'منزل وحديقة', sales: '$8,920', percentage: 20 },
      { name: 'رياضة', sales: '$5,680', percentage: 13 },
      { name: 'كتب', sales: '$2,860', percentage: 6 },
    ],
    userMetrics: {
      newUsers: 1250,
      returningUsers: 3420,
      averageSessionTime: '4:32',
      bounceRate: '32%'
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
                    colors={['#3b82f6', '#60a5fa']}
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1e40af', '#3b82f6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>التقارير والتحليلات</Text>
          <Text style={styles.headerSubtitle}>
            مراقبة الأداء والإحصائيات
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
        </View>
      </LinearGradient>

      <View style={styles.content}>
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

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>أفضل التصنيفات</Text>
          <View style={styles.categoriesContainer}>
            {analyticsData.topCategories.map((category, index) => (
              <View key={index} style={styles.categoryItem}>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categorySales}>{category.sales}</Text>
                </View>
                
                <View style={styles.categoryProgress}>
                  <View style={styles.progressBar}>
                    <View style={[
                      styles.progressFill,
                      { width: `${category.percentage}%` }
                    ]} />
                  </View>
                  <Text style={styles.categoryPercentage}>{category.percentage}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.userMetricsSection}>
          <Text style={styles.sectionTitle}>مقاييس المستخدمين</Text>
          <View style={styles.userMetricsGrid}>
            <View style={styles.userMetricCard}>
              <Text style={styles.userMetricValue}>{analyticsData.userMetrics.newUsers}</Text>
              <Text style={styles.userMetricLabel}>مستخدمين جدد</Text>
            </View>
            
            <View style={styles.userMetricCard}>
              <Text style={styles.userMetricValue}>{analyticsData.userMetrics.returningUsers}</Text>
              <Text style={styles.userMetricLabel}>مستخدمين عائدين</Text>
            </View>
            
            <View style={styles.userMetricCard}>
              <Text style={styles.userMetricValue}>{analyticsData.userMetrics.averageSessionTime}</Text>
              <Text style={styles.userMetricLabel}>متوسط الجلسة</Text>
            </View>
            
            <View style={styles.userMetricCard}>
              <Text style={styles.userMetricValue}>{analyticsData.userMetrics.bounceRate}</Text>
              <Text style={styles.userMetricLabel}>معدل الارتداد</Text>
            </View>
          </View>
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
    marginBottom: 24,
  },
  headerActions: {
    flexDirection: 'row',
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
    backgroundColor: '#1e40af',
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
  categoriesSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'right',
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  categoryItem: {
    marginBottom: 20,
  },
  categoryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
  },
  categorySales: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#059669',
  },
  categoryProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  categoryPercentage: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
    minWidth: 35,
  },
  userMetricsSection: {
    marginBottom: 30,
  },
  userMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  userMetricCard: {
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
  userMetricValue: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  userMetricLabel: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    textAlign: 'center',
  },
});