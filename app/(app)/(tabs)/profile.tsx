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
          <Settings color="#0F172A" size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarRing}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'S'}</Text>
                </View>
              </View>
              <View style={styles.verifiedBadge}>
                <Award size={12} color="#FFFFFF" />
              </View>
            </View>

            <Text style={styles.name}>{user?.name || 'Student Name'}</Text>
            <Text style={styles.studentId}>ID: 20250001 • Computer Science</Text>
          </View>
        </View>

        {/* Analytics Dashboard */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academic Performance</Text>

          <View style={styles.statsGrid}>
            <View style={[styles.statCard, styles.statCardPrimary]}>
              <View style={[styles.statIconCircle, styles.statIconCirclePrimary]}>
                <TrendingUp size={20} color="#0EA5E9" />
              </View>
              <Text style={styles.statValue}>85%</Text>
              <Text style={styles.statLabel}>Attendance</Text>
              <Text style={styles.statHint}>Great consistency</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIconCircle, { backgroundColor: '#FEF2F2' }]}>
                <AlertTriangle size={20} color="#EF4444" />
              </View>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Missed</Text>
              <Text style={styles.statHint}>This semester</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIconCircle, { backgroundColor: '#ECFDF5' }]}>
                <Award size={20} color="#10B981" />
              </View>
              <Text style={styles.statValue}>3.8</Text>
              <Text style={styles.statLabel}>GPA</Text>
              <Text style={styles.statHint}>On track</Text>
            </View>
          </View>
        </View>

        {/* Settings & Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.menuGroup}>
            <View style={styles.menuItem}>
              <View style={styles.menuIconWrap}>
                <Bell size={18} color="#475569" />
              </View>
              <Text style={styles.menuText}>Push Notifications</Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#E2E8F0', true: '#0EA5E9' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E2E8F0"
              />
            </View>

            <View style={[styles.menuItem, { borderBottomWidth: 0 }]}>
              <View style={styles.menuIconWrap}>
                <Wifi size={18} color="#475569" />
              </View>
              <Text style={styles.menuText}>Offline Mode</Text>
              <Switch
                value={offlineMode}
                onValueChange={setOfflineMode}
                trackColor={{ false: '#E2E8F0', true: '#0EA5E9' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E2E8F0"
              />
            </View>
          </View>

          <View style={[styles.menuGroup, { marginTop: 16 }]}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconWrap}>
                <User size={18} color="#475569" />
              </View>
              <Text style={styles.menuText}>Account Details</Text>
              <ChevronRight size={20} color="#CBD5E1" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconWrap}>
                <Moon size={18} color="#475569" />
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
    backgroundColor: '#F1F5F9',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#F1F5F9',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.2,
  },
  settingsBtn: {
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  profileHeader: {
    marginBottom: 22,
    marginTop: 14,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#0EA5E9',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  studentId: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },

  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
    letterSpacing: 0.2,
  },

  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statCardPrimary: {
    borderColor: '#0EA5E9',
    backgroundColor: '#F0F9FF',
  },

  statIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statIconCirclePrimary: {
    backgroundColor: '#FFFFFF',
  },

  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 0,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
  },
  statHint: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 4,
  },

  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '600',
  },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF1F2',
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 22,
    gap: 8,
    borderWidth: 1,
    borderColor: '#FFE4E6',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444',
  },

  versionText: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 20,
    fontWeight: '500',
  },
});
