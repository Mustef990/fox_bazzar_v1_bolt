import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, ChevronDown } from 'lucide-react-native';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  onPress: () => void;
}

interface MenuSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  items: MenuItem[];
}

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  menuSections: MenuSection[];
  gradientColors: string[];
}

export default function SideMenu({
  visible,
  onClose,
  title,
  subtitle,
  menuSections,
  gradientColors
}: SideMenuProps) {
  const [expandedSections, setExpandedSections] = React.useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
        
        <View style={styles.menuContainer}>
          <LinearGradient
            colors={gradientColors}
            style={styles.menuHeader}
          >
            <View style={styles.headerContent}>
              <Text style={styles.menuTitle}>{title}</Text>
              <Text style={styles.menuSubtitle}>{subtitle}</Text>
            </View>
            
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
          
          <ScrollView style={styles.menuBody} showsVerticalScrollIndicator={false}>
            {menuSections.map((section) => {
              const isExpanded = expandedSections.includes(section.id);
              
              return (
                <View key={section.id} style={styles.sectionContainer}>
                  <TouchableOpacity
                    style={styles.sectionHeader}
                    onPress={() => toggleSection(section.id)}
                  >
                    <View style={styles.sectionLeft}>
                      <View style={[styles.sectionIcon, { backgroundColor: section.color }]}>
                        <section.icon size={20} color="#fff" />
                      </View>
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                    </View>
                    
                    <View style={[
                      styles.expandIcon,
                      isExpanded && styles.expandIconRotated
                    ]}>
                      <ChevronDown size={20} color="#64748b" />
                    </View>
                  </TouchableOpacity>
                  
                  {isExpanded && (
                    <View style={styles.sectionItems}>
                      {section.items.map((item) => (
                        <TouchableOpacity
                          key={item.id}
                          style={styles.menuItem}
                          onPress={() => {
                            item.onPress();
                            onClose();
                          }}
                        >
                          <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                            <item.icon size={18} color="#fff" />
                          </View>
                          <Text style={styles.menuItemText}>{item.title}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    textAlign: 'right',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'right',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuBody: {
    padding: 20,
  },
  sectionContainer: {
    marginBottom: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    flex: 1,
    textAlign: 'right',
  },
  expandIcon: {
    transform: [{ rotate: '0deg' }],
    transition: 'transform 0.3s ease',
  },
  expandIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  sectionItems: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
    backgroundColor: '#fff',
    marginLeft: 20,
  },
  menuIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#374151',
    flex: 1,
    textAlign: 'right',
  },
});