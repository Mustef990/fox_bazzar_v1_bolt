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
import { X } from 'lucide-react-native';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  onPress: () => void;
}

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  menuItems: MenuItem[];
  gradientColors: string[];
}

export default function SideMenu({
  visible,
  onClose,
  title,
  subtitle,
  menuItems,
  gradientColors
}: SideMenuProps) {
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
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => {
                  item.onPress();
                  onClose();
                }}
              >
                <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                  <item.icon size={20} color="#fff" />
                </View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#f8fafc',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    flex: 1,
    textAlign: 'right',
  },
});