import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell, Search } from 'lucide-react-native';

export default function Home() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning,</Text>
          <Text style={styles.name}>Student</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Search color="#1E293B" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Bell color="#1E293B" size={24} />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Today's Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today&apos;s Classes</Text>
          <View style={styles.card}>
             <Text style={styles.emptyText}>No classes today</Text>
          </View>
        </View>

        {/* Announcements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Announcements</Text>
          <View style={styles.announcementCard}>
             <Text style={styles.announcementTitle}>Welcome to the new semester!</Text>
             <Text style={styles.announcementBody}>Check your timetable for updates.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  name: {
    fontSize: 24,
    color: '#0F172A',
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Space for tab bar
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 15,
  },
  announcementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  announcementBody: {
    fontSize: 14,
    color: '#64748B',
  },
});
