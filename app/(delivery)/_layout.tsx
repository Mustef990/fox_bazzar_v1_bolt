import { Tabs } from 'expo-router';
import { Truck, Package, MapPin, Settings } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function TabBarIcon({ icon: Icon, color, focused, label }: any) {
  return (
    <View style={styles.tabItem}>
      {focused && (
        <LinearGradient
          colors={['rgba(124, 58, 237, 0.1)', 'rgba(168, 85, 247, 0.1)']}
          style={styles.activeBackground}
        />
      )}
      <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
        <Icon size={focused ? 26 : 22} color={color} strokeWidth={focused ? 2.5 : 2} />
      </View>
      <Text style={[styles.tabLabel, { color }, focused && styles.activeTabLabel]}>
        {label}
      </Text>
      {focused && <View style={styles.activeIndicator} />}
    </View>
  );
}

export default function DeliveryLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 25,
          paddingTop: 10,
          paddingHorizontal: 10,
          elevation: 20,
          shadowColor: '#7c3aed',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          position: 'absolute',
        },
        tabBarActiveTintColor: '#7c3aed',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarShowLabel: false,
        tabBarItemStyle: {
          borderRadius: 15,
          marginHorizontal: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              icon={Truck} 
              color={color} 
              focused={focused} 
              label="الرئيسية"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              icon={Package} 
              color={color} 
              focused={focused} 
              label="الطلبات"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              icon={MapPin} 
              color={color} 
              focused={focused} 
              label="الخريطة"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              icon={Settings} 
              color={color} 
              focused={focused} 
              label="الإعدادات"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    minWidth: 70,
  },
  activeBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 15,
  },
  iconContainer: {
    marginBottom: 4,
    transform: [{ scale: 1 }],
  },
  activeIconContainer: {
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: 11,
    fontFamily: 'Cairo-Bold',
    textAlign: 'center',
  },
  activeTabLabel: {
    fontSize: 12,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 30,
    height: 3,
    backgroundColor: '#7c3aed',
    borderRadius: 2,
  },
});