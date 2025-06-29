import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Gift, 
  Clock, 
  Percent, 
  Tag,
  Star,
  ShoppingCart,
  Zap,
  Calendar,
  Target
} from 'lucide-react-native';

export default function OffersScreen() {
  const [activeTab, setActiveTab] = useState<'flash' | 'daily' | 'weekly'>('flash');

  const flashDeals = [
    {
      id: 1,
      name: 'هاتف ذكي متطور',
      price: 499,
      originalPrice: 699,
      discount: 29,
      timeLeft: '02:45:30',
      image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=300',
      sold: 45,
      total: 100,
      rating: 4.8
    },
    {
      id: 2,
      name: 'لابتوب عالي الأداء',
      price: 999,
      originalPrice: 1299,
      discount: 23,
      timeLeft: '01:20:15',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300',
      sold: 23,
      total: 50,
      rating: 4.9
    },
  ];

  const dailyOffers = [
    {
      id: 1,
      title: 'خصم 50% على الإلكترونيات',
      description: 'خصم هائل على جميع المنتجات الإلكترونية',
      image: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: '50%',
      validUntil: 'ينتهي في منتصف الليل',
      category: 'إلكترونيات',
      minPurchase: '$100'
    },
    {
      id: 2,
      title: 'توصيل مجاني',
      description: 'توصيل مجاني على جميع الطلبات',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: 'مجاني',
      validUntil: 'ينتهي في منتصف الليل',
      category: 'توصيل',
      minPurchase: '$50'
    },
  ];

  const weeklyOffers = [
    {
      id: 1,
      title: 'عروض الشتاء الكبرى',
      description: 'تخفيضات هائلة على ملابس الشتاء',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: '70%',
      validUntil: 'ينتهي في 5 أيام',
      category: 'أزياء',
      minPurchase: '$75'
    },
    {
      id: 2,
      title: 'عروض المنزل والحديقة',
      description: 'كل ما تحتاجه لمنزلك بأسعار مميزة',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: '40%',
      validUntil: 'ينتهي في 3 أيام',
      category: 'منزل',
      minPurchase: '$150'
    },
  ];

  const formatTime = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(':');
    return { hours, minutes, seconds };
  };

  const renderFlashDeal = (deal: typeof flashDeals[0]) => {
    const time = formatTime(deal.timeLeft);
    const progressPercentage = (deal.sold / deal.total) * 100;

    return (
      <View key={deal.id} style={styles.flashDealCard}>
        <View style={styles.flashDealImage}>
          <Image source={{ uri: deal.image }} style={styles.dealImage} />
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{deal.discount}%</Text>
          </View>
        </View>
        
        <View style={styles.flashDealInfo}>
          <Text style={styles.dealName}>{deal.name}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.originalPrice}>${deal.originalPrice}</Text>
            <Text style={styles.salePrice}>${deal.price}</Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <Star size={14} color="#fbbf24" fill="#fbbf24" />
            <Text style={styles.ratingText}>{deal.rating}</Text>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
            </View>
            <Text style={styles.soldText}>تم بيع {deal.sold} من {deal.total}</Text>
          </View>
          
          <View style={styles.timerContainer}>
            <Clock size={16} color="#ef4444" />
            <View style={styles.timeDisplay}>
              <View style={styles.timeUnit}>
                <Text style={styles.timeNumber}>{time.hours}</Text>
                <Text style={styles.timeLabel}>س</Text>
              </View>
              <Text style={styles.timeSeparator}>:</Text>
              <View style={styles.timeUnit}>
                <Text style={styles.timeNumber}>{time.minutes}</Text>
                <Text style={styles.timeLabel}>د</Text>
              </View>
              <Text style={styles.timeSeparator}>:</Text>
              <View style={styles.timeUnit}>
                <Text style={styles.timeNumber}>{time.seconds}</Text>
                <Text style={styles.timeLabel}>ث</Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.buyNowButton}>
            <LinearGradient
              colors={['#ef4444', '#dc2626']}
              style={styles.buyNowGradient}
            >
              <ShoppingCart size={16} color="#fff" />
              <Text style={styles.buyNowText}>اشتري الآن</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderOffer = (offer: typeof dailyOffers[0]) => (
    <TouchableOpacity key={offer.id} style={styles.offerCard}>
      <Image source={{ uri: offer.image }} style={styles.offerImage} />
      <View style={styles.offerOverlay}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.offerGradient}
        >
          <View style={styles.offerContent}>
            <View style={styles.offerHeader}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{offer.category}</Text>
              </View>
              <View style={styles.discountCircle}>
                <Text style={styles.discountCircleText}>{offer.discount}</Text>
              </View>
            </View>
            
            <Text style={styles.offerTitle}>{offer.title}</Text>
            <Text style={styles.offerDescription}>{offer.description}</Text>
            
            <View style={styles.offerDetails}>
              <View style={styles.offerDetailItem}>
                <Tag size={14} color="#fff" />
                <Text style={styles.offerDetailText}>
                  حد أدنى {offer.minPurchase}
                </Text>
              </View>
              
              <View style={styles.offerDetailItem}>
                <Clock size={14} color="#fff" />
                <Text style={styles.offerDetailText}>{offer.validUntil}</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.useOfferButton}>
              <Target size={16} color="#fff" />
              <Text style={styles.useOfferText}>استخدم العرض</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#dc2626', '#ef4444']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>العروض الخاصة</Text>
        <Text style={styles.headerSubtitle}>
          اكتشف أفضل العروض والخصومات
        </Text>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'flash' && styles.activeTab]}
            onPress={() => setActiveTab('flash')}
          >
            <Zap size={18} color={activeTab === 'flash' ? '#dc2626' : '#fff'} />
            <Text style={[styles.tabText, activeTab === 'flash' && styles.activeTabText]}>
              عروض البرق
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'daily' && styles.activeTab]}
            onPress={() => setActiveTab('daily')}
          >
            <Calendar size={18} color={activeTab === 'daily' ? '#dc2626' : '#fff'} />
            <Text style={[styles.tabText, activeTab === 'daily' && styles.activeTabText]}>
              يومية
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'weekly' && styles.activeTab]}
            onPress={() => setActiveTab('weekly')}
          >
            <Gift size={18} color={activeTab === 'weekly' ? '#dc2626' : '#fff'} />
            <Text style={[styles.tabText, activeTab === 'weekly' && styles.activeTabText]}>
              أسبوعية
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'flash' && (
          <View style={styles.flashDealsContainer}>
            <View style={styles.sectionHeader}>
              <Zap size={24} color="#ef4444" />
              <Text style={styles.sectionTitle}>عروض البرق ⚡</Text>
            </View>
            <Text style={styles.sectionSubtitle}>
              عروض محدودة الوقت - اسرع قبل انتهاء الوقت!
            </Text>
            
            {flashDeals.map(renderFlashDeal)}
          </View>
        )}

        {activeTab === 'daily' && (
          <View style={styles.offersContainer}>
            <View style={styles.sectionHeader}>
              <Calendar size={24} color="#3b82f6" />
              <Text style={styles.sectionTitle}>العروض اليومية</Text>
            </View>
            <Text style={styles.sectionSubtitle}>
              عروض جديدة كل يوم - لا تفوت الفرصة!
            </Text>
            
            {dailyOffers.map(renderOffer)}
          </View>
        )}

        {activeTab === 'weekly' && (
          <View style={styles.offersContainer}>
            <View style={styles.sectionHeader}>
              <Gift size={24} color="#8b5cf6" />
              <Text style={styles.sectionTitle}>العروض الأسبوعية</Text>
            </View>
            <Text style={styles.sectionSubtitle}>
              عروض مميزة تستمر طوال الأسبوع
            </Text>
            
            {weeklyOffers.map(renderOffer)}
          </View>
        )}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 6,
  },
  activeTabText: {
    color: '#dc2626',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginLeft: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginBottom: 20,
    textAlign: 'right',
  },
  flashDealsContainer: {
    marginBottom: 20,
  },
  flashDealCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  flashDealImage: {
    position: 'relative',
  },
  dealImage: {
    width: '100%',
    height: 200,
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  discountText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  flashDealInfo: {
    padding: 20,
  },
  dealName: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'right',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  originalPrice: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#94a3b8',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  salePrice: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#ef4444',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
    marginLeft: 4,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ef4444',
    borderRadius: 4,
  },
  soldText: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    textAlign: 'right',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  timeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  timeUnit: {
    alignItems: 'center',
    minWidth: 30,
  },
  timeNumber: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#ef4444',
  },
  timeLabel: {
    fontSize: 10,
    fontFamily: 'Tajawal-Regular',
    color: '#ef4444',
  },
  timeSeparator: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#ef4444',
    marginHorizontal: 4,
  },
  buyNowButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buyNowGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  buyNowText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
  offersContainer: {
    marginBottom: 20,
  },
  offerCard: {
    height: 250,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  offerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  offerOverlay: {
    flex: 1,
  },
  offerGradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  offerContent: {
    padding: 20,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  discountCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountCircleText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  offerTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'right',
  },
  offerDescription: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    textAlign: 'right',
  },
  offerDetails: {
    marginBottom: 16,
  },
  offerDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  offerDetailText: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    marginRight: 6,
  },
  useOfferButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    borderRadius: 8,
  },
  useOfferText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
});