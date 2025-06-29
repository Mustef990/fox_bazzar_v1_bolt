import { Tabs } from 'expo-router';
import { Chrome as Home, Search, ShoppingCart, User } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function TabBarIcon({ icon: Icon, color, focused, label }: any) {
  return (
    <View style={styles.tabItem}>
      {focused && (
        <LinearGradient
          colors={['rgba(220, 38, 38, 0.1)', 'rgba(239, 68, 68, 0.1)']}
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

export default function CustomerLayout() {
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
          shadowColor: '#dc2626',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          position: 'absolute',
        },
        tabBarActiveTintColor: '#dc2626',
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
              icon={Home} 
              color={color} 
              focused={focused} 
              label="الرئيسية"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              icon={Search} 
              color={color} 
              focused={focused} 
              label="البحث"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              icon={ShoppingCart} 
              color={color} 
              focused={focused} 
              label="السلة"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              icon={User} 
              color={color} 
              focused={focused} 
              label="الملف الشخصي"
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
    backgroundColor: '#dc2626',
    borderRadius: 2,
  },
});