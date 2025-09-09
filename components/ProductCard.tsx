import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Star, Heart, ShoppingCart } from 'lucide-react-native';
import { Product } from '@/types/database';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
}

export default function ProductCard({ 
  product, 
  onPress, 
  onAddToCart, 
  onToggleFavorite,
  isFavorite = false 
}: ProductCardProps) {
  const discount = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ 
            uri: product.image_url || 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=300'
          }} 
          style={styles.productImage} 
        />
        
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onToggleFavorite}
        >
          <Heart 
            size={18} 
            color={isFavorite ? '#ef4444' : '#64748b'} 
            fill={isFavorite ? '#ef4444' : 'transparent'}
          />
        </TouchableOpacity>
        
        {discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discount}%</Text>
          </View>
        )}
        
        {product.stock === 0 && (
          <View style={styles.outOfStockOverlay}>
            <Text style={styles.outOfStockText}>نفد المخزون</Text>
          </View>
        )}
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={12} color="#fbbf24" fill="#fbbf24" />
          <Text style={styles.ratingText}>{product.rating || 0}</Text>
          <Text style={styles.reviewsText}>({product.reviews_count})</Text>
        </View>
        
        <View style={styles.priceContainer}>
          {product.original_price && (
            <Text style={styles.originalPrice}>${product.original_price}</Text>
          )}
          <Text style={styles.currentPrice}>${product.price}</Text>
        </View>
        
        <TouchableOpacity
          style={[styles.addToCartButton, product.stock === 0 && styles.disabledButton]}
          onPress={onAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingCart size={14} color={product.stock === 0 ? "#94a3b8" : "#fff"} />
          <Text style={[
            styles.addToCartText,
            product.stock === 0 && styles.disabledText
          ]}>
            {product.stock === 0 ? 'نفد المخزون' : 'أضف للسلة'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
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
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc2626',
    paddingVertical: 8,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#e2e8f0',
  },
  addToCartText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 4,
  },
  disabledText: {
    color: '#94a3b8',
  },
});