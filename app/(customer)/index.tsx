import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
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
  Truck
} from 'lucide-react-native';

// UI Components
import Layout from '@/components/ui/Layout';
import Header from '@/components/ui/Header';
import SearchBar from '@/components/ui/SearchBar';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import Grid from '@/components/ui/Grid';
import { colors } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function CustomerHome() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'إلكترونيات', icon: '📱', color: colors.primary[500] },
    { name: 'أزياء', icon: '👕', color: '#ec4899' },
    { name: 'منزل وحديقة', icon: '🏠', color: colors.success[500] },
    { name: 'رياضة', icon: '⚽', color: colors.warning[500] },
    { name: 'كتب', icon: '📚', color: '#8b5cf6' },
    { name: 'جمال', icon: '💄', color: colors.error[500] },
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
  ];

  const offers = [
    {
      title: 'خصم 50% على الإلكترونيات',
      subtitle: 'عرض محدود لمدة 24 ساعة',
      image: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradient: colors.customer
    },
    {
      title: 'توصيل مجاني',
      subtitle: 'على جميع الطلبات فوق $50',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradient: colors.success
    },
  ];

  const NotificationButton = () => (
    <TouchableOpacity style={{
      position: 'relative',
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Bell size={24} color="#fff" />
      <View style={{
        position: 'absolute',
        top: -2,
        right: -2,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fbbf24',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{
          fontSize: 12,
          fontFamily: 'Cairo-Bold',
          color: '#fff',
        }}>3</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <Header
        title="مرحباً بك في Fox Bazzar"
        subtitle="اكتشف أفضل المنتجات والعروض"
        gradient={colors.customer}
        rightElement={<NotificationButton />}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <MapPin size={16} color="#fff" />
          <Text style={{
            fontSize: 14,
            fontFamily: 'Tajawal-Regular',
            color: '#fff',
            marginLeft: 4,
          }}>دمشق، سوريا</Text>
        </View>
        
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="ابحث عن المنتجات..."
          onFilterPress={() => console.log('Filter')}
        />
      </Header>

      <Layout>
        {/* Offers Section */}
        <Section title="العروض الخاصة">
          <View style={{ flexDirection: 'row', gap: 16 }}>
            {offers.map((offer, index) => (
              <TouchableOpacity key={index} style={{ flex: 1 }}>
                <Card padding="none" style={{ overflow: 'hidden' }}>
                  <LinearGradient
                    colors={offer.gradient}
                    style={{
                      flexDirection: 'row',
                      padding: 20,
                      alignItems: 'center',
                      minHeight: 120,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={{
                        fontSize: 18,
                        fontFamily: 'Cairo-Bold',
                        color: '#fff',
                        marginBottom: 8,
                      }}>{offer.title}</Text>
                      <Text style={{
                        fontSize: 14,
                        fontFamily: 'Tajawal-Regular',
                        color: 'rgba(255, 255, 255, 0.9)',
                        marginBottom: 16,
                      }}>{offer.subtitle}</Text>
                      <Button
                        title="تسوق الآن"
                        onPress={() => console.log('Shop now')}
                        variant="ghost"
                        size="small"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          alignSelf: 'flex-start',
                        }}
                      />
                    </View>
                    <Image 
                      source={{ uri: offer.image }} 
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 12,
                        marginLeft: 16,
                      }}
                    />
                  </LinearGradient>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </Section>

        {/* Categories */}
        <Section title="التصنيفات">
          <Grid columns={3} spacing={12}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index}>
                <Card style={{ alignItems: 'center', minHeight: 100 }}>
                  <View style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: category.color,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 8,
                  }}>
                    <Text style={{ fontSize: 20 }}>{category.icon}</Text>
                  </View>
                  <Text style={{
                    fontSize: 12,
                    fontFamily: 'Cairo-Bold',
                    color: '#374151',
                    textAlign: 'center',
                  }}>{category.name}</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </Grid>
        </Section>

        {/* Featured Products */}
        <Section 
          title="المنتجات المميزة"
          action={
            <TouchableOpacity>
              <Text style={{
                fontSize: 14,
                fontFamily: 'Cairo-Bold',
                color: colors.customer[0],
              }}>عرض الكل</Text>
            </TouchableOpacity>
          }
        >
          <View style={{ flexDirection: 'row', gap: 16 }}>
            {featuredProducts.map((product) => (
              <View key={product.id} style={{ width: 200 }}>
                <Card padding="none" style={{ overflow: 'hidden' }}>
                  <View style={{ position: 'relative' }}>
                    <Image 
                      source={{ uri: product.image }} 
                      style={{
                        width: '100%',
                        height: 150,
                      }}
                    />
                    <TouchableOpacity style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Heart 
                        size={18} 
                        color={product.isFavorite ? '#ef4444' : '#64748b'} 
                        fill={product.isFavorite ? '#ef4444' : 'transparent'}
                      />
                    </TouchableOpacity>
                    <View style={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      backgroundColor: '#ef4444',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 8,
                    }}>
                      <Text style={{
                        fontSize: 12,
                        fontFamily: 'Cairo-Bold',
                        color: '#fff',
                      }}>-{product.discount}</Text>
                    </View>
                  </View>
                  
                  <View style={{ padding: 16 }}>
                    <Text style={{
                      fontSize: 14,
                      fontFamily: 'Cairo-Bold',
                      color: '#1e293b',
                      marginBottom: 8,
                      textAlign: 'right',
                    }}>{product.name}</Text>
                    
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      marginBottom: 8,
                    }}>
                      <Star size={14} color="#fbbf24" fill="#fbbf24" />
                      <Text style={{
                        fontSize: 12,
                        fontFamily: 'Cairo-Bold',
                        color: '#64748b',
                        marginRight: 4,
                      }}>{product.rating}</Text>
                    </View>
                    
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      marginBottom: 12,
                    }}>
                      <Text style={{
                        fontSize: 12,
                        fontFamily: 'Tajawal-Regular',
                        color: '#94a3b8',
                        textDecorationLine: 'line-through',
                        marginRight: 8,
                      }}>{product.originalPrice}</Text>
                      <Text style={{
                        fontSize: 16,
                        fontFamily: 'Cairo-Bold',
                        color: colors.customer[0],
                      }}>{product.price}</Text>
                    </View>
                    
                    <Button
                      title="أضف للسلة"
                      onPress={() => console.log('Add to cart')}
                      gradient={colors.customer}
                      size="small"
                      icon={<ShoppingCart size={14} color="#fff" />}
                    />
                  </View>
                </Card>
              </View>
            ))}
          </View>
        </Section>

        {/* Features */}
        <Card>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 8,
          }}>
            <View style={{ alignItems: 'center' }}>
              <Truck size={24} color={colors.success[500]} />
              <Text style={{
                fontSize: 12,
                fontFamily: 'Cairo-Bold',
                color: '#374151',
                marginTop: 8,
              }}>توصيل سريع</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Zap size={24} color={colors.warning[500]} />
              <Text style={{
                fontSize: 12,
                fontFamily: 'Cairo-Bold',
                color: '#374151',
                marginTop: 8,
              }}>خدمة 24/7</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Gift size={24} color="#8b5cf6" />
              <Text style={{
                fontSize: 12,
                fontFamily: 'Cairo-Bold',
                color: '#374151',
                marginTop: 8,
              }}>عروض يومية</Text>
            </View>
          </View>
        </Card>
      </Layout>
    </View>
  );
}