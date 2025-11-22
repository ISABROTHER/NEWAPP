import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Welcome() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Rork</Text>
          <Text style={styles.subtitle}>
            Build better apps, faster.
          </Text>
        </View>

        <View style={styles.footer}>
          <Link href="/auth/login" asChild>
            <TouchableOpacity style={styles.buttonPrimary} activeOpacity={0.85}>
              <Text style={styles.buttonPrimaryText}>Log In</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/auth/sign-up" asChild>
            <TouchableOpacity style={styles.buttonSecondary} activeOpacity={0.85}>
              <Text style={styles.buttonSecondaryText}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 80 : 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 280,
  },
  footer: {
    gap: 16,
    marginBottom: 40,
  },
  buttonPrimary: {
    backgroundColor: '#0066FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00C9A7',
  },
  buttonSecondaryText: {
    color: '#00C9A7',
    fontSize: 16,
    fontWeight: '600',
  },
});
