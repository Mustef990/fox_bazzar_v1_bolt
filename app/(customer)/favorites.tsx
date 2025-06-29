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
import { Heart, Star, ShoppingCart, Share2, Filter, Grid3x3 as Grid3X3, List } from 'lucide-react-native';

export default function FavoritesScreen() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState([
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
      inStock: false
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
      inStock: true
    },
  ]);

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const addToCart = (id: number) => {
    console.log('Add to cart:', id);
  };

  const shareProduct = (id: number) => {
    console.log('Share product:', id);
  };

  const renderGridItem = (item: typeof favorites[0]) => (
    <View key={item.id} style={styles.gridItem}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => removeFavorite(item.id)}
        >
          <Heart size={20} color="#ef4444" fill="#ef4444" />
        </TouchableOpacity>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>-{item.discount}</Text>
        </View>
        {!item.inStock && (
          <View style={styles.outOfStockOverlay}>
            <Text style={styles.outOfStockText}>نفد المخزون</Text>
          </View>
        )}
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
        
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, !item.inStock && styles.disabledButton]}
            onPress={() => addToCart(item.id)}
            disabled={!item.inStock}
          >
            <ShoppingCart size={14} color={item.inStock ? "#fff" : "#94a3b8"} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => shareProduct(item.id)}
          >
            <Share2 size={14} color="#64748b" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderListItem = (item: typeof favorites[0]) => (
    <View key={item.id} style={styles.listItem}>
      <View style={styles.listImageContainer}>
        <Image source={{ uri: item.image }} style={styles.listProductImage} />
        <View style={styles.listDiscountBadge}>
          <Text style={styles.discountText}>-{item.discount}</Text>
        </View>
        {!item.inStock && (
          <View style={styles.listOutOfStockOverlay}>
            <Text style={styles.outOfStockText}>نفد</Text>
          </View>
        )}
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
          onPress={() => removeFavorite(item.id)}
        >
          <Heart size={20} color="#ef4444" fill="#ef4444" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.listActionButton, !item.inStock && styles.disabledButton]}
          onPress={() => addToCart(item.id)}
          disabled={!item.inStock}
        >
          <ShoppingCart size={16} color={item.inStock ? "#fff" : "#94a3b8"} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.listShareButton}
          onPress={() => shareProduct(item.id)}
        >
          <Share2 size={16} color="#64748b" />
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
        <Text style={styles.headerTitle}>المفضلة</Text>
        <Text style={styles.headerSubtitle}>
          {favorites.length} منتج في المفضلة
        </Text>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.viewModeContainer}>
            <TouchableOpacity
              style={[styles.viewModeButton, viewMode === 'grid' && styles.activeViewMode]}
              onPress={() => setViewMode('grid')}
            >
              <Grid3X3 size={18} color={viewMode === 'grid' ? '#dc2626' : '#fff'} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.viewModeButton, viewMode === 'list' && styles.activeViewMode]}
              onPress={() => setViewMode('list')}
            >
              <List size={18} color={viewMode === 'list' ? '#dc2626' : '#fff'} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {favorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Heart size={64} color="#94a3b8" />
            <Text style={styles.emptyStateTitle}>لا توجد مفضلة</Text>
            <Text style={styles.emptyStateText}>
              ابدأ بإضافة منتجات إلى قائمة المفضلة
            </Text>
          </View>
        ) : (
          <View style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
            {favorites.map(item => 
              viewMode === 'grid' ? renderGridItem(item) : renderListItem(item)
            )}
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
    marginBottom: 20,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewModeContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 4,
  },
  viewModeButton: {
    width: 36,
    height: 36,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeViewMode: {
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    textAlign: 'center',
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
  outOfStockOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  outOfStockText: {
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
    marginBottom: 4,
    textAlign: 'right',
  },
  merchantName: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
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
    marginLeft: 4,
    marginRight: 4,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#dc2626',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  disabledButton: {
    backgroundColor: '#e2e8f0',
  },
  shareButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
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
  listOutOfStockOverlay: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 4,
    alignItems: 'center',
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
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  listActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  listShareButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
});