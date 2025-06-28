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
import { Megaphone, Gift, Clock, Target, Star, CircleCheck as CheckCircle } from 'lucide-react-native';
import TaskCard from '@/components/TaskCard';

export default function CustomerAdsScreen() {
  const [activeTab, setActiveTab] = useState<'ads' | 'tasks'>('ads');

  const ads = [
    {
      id: 1,
      title: 'خصم 50% على الإلكترونيات',
      description: 'عرض محدود لمدة أسبوع على جميع المنتجات الإلكترونية',
      image: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: '50%',
      validUntil: '2024-01-22',
      merchant: 'متجر الإلكترونيات'
    },
    {
      id: 2,
      title: 'توصيل مجاني',
      description: 'توصيل مجاني على جميع الطلبات فوق $50',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: 'مجاني',
      validUntil: '2024-01-31',
      merchant: 'Fox Bazzar'
    },
    {
      id: 3,
      title: 'عروض الشتاء',
      description: 'تخفيضات هائلة على ملابس الشتاء والإكسسوارات',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: '30%',
      validUntil: '2024-02-15',
      merchant: 'متجر الأزياء'
    },
  ];

  const tasks = [
    {
      id: '1',
      title: 'اشتري 3 منتجات',
      description: 'قم بشراء 3 منتجات من أي متجر واحصل على مكافأة',
      reward: '$10',
      deadline: 'ينتهي في 3 أيام',
      progress: 66,
      type: 'daily' as const,
      completed: false
    },
    {
      id: '2',
      title: 'قيم 5 منتجات',
      description: 'قم بتقييم 5 منتجات اشتريتها مؤخراً',
      reward: '$5',
      deadline: 'ينتهي في يوم واحد',
      progress: 80,
      type: 'daily' as const,
      completed: false
    },
    {
      id: '3',
      title: 'ادع صديق',
      description: 'ادع صديقاً للانضمام إلى Fox Bazzar',
      reward: '$25',
      deadline: 'ينتهي في أسبوع',
      progress: 100,
      type: 'weekly' as const,
      completed: true
    },
    {
      id: '4',
      title: 'تسوق بقيمة $100',
      description: 'قم بالتسوق بقيمة $100 أو أكثر هذا الشهر',
      reward: '$20',
      deadline: 'ينتهي في 15 يوم',
      progress: 45,
      type: 'special' as const,
      completed: false
    },
  ];

  const handleTaskComplete = (taskId: string) => {
    console.log('Complete task:', taskId);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#dc2626', '#ef4444']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>الإعلانات والمهام</Text>
        <Text style={styles.headerSubtitle}>
          اكتشف العروض واربح المكافآت
        </Text>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'ads' && styles.activeTab]}
            onPress={() => setActiveTab('ads')}
          >
            <Megaphone size={20} color={activeTab === 'ads' ? '#dc2626' : '#fff'} />
            <Text style={[styles.tabText, activeTab === 'ads' && styles.activeTabText]}>
              الإعلانات
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'tasks' && styles.activeTab]}
            onPress={() => setActiveTab('tasks')}
          >
            <Gift size={20} color={activeTab === 'tasks' ? '#dc2626' : '#fff'} />
            <Text style={[styles.tabText, activeTab === 'tasks' && styles.activeTabText]}>
              المهام
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'ads' ? (
          <View style={styles.adsContainer}>
            {ads.map((ad) => (
              <TouchableOpacity key={ad.id} style={styles.adCard}>
                <Image source={{ uri: ad.image }} style={styles.adImage} />
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{ad.discount}</Text>
                </View>
                
                <View style={styles.adContent}>
                  <Text style={styles.adTitle}>{ad.title}</Text>
                  <Text style={styles.adDescription}>{ad.description}</Text>
                  
                  <View style={styles.adMeta}>
                    <View style={styles.merchantContainer}>
                      <Text style={styles.merchantText}>{ad.merchant}</Text>
                    </View>
                    
                    <View style={styles.validityContainer}>
                      <Clock size={14} color="#64748b" />
                      <Text style={styles.validityText}>حتى {ad.validUntil}</Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity style={styles.useOfferButton}>
                    <LinearGradient
                      colors={['#dc2626', '#ef4444']}
                      style={styles.useOfferGradient}
                    >
                      <Target size={16} color="#fff" />
                      <Text style={styles.useOfferText}>استخدم العرض</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.tasksContainer}>
            <View style={styles.tasksHeader}>
              <Text style={styles.sectionTitle}>المهام المتاحة</Text>
              <View style={styles.pointsContainer}>
                <Star size={16} color="#fbbf24" />
                <Text style={styles.pointsText}>1,250 نقطة</Text>
              </View>
            </View>
            
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={() => handleTaskComplete(task.id)}
              />
            ))}
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
    marginLeft: 8,
  },
  activeTabText: {
    color: '#dc2626',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  adsContainer: {
    marginBottom: 20,
  },
  adCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  adImage: {
    width: '100%',
    height: 200,
    position: 'relative',
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
  adContent: {
    padding: 16,
  },
  adTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'right',
  },
  adDescription: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginBottom: 16,
    textAlign: 'right',
    lineHeight: 20,
  },
  adMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  merchantContainer: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  merchantText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
  },
  validityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  validityText: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginLeft: 4,
  },
  useOfferButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  useOfferGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  useOfferText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
  tasksContainer: {
    marginBottom: 20,
  },
  tasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  pointsText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginLeft: 4,
  },
});