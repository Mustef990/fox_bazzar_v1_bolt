import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Search,
  Bell,
  MapPin,
  Star,
  Heart,
  ShoppingCart,
  Filter,
  Zap,
  Gift,
  Truck,
  Menu,
  Megaphone,
  Wallet
} from 'lucide-react-native';
import SideMenu from '@/components/SideMenu';

const { width } = Dimensions.get('window');

export default function CustomerHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sideMenuVisible, setSideMenuVisible] = useState(false);

  const categories = [
    { name: 'إلكترونيات', icon: '📱', color: '#3b82f6' },
    { name: 'أزياء', icon: '👕', color: '#ec4899' },
    { name: 'منزل وحديقة', icon: '🏠', color: '#059669' },
    { name: 'رياضة', icon: '⚽', color: '#f59e0b' },
    { name: 'كتب', icon: '📚', color: '#8b5cf6' },
    { name: 'جمال', icon: '💄', color: '#ef4444' },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'هاتف ذكي متطور',
      price: '$599',
      originalPrice: '$699',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=300',
      discount: '15%',
      isFavorite: false
    },
    {
      id: 2,
      name: 'لابتوب عالي الأداء',
      price: '$1299',
      originalPrice: '$1499',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300',
      discount: '13%',
      isFavorite: true
    },
    {
      id: 3,
      name: 'ساعة ذكية رياضية',
      price: '$299',
      originalPrice: '$399',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300',
      discount: '25%',
      isFavorite: false
    },
  ];

  const offers = [
    {
      title: 'خصم 50% على الإلكترونيات',
      subtitle: 'عرض محدود لمدة 24 ساعة',
      image: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradient: ['#dc2626', '#ef4444']
    },
    {
      title: 'توصيل مجاني',
      subtitle: 'على جميع الطلبات فوق $50',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradient: ['#059669', '#10b981']
    },
  ];

  const sideMenuItems = [
    {
      id: 'favorites',
      title: 'المفضلة',
      icon: Heart,
      color: '#ef4444',
      onPress: () => console.log('Navigate to favorites')
    },
    {
      id: 'offers',
      title: 'العروض',
      icon: Gift,
      color: '#f59e0b',
      onPress: () => console.log('Navigate to offers')
    },
    {
      id: 'ads',
      title: 'الإعلانات',
      icon: Megaphone,
      color: '#8b5cf6',
      onPress: () => console.log('Navigate to ads')
    },
    {
      id: 'wallet',
      title: 'المحفظة',
      icon: Wallet,
      color: '#059669',
      onPress: () => console.log('Navigate to wallet')
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#dc2626', '#ef4444']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#fff" />
            <Text style={styles.locationText}>دمشق، سوريا</Text>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color="#fff" />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuButton}
              onPress={() => setSideMenuVisible(true)}
            >
              <Menu size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.welcomeText}>مرحباً بك في Fox Bazzar</Text>
        <Text style={styles.headerSubtitle}>اكتشف أفضل المنتجات والعروض</Text>

        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#dc2626" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث عن المنتجات..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            textAlign="right"
          />
          <View style={styles.searchIcon}>
            <Search size={20} color="#64748b" />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.offersSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((offer, index) => (
              <TouchableOpacity key={index} style={styles.offerCard}>
                <LinearGradient
                  colors={offer.gradient}
                  style={styles.offerGradient}
                >
                  <View style={styles.offerContent}>
                    <Text style={styles.offerTitle}>{offer.title}</Text>
                    <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
                    <TouchableOpacity style={styles.offerButton}>
                      <Text style={styles.offerButtonText}>تسوق الآن</Text>
                    </TouchableOpacity>
                  </View>
                  <Image source={{ uri: offer.image }} style={styles.offerImage} />
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>التصنيفات</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <Text style={styles.categoryEmoji}>{category.icon}</Text>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>المنتجات المميزة</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredProducts.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productImageContainer}>
                  <Image source={{ uri: product.image }} style={styles.productImage} />
                  <TouchableOpacity style={styles.favoriteButton}>
                    <Heart 
                      size={20} 
                      color={product.isFavorite ? '#ef4444' : '#64748b'} 
                      fill={product.isFavorite ? '#ef4444' : 'transparent'}
                    />
                  </TouchableOpacity>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>-{product.discount}</Text>
                  </View>
                </View>
                
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#fbbf24" fill="#fbbf24" />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                    <Text style={styles.currentPrice}>{product.price}</Text>
                  </View>
                  <TouchableOpacity style={styles.addToCartButton}>
                    <ShoppingCart size={16} color="#fff" />
                    <Text style={styles.addToCartText}>أضف للسلة</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.featuresSection}>
          <View style={styles.featureItem}>
            <Truck size={24} color="#059669" />
            <Text style={styles.featureText}>توصيل سريع</Text>
          </View>
          <View style={styles.featureItem}>
            <Zap size={24} color="#f59e0b" />
            <Text style={styles.featureText}>خدمة 24/7</Text>
          </View>
          <View style={styles.featureItem}>
            <Gift size={24} color="#8b5cf6" />
            <Text style={styles.featureText}>عروض يومية</Text>
          </View>
        </View>
      </View>

      <SideMenu
        visible={sideMenuVisible}
        onClose={() => setSideMenuVisible(false)}
        title="القائمة الإضافية"
        subtitle="المزيد من الخيارات والميزات"
        menuItems={sideMenuItems}
        gradientColors={['#dc2626', '#ef4444']}
      />
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#fff',
    marginLeft: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fbbf24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
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
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    textAlign: 'right',
  },
  searchIcon: {
    marginRight: 8,
  },
  filterButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    padding: 20,
  },
  offersSection: {
    marginBottom: 30,
  },
  offerCard: {
    width: width - 60,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  offerGradient: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  offerContent: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginBottom: 8,
  },
  offerSubtitle: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
  },
  offerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  offerButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  offerImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#dc2626',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 60) / 3,
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
    textAlign: 'center',
  },
  productCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'right',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
    marginRight: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  originalPrice: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#94a3b8',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  currentPrice: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#dc2626',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc2626',
    paddingVertical: 8,
    borderRadius: 8,
  },
  addToCartText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 4,
  },
  featuresSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
    marginTop: 8,
  },
});