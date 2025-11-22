import { Tabs } from 'expo-router';
import { Home, User } from 'lucide-react-native';
import { Platform } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0F172A',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: {
          fontSize: 12.5,
          fontWeight: '600',
        },
        tabBarStyle: {
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: Platform.OS === 'ios' ? 28 : 20,
          height: 62,
          backgroundColor: 'rgba(255,255,255,0.92)',
          borderRadius: 24,
          borderWidth: 1,
          borderColor: 'rgba(15,23,42,0.06)',
          shadowColor: '#0F172A',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 5,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
