import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Welcome() {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <LinearGradient
        colors={['#0A0A0A', '#111111', '#000000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {/* soft glow blobs */}
        <View style={[styles.blob, styles.blobTop]} />
        <View style={[styles.blob, styles.blobBottom]} />

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.logoWrap}>
              <Text style={styles.logoText}>R</Text>
            </View>

            <Text style={styles.title}>Rork</Text>
            <Text style={styles.subtitle}>
              Build better apps, faster.
            </Text>

            <View style={styles.badges}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Fast</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Secure</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Beautiful</Text>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Link href="/auth/login" asChild>
              <TouchableOpacity activeOpacity={0.9} style={styles.buttonPrimary}>
                <Text style={styles.buttonPrimaryText}>Log In</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/auth/sign-up" asChild>
              <TouchableOpacity activeOpacity={0.9} style={styles.buttonSecondary}>
                <Text style={styles.buttonSecondaryText}>Sign Up</Text>
              </TouchableOpacity>
            </Link>

            <Text style={styles.legal}>
              By continuing, you agree to our Terms & Privacy Policy.
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 18,
  },

  // blobs
  blob: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 999,
    opacity: 0.25,
    backgroundColor: '#FFFFFF',
  },
  blobTop: {
    top: -140,
    right: -120,
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    opacity: 0.12,
  },
  blobBottom: {
    bottom: -160,
    left: -120,
    opacity: 0.08,
  },

  header: {
    marginTop: 56,
    alignItems: 'center',
  },

  logoWrap: {
    width: 84,
    height: 84,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },

  title: {
    fontSize: 44,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    color: 'rgba(255,255,255,0.72)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 260,
  },

  badges: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  badgeText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  footer: {
    gap: 12,
    marginBottom: 14,
  },
  buttonPrimary: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  buttonPrimaryText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  buttonSecondary: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  buttonSecondaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  legal: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 12,
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 16,
  },
});
