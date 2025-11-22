import { Link } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function Welcome() {
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslate = useRef(new Animated.Value(12)).current;
  const ctaOpacity = useRef(new Animated.Value(0)).current;
  const ctaTranslate = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslate, {
          toValue: 0,
          duration: 700,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(ctaOpacity, {
          toValue: 1,
          duration: 560,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(ctaTranslate, {
          toValue: 0,
          duration: 560,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [titleOpacity, titleTranslate, ctaOpacity, ctaTranslate]);

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={['#0A0A0A', '#0D0D0D', '#000000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {/* Collage-style backdrop (no real images, just premium tiles) */}
        <View style={styles.collageWrap} pointerEvents="none">
          <View style={styles.collageRow}>
            <View style={[styles.tile, styles.tileTall, styles.t1]} />
            <View style={[styles.tile, styles.tileSquare, styles.t2]} />
            <View style={[styles.tile, styles.tileTall, styles.t3]} />
          </View>
          <View style={styles.collageRow}>
            <View style={[styles.tile, styles.tileSquare, styles.t4]} />
            <View style={[styles.tile, styles.tileWide, styles.t5]} />
          </View>
          <View style={styles.collageRow}>
            <View style={[styles.tile, styles.tileTall, styles.t6]} />
            <View style={[styles.tile, styles.tileSquare, styles.t7]} />
            <View style={[styles.tile, styles.tileTall, styles.t8]} />
          </View>

          {/* fade mask like Spotify */}
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)', '#000']}
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
            <Text style={styles.title}>Millions of ideas.</Text>
            <Text style={styles.title}>Built with Rork.</Text>
            <Text style={styles.subtitle}>
              Start fast. Ship clean. Grow your app with confidence.
            </Text>
          </Animated.View>

          <Animated.View
            style={{
              opacity: ctaOpacity,
              transform: [{ translateY: ctaTranslate }],
              width: '100%',
            }}
          >
            {/* Keep ONLY your existing functions */}
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

  collageWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 360,
    opacity: 0.9,
    paddingTop: 16,
  },
  collageRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  tile: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  tileTall: {
    width: (width - 14 * 2 - 10 * 2) / 3,
    height: 120,
  },
  tileSquare: {
    width: (width - 14 * 2 - 10 * 2) / 3,
    height: 90,
  },
  tileWide: {
    flex: 1,
    height: 90,
  },

  // subtle color hints per tile (Spotify-ish)
  t1: { backgroundColor: 'rgba(140, 82, 255, 0.12)' },
  t2: { backgroundColor: 'rgba(0, 201, 167, 0.12)' },
  t3: { backgroundColor: 'rgba(255, 181, 71, 0.12)' },
  t4: { backgroundColor: 'rgba(0, 102, 255, 0.12)' },
  t5: { backgroundColor: 'rgba(255, 84, 84, 0.10)' },
  t6: { backgroundColor: 'rgba(255, 255, 255, 0.06)' },
  t7: { backgroundColor: 'rgba(0, 201, 167, 0.10)' },
  t8: { backgroundColor: 'rgba(140, 82, 255, 0.10)' },

  fadeMask: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -8,
    height: 160,
  },

  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 22,
    paddingBottom: 28,
    gap: 18,
  },
  header: {
    gap: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 0.2,
    lineHeight: 40,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 16,
    lineHeight: 22,
    marginTop: 6,
    maxWidth: 320,
  },

  buttonPrimary: {
    backgroundColor: '#1ED760', // Spotify green vibe
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonPrimaryText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  buttonSecondary: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingVertical: 15,
    borderRadius: 999,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    marginTop: 10,
  },
  buttonSecondaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  legal: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 12,
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 16,
  },
});
