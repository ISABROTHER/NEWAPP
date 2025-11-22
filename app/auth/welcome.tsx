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
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Student hero image (safe, high quality)
const STUDENT_IMAGE =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop';

export default function Welcome() {
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslate = useRef(new Animated.Value(10)).current;
  const ctaOpacity = useRef(new Animated.Value(0)).current;
  const ctaTranslate = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 650,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslate, {
          toValue: 0,
          duration: 650,
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
  }, [titleOpacity, titleTranslate, ctaOpacity, ctaTranslate]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* Spotify-like collage/hero zone (but bright) */}
        <View style={styles.collageWrap} pointerEvents="none">
          {/* soft tiles behind like Spotify mosaic */}
          <View style={styles.collageRow}>
            <View style={[styles.tile, styles.tileTall, styles.t1]} />
            <View style={[styles.tile, styles.tileSquare, styles.t2]} />
            <View style={[styles.tile, styles.tileTall, styles.t3]} />
          </View>
          <View style={styles.collageRow}>
            <View style={[styles.tile, styles.tileSquare, styles.t4]} />
            <View style={[styles.tile, styles.tileWide, styles.t5]} />
          </View>

          {/* student hero image front-center */}
          <View style={styles.heroWrap}>
            <Image source={{ uri: STUDENT_IMAGE }} style={styles.heroImage} />
            <LinearGradient
              colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.18)']}
              style={styles.heroShade}
            />
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>For Students</Text>
            </View>
          </View>

          {/* fade to white like Spotify fades to black */}
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.9)', '#FFFFFF']}
            style={styles.fadeMask}
          />
        </View>

        {/* Main content */}
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.header,
              {
                opacity: titleOpacity,
                transform: [{ translateY: titleTranslate }],
              },
            ]}
          >
            <Text style={styles.title}>Millions of students.</Text>
            <Text style={styles.title}>One smart platform.</Text>
            <Text style={styles.subtitle}>
              Study better, stay organized, and move forward with confidence.
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.footer,
              {
                opacity: ctaOpacity,
                transform: [{ translateY: ctaTranslate }],
              },
            ]}
          >
            {/* ONLY your existing functions */}
            <Link href="/auth/sign-up" asChild>
              <TouchableOpacity style={styles.buttonPrimary} activeOpacity={0.9}>
                <Text style={styles.buttonPrimaryText}>Sign up free</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/auth/login" asChild>
              <TouchableOpacity style={styles.buttonSecondary} activeOpacity={0.9}>
                <Text style={styles.buttonSecondaryText}>Log in</Text>
              </TouchableOpacity>
            </Link>

            <Text style={styles.legal}>
              By continuing, you agree to our Terms & Privacy Policy.
            </Text>
          </Animated.View>
        </View>
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
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },

  collageWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 420,
    paddingTop: Platform.OS === 'ios' ? 6 : 10,
  },
  collageRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
    opacity: 0.7,
  },
  tile: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tileTall: {
    width: (width - 14 * 2 - 10 * 2) / 3,
    height: 110,
  },
  tileSquare: {
    width: (width - 14 * 2 - 10 * 2) / 3,
    height: 86,
  },
  tileWide: {
    flex: 1,
    height: 86,
  },

  // gentle modern accents (not loud)
  t1: { backgroundColor: '#EEF2FF' }, // indigo tint
  t2: { backgroundColor: '#ECFEFF' }, // cyan tint
  t3: { backgroundColor: '#F0FDF4' }, // green tint
  t4: { backgroundColor: '#FFF7ED' }, // amber tint
  t5: { backgroundColor: '#FDF2F8' }, // pink tint

  heroWrap: {
    marginTop: 6,
    marginHorizontal: 14,
    height: width * 0.62,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroShade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 140,
  },
  heroBadge: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  heroBadgeText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  fadeMask: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -8,
    height: 170,
  },

  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 22,
    paddingBottom: 24,
    gap: 18,
  },
  header: {
    gap: 8,
  },
  title: {
    color: '#0F172A',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0.2,
    lineHeight: 38,
  },
  subtitle: {
    color: '#475569',
    fontSize: 16,
    lineHeight: 22,
    marginTop: 6,
    maxWidth: 330,
  },

  footer: {
    gap: 12,
  },
  buttonPrimary: {
    backgroundColor: '#1DB954', // Spotify green vibe but on white
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#1DB954',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 999,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#0F172A',
  },
  buttonSecondaryText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
  },

  legal: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 16,
  },
});
