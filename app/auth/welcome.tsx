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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Real student photos (high quality, stable Unsplash links)
const studentPhotos = [
  'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1588075592446-265fd1e9b4d6?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1543269865-96ae30571b5a?q=80&w=600&auto=format&fit=crop',
];

export default function Welcome() {
  const topAnim = useRef(new Animated.Value(0)).current;
  const cardsAnim = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(0)).current;
  const ctaAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(120, [
      Animated.timing(topAnim, {
        toValue: 1,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(cardsAnim, {
        toValue: 1,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(ctaAnim, {
        toValue: 1,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [topAnim, cardsAnim, textAnim, ctaAnim]);

  const fadeUp = (anim: Animated.Value, distance = 12) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [distance, 0],
        }),
      },
    ],
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* Top gradient zone (like sample) */}
        <Animated.View style={[styles.topZone, fadeUp(topAnim, 8)]}>
          <LinearGradient
            colors={['#3B82F6', '#93C5FD', '#EAF2FF', '#FFFFFF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.topGradient}
          />

          {/* Floating feature cards */}
          <Animated.View style={[styles.cardsWrap, fadeUp(cardsAnim, 10)]}>
            <View style={styles.cardsRow}>
              <View style={[styles.card, styles.cardSmall]}>
                <Text style={styles.cardTitle}>Track Classes</Text>
                <Text style={styles.cardMeta}>Smart timetable</Text>
              </View>

              <View style={[styles.card, styles.cardSmall]}>
                <Text style={styles.cardTitle}>Offline Notes</Text>
                <View style={styles.daysRow}>
                  {['M', 'T', 'W', 'T', 'F'].map((d, index) => (
                    <View key={`${d}-${index}`} style={styles.dayDot}>
                      <Text style={styles.dayDotText}>{d}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.cardsRow}>
              <View style={[styles.card, styles.cardWide]}>
                <View style={styles.cardIconSoft}>
                  <Text style={styles.cardIconSoftText}>✓</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>Activity Monitor</Text>
                  <Text style={styles.cardMeta}>
                    Stay consistent with your study goals.
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </Animated.View>

        {/* Avatar group */}
        <Animated.View style={[styles.avatarsWrap, fadeUp(textAnim, 10)]}>
          <View style={styles.avatarsRow}>
            {studentPhotos.slice(0, 5).map((uri, i) => (
              <View
                key={uri}
                style={[
                  styles.avatarShell,
                  { marginLeft: i === 0 ? 0 : -12, zIndex: 10 - i },
                ]}
              >
                <Image source={{ uri }} style={styles.avatar} />
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Text + CTAs */}
        <Animated.View style={[styles.bottomZone, fadeUp(ctaAnim, 12)]}>
          <Text style={styles.title}>Welcome to Rork</Text>
          <Text style={styles.subtitle}>
            Supporting students to learn smarter and stay on track.
          </Text>

          {/* Only your existing functions */}
          <Link href="/auth/sign-up" asChild>
            <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.9}>
              <Text style={styles.primaryBtnText}>Sign up</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/auth/login" asChild>
            <TouchableOpacity style={styles.loginLink} activeOpacity={0.8}>
              <Text style={styles.loginText}>Log in</Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const CARD_RADIUS = 14;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  topZone: {
    height: width * 0.9,
    position: 'relative',
    marginBottom: 20,
  },
  topGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  cardsWrap: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: CARD_RADIUS,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  cardSmall: {
    flex: 1,
    minHeight: 100,
    justifyContent: 'center',
  },
  cardWide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 13,
    color: '#6B7280',
  },
  daysRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 8,
  },
  dayDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayDotText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  cardIconSoft: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconSoftText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B82F6',
  },

  avatarsWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarsRow: {
    flexDirection: 'row',
  },
  avatarShell: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    padding: 2,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },

  bottomZone: {
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 300,
  },
  primaryBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#111827',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  loginLink: {
    padding: 12,
  },
  loginText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
});
