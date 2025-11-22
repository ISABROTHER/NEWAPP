import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, QrCode, CheckCircle, XCircle, MapPin, Clock } from 'lucide-react-native';
import { COURSES_DATA } from '@/mocks/courses';

export default function AttendanceScreen() {
  const { courseId } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [scanning, setScanning] = useState(false);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');

  const course = COURSES_DATA.find(c => c.id === courseId);

  if (!course) return null;

  const handleScan = () => {
    setStatus('scanning');
    // Simulate scanning delay
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#0F172A" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance Check-In</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.courseCard}>
           <View style={[styles.iconCircle, { backgroundColor: course.color + '20' }]}>
             <Text style={[styles.iconText, { color: course.color }]}>{course.code.substring(0, 2)}</Text>
           </View>
           <Text style={styles.courseName}>{course.name}</Text>
           <View style={styles.metaRow}>
             <MapPin size={14} color="#64748B" />
             <Text style={styles.metaText}>{course.location}</Text>
           </View>
           <View style={styles.metaRow}>
             <Clock size={14} color="#64748B" />
             <Text style={styles.metaText}>08:30 AM - 10:30 AM</Text>
           </View>
        </View>

        <View style={styles.scannerContainer}>
          {status === 'idle' && (
            <View style={styles.idleState}>
              <View style={styles.qrPlaceholder}>
                <QrCode size={120} color="#CBD5E1" />
              </View>
              <Text style={styles.instructionText}>
                Scan the QR code projected by the lecturer or TA to mark your attendance.
              </Text>
              <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
                <QrCode size={20} color="#FFFFFF" />
                <Text style={styles.scanButtonText}>Scan QR Code</Text>
              </TouchableOpacity>
            </View>
          )}

          {status === 'scanning' && (
            <View style={styles.scanningState}>
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text style={styles.scanningText}>Verifying location & code...</Text>
            </View>
          )}

          {status === 'success' && (
            <View style={styles.successState}>
              <View style={styles.successIcon}>
                <CheckCircle size={64} color="#FFFFFF" />
              </View>
              <Text style={styles.successTitle}>Checked In!</Text>
              <Text style={styles.successText}>
                You have been marked present for today's class.
              </Text>
              <TouchableOpacity style={styles.secondaryButton} onPress={() => router.back()}>
                <Text style={styles.secondaryButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Missed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Late</Text>
          </View>
        </View>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  courseCard: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 18,
    fontWeight: '700',
  },
  courseName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#64748B',
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    marginBottom: 24,
  },
  idleState: {
    alignItems: 'center',
    width: '100%',
  },
  qrPlaceholder: {
    marginBottom: 24,
    opacity: 0.5,
  },
  instructionText: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
    gap: 10,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scanningState: {
    alignItems: 'center',
    gap: 16,
  },
  scanningText: {
    fontSize: 16,
    color: '#64748B',
  },
  successState: {
    alignItems: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  successText: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 32,
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
});
