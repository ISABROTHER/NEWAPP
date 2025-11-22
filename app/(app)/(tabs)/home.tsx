import { useAuth } from '@/context/auth';
import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerWrapper}>
        <LinearGradient
          colors={['#3B82F6', '#93C5FD', '#FFFFFF']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.headerGradient}
        />

        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Hello, {user?.name || 'User'}</Text>
          <Text style={styles.subtitle}>Welcome to your dashboard</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Card 1 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Getting Started</Text>
          <Text style={styles.cardText}>
            This is your simple authenticated dashboard. Start building your features here.
          </Text>
        </View>

        {/* Stats section */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Tasks</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_RADIUS = 18;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  headerWrapper: {
    height: 160,
    position: 'relative',
  },

  headerGradient: {
    ...StyleSheet.absoluteFillObject,
  },

  headerContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },

  greeting: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.2,
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 15.5,
    color: '#475569',
  },

  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 18,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: CARD_RADIUS,
    padding: 22,
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.04)',
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },

  cardText: {
    fontSize: 15.5,
    color: '#475569',
    lineHeight: 22,
  },

  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: CARD_RADIUS,
    paddingVertical: 26,
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.04)',
  },

  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
});
