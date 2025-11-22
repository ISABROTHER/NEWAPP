import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/context/auth';
import { LogOut, User, Settings, Bell, Wifi, Moon, ChevronRight, Award, TrendingUp, AlertTriangle } from 'lucide-react-native';

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const [offlineMode, setOfflineMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.settingsBtn}>
          <Settings color="#0F172A" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'S'}</Text>
            </View>
            <View style={styles.verifiedBadge}>
               <Award size={12} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.name}>{user?.name || 'Student Name'}</Text>
          <Text style={styles.studentId}>ID: 20250001 • Computer Science</Text>
        </View>

        {/* Analytics Dashboard */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academic Performance</Text>
          
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, styles.statCardPrimary]}>
              <View style={styles.statIconCircle}>
                <TrendingUp size={20} color="#3B82F6" />
              </View>
              <Text style={styles.statValue}>85%</Text>
              <Text style={styles.statLabel}>Attendance</Text>
            </View>
            
            <View style={styles.statCard}>
               <View style={[styles.statIconCircle, { backgroundColor: '#FEF2F2' }]}>
                 <AlertTriangle size={20} color="#EF4444" />
               </View>
               <Text style={styles.statValue}>2</Text>
               <Text style={styles.statLabel}>Missed</Text>
            </View>

            <View style={styles.statCard}>
               <View style={[styles.statIconCircle, { backgroundColor: '#ECFDF5' }]}>
                 <Award size={20} color="#10B981" />
               </View>
               <Text style={styles.statValue}>3.8</Text>
               <Text style={styles.statLabel}>GPA</Text>
            </View>
          </View>
        </View>

        {/* Settings & Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.menuGroup}>
            <View style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Bell size={20} color="#64748B" />
              </View>
              <Text style={styles.menuText}>Push Notifications</Text>
              <Switch 
                value={notifications} 
                onValueChange={setNotifications}
                trackColor={{ false: '#E2E8F0', true: '#3B82F6' }}
              />
            </View>
            
            <View style={[styles.menuItem, { borderBottomWidth: 0 }]}>
              <View style={styles.menuIcon}>
                <Wifi size={20} color="#64748B" />
              </View>
              <Text style={styles.menuText}>Offline Mode</Text>
              <Switch 
                value={offlineMode} 
                onValueChange={setOfflineMode}
                trackColor={{ false: '#E2E8F0', true: '#3B82F6' }}
              />
            </View>
          </View>

          <View style={[styles.menuGroup, { marginTop: 20 }]}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <User size={20} color="#64748B" />
              </View>
              <Text style={styles.menuText}>Account Details</Text>
              <ChevronRight size={20} color="#CBD5E1" />
            </TouchableOpacity>

             <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Moon size={20} color="#64748B" />
              </View>
              <Text style={styles.menuText}>Appearance</Text>
              <ChevronRight size={20} color="#CBD5E1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => logout()}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
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
    paddingBottom: 12,
    paddingTop: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },
  settingsBtn: {
    padding: 4,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3B82F6',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F8FAFC',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  studentId: {
    fontSize: 14,
    color: '#64748B',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statCardPrimary: {
    borderWidth: 1,
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  statIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    color: '#1E293B',
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  versionText: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 20,
  },
});
