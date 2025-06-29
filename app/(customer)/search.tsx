import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, Star, Heart, ShoppingCart, SlidersHorizontal, Grid3x3 as Grid3X3, List, TrendingUp, Clock } from 'lucide-react-native';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'electronics', name: 'إلكترونيات', count: 1234 },
    { id: 'fashion', name: 'أزياء', count: 856 },
    { id: 'home', name: 'منزل', count: 642 },
    { id: 'sports', name: 'رياضة', count: 423 },
    { id: 'books', name: 'كتب', count: 312 },
    { id: 'beauty', name: 'جمال', count: 289 },
  ];

  const trendingSearches = [
    'هاتف ذكي', 'لابتوب', 'ساعة ذكية', 'سماعات', 'كاميرا'
  ];

  const recentSearches = [
    'iPhone 15', 'MacBook Pro', 'AirPods', 'iPad'
  ];

  const searchResults = [
    {
      id: 1,
      name: 'هاتف ذكي متطور',
      price: 599,
      originalPrice: 699,
      rating: 4.8,
      reviews: 245,
      image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=300',
      merchant: 'متجر الإلكترونيات',
      discount: '15%',
      isFavorite: false,
      inStock: true
    },
    {
      id: 2,
      name: 'لابتوب عالي الأداء',
      price: 1299,
      originalPrice: 1499,
      rating: 4.9,
      reviews: 189,
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300',
      merchant: 'متجر الكمبيوتر',
      discount: '13%',
      isFavorite: true,
      inStock: true
    },
    {
      id: 3,
      name: 'ساعة ذكية رياضية',
      price: 299,
      originalPrice: 399,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300',
      merchant: 'متجر الأجهزة',
      discount: '25%',
      isFavorite: false,
      inStock: true
    },
    {
      id: 4,
      name: 'سماعات لاسلكية',
      price: 199,
      originalPrice: 249,
      rating: 4.6,
      reviews: 98,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300',
      merchant: 'متجر الصوتيات',
      discount: '20%',
      isFavorite: false,
      inStock: true
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here
  };

  const toggleFavorite = (id: number) => {
    // Implement favorite toggle logic
  };

  const addToCart = (id: number) => {
    // Implement add to cart logic
  };

  const renderGridItem = (item: typeof searchResults[0]) => (
    <View key={item.id} style={styles.gridItem}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Heart 
            size={18} 
            color={item.isFavorite ? '#ef4444' : '#64748b'} 
            fill={item.isFavorite ? '#ef4444' : 'transparent'}
          />
        </TouchableOpacity>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>-{item.discount}</Text>
        </View>
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.merchantName}>{item.merchant}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={12} color="#fbbf24" fill="#fbbf24" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews})</Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>${item.originalPrice}</Text>
          <Text style={styles.currentPrice}>${item.price}</Text>
        </View>
        
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => addToCart(item.id)}
        >
          <ShoppingCart size={14} color="#fff" />
          <Text style={styles.addToCartText}>أضف للسلة</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderListItem = (item: typeof searchResults[0]) => (
    <View key={item.id} style={styles.listItem}>
      <View style={styles.listImageContainer}>
        <Image source={{ uri: item.image }} style={styles.listProductImage} />
        <View style={styles.listDiscountBadge}>
          <Text style={styles.discountText}>-{item.discount}</Text>
        </View>
      </View>
      
      <View style={styles.listProductInfo}>
        <Text style={styles.listProductName}>{item.name}</Text>
        <Text style={styles.listMerchantName}>{item.merchant}</Text>
        
        <View style={styles.listRatingContainer}>
          <Star size={14} color="#fbbf24" fill="#fbbf24" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews} تقييم)</Text>
        </View>
        
        <View style={styles.listPriceContainer}>
          <Text style={styles.originalPrice}>${item.originalPrice}</Text>
          <Text style={styles.currentPrice}>${item.price}</Text>
        </View>
      </View>
      
      <View style={styles.listActions}>
        <TouchableOpacity
          style={styles.listFavoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Heart 
            size={18} 
            color={item.isFavorite ? '#ef4444' : '#64748b'} 
            fill={item.isFavorite ? '#ef4444' : 'transparent'}
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.listAddToCartButton}
          onPress={() => addToCart(item.id)}
        >
          <ShoppingCart size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#dc2626', '#ef4444']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>البحث والاستكشاف</Text>
        
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#dc2626" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث عن المنتجات..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={handleSearch}
            textAlign="right"
          />
          <View style={styles.searchIcon}>
            <Search size={20} color="#64748b" />
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {searchQuery === '' ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>التصنيفات الشائعة</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryChip,
                      selectedCategory === category.id && styles.selectedCategoryChip
                    ]}
                    onPress={() => setSelectedCategory(
                      selectedCategory === category.id ? null : category.id
                    )}
                  >
                    <Text style={[
                      styles.categoryChipText,
                      selectedCategory === category.id && styles.selectedCategoryChipText
                    ]}>
                      {category.name}
                    </Text>
                    <Text style={[
                      styles.categoryCount,
                      selectedCategory === category.id && styles.selectedCategoryCount
                    ]}>
                      {category.count}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <TrendingUp size={20} color="#f59e0b" />
                <Text style={styles.sectionTitle}>البحث الشائع</Text>
              </View>
              <View style={styles.tagsContainer}>
                {trendingSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.trendingTag}
                    onPress={() => handleSearch(search)}
                  >
                    <Text style={styles.trendingTagText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Clock size={20} color="#64748b" />
                <Text style={styles.sectionTitle}>البحث الأخير</Text>
              </View>
              <View style={styles.recentSearches}>
                {recentSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.recentSearchItem}
                    onPress={() => handleSearch(search)}
                  >
                    <Text style={styles.recentSearchText}>{search}</Text>
                    <Clock size={14} color="#94a3b8" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsCount}>
                {searchResults.length} نتيجة لـ "{searchQuery}"
              </Text>
              
              <View style={styles.resultsActions}>
                <TouchableOpacity style={styles.sortButton}>
                  <SlidersHorizontal size={18} color="#64748b" />
                  <Text style={styles.sortButtonText}>ترتيب</Text>
                </TouchableOpacity>
                
                <View style={styles.viewModeContainer}>
                  <TouchableOpacity
                    style={[styles.viewModeButton, viewMode === 'grid' && styles.activeViewMode]}
                    onPress={() => setViewMode('grid')}
                  >
                    <Grid3X3 size={16} color={viewMode === 'grid' ? '#dc2626' : '#64748b'} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.viewModeButton, viewMode === 'list' && styles.activeViewMode]}
                    onPress={() => setViewMode('list')}
                  >
                    <List size={16} color={viewMode === 'list' ? '#dc2626' : '#64748b'} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
              {searchResults.map(item => 
                viewMode === 'grid' ? renderGridItem(item) : renderListItem(item)
              )}
            </View>
          </>
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
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginLeft: 8,
  },
  categoryChip: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  selectedCategoryChip: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
  },
  categoryChipText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  selectedCategoryChipText: {
    color: '#fff',
  },
  categoryCount: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
  },
  selectedCategoryCount: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  trendingTag: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  trendingTagText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#f59e0b',
  },
  recentSearches: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  recentSearchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  recentSearchText: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#374151',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultsCount: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
  },
  resultsActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sortButtonText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
    marginLeft: 4,
  },
  viewModeContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  viewModeButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeViewMode: {
    backgroundColor: '#fef2f2',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  imageContainer: {
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#ef4444',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 10,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  merchantName: {
    fontSize: 11,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginBottom: 6,
    textAlign: 'right',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 11,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
    marginLeft: 2,
    marginRight: 2,
  },
  reviewsText: {
    fontSize: 10,
    fontFamily: 'Tajawal-Regular',
    color: '#94a3b8',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  originalPrice: {
    fontSize: 11,
    fontFamily: 'Tajawal-Regular',
    color: '#94a3b8',
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  currentPrice: {
    fontSize: 14,
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
    fontSize: 11,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 4,
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  listImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  listProductImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  listDiscountBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#ef4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  listProductInfo: {
    flex: 1,
  },
  listProductName: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  listMerchantName: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginBottom: 8,
    textAlign: 'right',
  },
  listRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  listPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listFavoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  listAddToCartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
});