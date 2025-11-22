import { Tabs } from 'expo-router';
import { Home, User, Calendar, BookOpen, MessageSquare } from 'lucide-react-native';
import { Platform } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0F172A',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: 4,
        },
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: Platform.OS === 'ios' ? 24 : 16,
          height: 68,
          backgroundColor: 'rgba(255,255,255,0.96)',
          borderRadius: 34,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,1)',
          shadowColor: '#0F172A',
          shadowOpacity: 0.08,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
          elevation: 8,
          paddingBottom: 4, // Adjusted for floating look
          paddingTop: 8,
        },
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={24} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="timetable"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, size }) => <Calendar color={color} size={24} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={24} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => <MessageSquare color={color} size={24} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={24} strokeWidth={2.5} />,
        }}
      />
    </Tabs>
  );
}
