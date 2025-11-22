import { Link } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Safe, high-quality student image (remote)
const STUDENT_IMAGE =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop';

export default function Welcome() {
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroTranslate = useRef(new Animated.Value(8)).current;

  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(12)).current;

  const ctaOpacity = useRef(new Animated.Value(0)).current;
  const ctaTranslate = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(heroOpacity, {
          toValue: 1,
          duration: 650,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(heroTranslate, {
          toValue: 0,
          duration: 650,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 520,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(textTranslate, {
          toValue: 0,
          duration: 520,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(ctaOpacity, {
          toValue: 1,
          duration: 520,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(ctaTranslate, {
          toValue: 0,
          duration: 520,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [heroOpacity, heroTranslate, textOpacity, textTranslate, ctaOpacity, ctaTranslate]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* Hero Image */}
        <Animated.View
          style={[
            styles.heroWrap,
            {
              opacity: heroOpacity,
              transform: [{ translateY: heroTranslate }],
            },
          ]}
        >
          <Image source={{ uri: STUDENT_IMAGE }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>For Students</Text>
          </View>
        </Animated.View>

        {/* Text */}
        <Animated.View
          style={{
            opacity: textOpacity,
            transform: [{ translateY: textTranslate }],
          }}
        >
          <Text style={styles.title}>Welcome to Rork</Text>
          <Text style={styles.subtitle}>
            Learn smarter, connect faster, and build your future with confidence.
          </Text>

          <View style={styles.pillsRow}>
            <View style={styles.pill}><Text style={styles.pillText}>Study</Text></View>
            <View style={styles.pill}><Text style={styles.pillText}>Collaborate</Text></View>
            <View style={styles.pill}><Text style={styles.pillText}>Grow</Text></View>
          </View>
        </Animated.View>

        {/* CTAs (same functions only) */}
        <Animated.View
          style={[
            styles.footer,
            {
              opacity: ctaOpacity,
              transform: [{ translateY: ctaTranslate }],
            },
          ]}
        >
          <Link href="/auth/sign-up" asChild>
            <TouchableOpacity style={styles.buttonPrimary} activeOpacity={0.9}>
              <Text style={styles.buttonPrimaryText}>Sign Up</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/auth/login" asChild>
            <TouchableOpacity style={styles.buttonSecondary} activeOpacity={0.9}>
              <Text style={styles.buttonSecondaryText}>Log In</Text>
            </TouchableOpacity>
          </Link>

          <Text style={styles.legal}>
            By continuing, you agree to our Terms & Privacy Policy.
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 8 : 12,
    paddingBottom: 18,
    gap: 14,
  },

  heroWrap: {
    width: '100%',
    height: width * 0.68,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  heroBadge: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  heroBadgeText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  title: {
    marginTop: 6,
    fontSize: 34,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.2,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16.5,
    color: '#475569',
    lineHeight: 23,
    maxWidth: 330,
  },

  pillsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  pill: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  pillText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '700',
  },

  footer: {
    marginTop: 'auto',
    gap: 12,
  },
  buttonPrimary: {
    backgroundColor: '#2563EB', // modern academic blue
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#10B981', // fresh teal/green accent
  },
  buttonSecondaryText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
  },

  legal: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 16,
  },
});
