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
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Package, Plus, Search, Filter, CreditCard as Edit, Trash2, Eye, X, Camera, DollarSign, Tag, ChartBar as BarChart3 } from 'lucide-react-native';

export default function MerchantProductsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [addProductModalVisible, setAddProductModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    sku: ''
  });

  const categories = [
    { id: 'all', name: 'الكل', count: 156 },
    { id: 'electronics', name: 'إلكترونيات', count: 45 },
    { id: 'fashion', name: 'أزياء', count: 32 },
    { id: 'home', name: 'منزل', count: 28 },
    { id: 'sports', name: 'رياضة', count: 25 },
    { id: 'books', name: 'كتب', count: 26 },
  ];

  const products = [
    {
      id: 1,
      name: 'هاتف ذكي متطور',
      description: 'هاتف ذكي بمواصفات عالية وكاميرا متقدمة',
      price: 599,
      originalPrice: 699,
      category: 'إلكترونيات',
      stock: 25,
      sold: 45,
      rating: 4.8,
      reviews: 124,
      image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'active',
      sku: 'PHONE001'
    },
    {
      id: 2,
      name: 'لابتوب عالي الأداء',
      description: 'لابتوب للألعاب والعمل المهني',
      price: 1299,
      originalPrice: 1499,
      category: 'إلكترونيات',
      stock: 12,
      sold: 23,
      rating: 4.9,
      reviews: 89,
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300',
      status: 'active',
      sku: 'LAPTOP001'
    },
    {
      id: 3,
      name: 'ساعة ذكية رياضية',
      description: 'ساعة ذكية لتتبع اللياقة البدنية',
      price: 299,
      originalPrice: 399,
      category: 'رياضة',
      stock: 0,
      sold: 67,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'out_of_stock',
      sku: 'WATCH001'
    },
  ];

  const handleAddProduct = () => {
    if (!productData.name || !productData.price || !productData.category) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    Alert.alert(
      'تأكيد الإضافة',
      'هل تريد إضافة هذا المنتج؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'إضافة', 
          onPress: () => {
            setAddProductModalVisible(false);
            setProductData({ name: '', description: '', price: '', category: '', stock: '', sku: '' });
            Alert.alert('تم بنجاح', 'تم إضافة المنتج بنجاح');
          }
        }
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#059669';
      case 'out_of_stock': return '#ef4444';
      case 'draft': return '#f59e0b';
      default: return '#64748b';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'out_of_stock': return 'نفد المخزون';
      case 'draft': return 'مسودة';
      default: return 'غير معروف';
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === categories.find(c => c.id === selectedCategory)?.name;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#059669', '#10b981']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>إدارة المنتجات</Text>
        <Text style={styles.headerSubtitle}>
          إضافة وتعديل منتجات متجرك
        </Text>
        
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#059669" />
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
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setAddProductModalVisible(true)}
        >
          <Plus size={20} color="#fff" />
          <Text style={styles.addButtonText}>إضافة منتج جديد</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.activeCategoryChip
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryChipText,
                selectedCategory === category.id && styles.activeCategoryChipText
              ]}>
                {category.name}
              </Text>
              <View style={[
                styles.categoryCount,
                selectedCategory === category.id && styles.activeCategoryCount
              ]}>
                <Text style={[
                  styles.categoryCountText,
                  selectedCategory === category.id && styles.activeCategoryCountText
                ]}>
                  {category.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productHeader}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productDescription}>{product.description}</Text>
                  <Text style={styles.productSku}>SKU: {product.sku}</Text>
                  
                  <View style={styles.productMeta}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.originalPrice}>${product.originalPrice}</Text>
                      <Text style={styles.currentPrice}>${product.price}</Text>
                    </View>
                    
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(product.status) }]}>
                      <Text style={styles.statusText}>{getStatusText(product.status)}</Text>
                    </View>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.moreButton}>
                  <Edit size={20} color="#64748b" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.productStats}>
                <View style={styles.statItem}>
                  <Package size={16} color="#64748b" />
                  <Text style={styles.statValue}>{product.stock}</Text>
                  <Text style={styles.statLabel}>مخزون</Text>
                </View>
                
                <View style={styles.statItem}>
                  <BarChart3 size={16} color="#64748b" />
                  <Text style={styles.statValue}>{product.sold}</Text>
                  <Text style={styles.statLabel}>مبيع</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Eye size={16} color="#64748b" />
                  <Text style={styles.statValue}>{product.reviews}</Text>
                  <Text style={styles.statLabel}>مراجعة</Text>
                </View>
              </View>
              
              <View style={styles.productActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Eye size={16} color="#3b82f6" />
                  <Text style={[styles.actionButtonText, { color: '#3b82f6' }]}>عرض</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Edit size={16} color="#f59e0b" />
                  <Text style={[styles.actionButtonText, { color: '#f59e0b' }]}>تعديل</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Trash2 size={16} color="#ef4444" />
                  <Text style={[styles.actionButtonText, { color: '#ef4444' }]}>حذف</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <Modal
        visible={addProductModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddProductModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>إضافة منتج جديد</Text>
              <TouchableOpacity
                onPress={() => setAddProductModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#64748b" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <TouchableOpacity style={styles.imageUpload}>
                <Camera size={32} color="#64748b" />
                <Text style={styles.imageUploadText}>إضافة صورة المنتج</Text>
              </TouchableOpacity>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>اسم المنتج</Text>
                <TextInput
                  style={styles.input}
                  value={productData.name}
                  onChangeText={(text) => setProductData(prev => ({ ...prev, name: text }))}
                  placeholder="أدخل اسم المنتج"
                  placeholderTextColor="#94a3b8"
                  textAlign="right"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>وصف المنتج</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={productData.description}
                  onChangeText={(text) => setProductData(prev => ({ ...prev, description: text }))}
                  placeholder="أدخل وصف المنتج"
                  placeholderTextColor="#94a3b8"
                  multiline
                  numberOfLines={4}
                  textAlign="right"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>السعر ($)</Text>
                <TextInput
                  style={styles.input}
                  value={productData.price}
                  onChangeText={(text) => setProductData(prev => ({ ...prev, price: text }))}
                  placeholder="أدخل سعر المنتج"
                  placeholderTextColor="#94a3b8"
                  keyboardType="numeric"
                  textAlign="right"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>التصنيف</Text>
                <TextInput
                  style={styles.input}
                  value={productData.category}
                  onChangeText={(text) => setProductData(prev => ({ ...prev, category: text }))}
                  placeholder="أدخل تصنيف المنتج"
                  placeholderTextColor="#94a3b8"
                  textAlign="right"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>الكمية المتوفرة</Text>
                <TextInput
                  style={styles.input}
                  value={productData.stock}
                  onChangeText={(text) => setProductData(prev => ({ ...prev, stock: text }))}
                  placeholder="أدخل الكمية المتوفرة"
                  placeholderTextColor="#94a3b8"
                  keyboardType="numeric"
                  textAlign="right"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>رمز المنتج (SKU)</Text>
                <TextInput
                  style={styles.input}
                  value={productData.sku}
                  onChangeText={(text) => setProductData(prev => ({ ...prev, sku: text }))}
                  placeholder="أدخل رمز المنتج"
                  placeholderTextColor="#94a3b8"
                  textAlign="right"
                />
              </View>
              
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setAddProductModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>إلغاء</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleAddProduct}
                >
                  <LinearGradient
                    colors={['#059669', '#10b981']}
                    style={styles.confirmGradient}
                  >
                    <Package size={16} color="#fff" />
                    <Text style={styles.confirmButtonText}>إضافة المنتج</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  activeCategoryChip: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  categoryChipText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
    marginRight: 8,
  },
  activeCategoryChipText: {
    color: '#fff',
  },
  categoryCount: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  activeCategoryCount: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryCountText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
  },
  activeCategoryCountText: {
    color: '#fff',
  },
  productCard: {
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
  productHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  productDescription: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginBottom: 4,
    textAlign: 'right',
  },
  productSku: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#94a3b8',
    marginBottom: 8,
    textAlign: 'right',
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#059669',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginTop: 2,
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    marginLeft: 4,
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
    maxWidth: 500,
    maxHeight: '80%',
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
    fontSize: 20,
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
  imageUpload: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f8fafc',
  },
  imageUploadText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
    marginTop: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'right',
  },
  input: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    backgroundColor: '#f8fafc',
    textAlign: 'right',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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