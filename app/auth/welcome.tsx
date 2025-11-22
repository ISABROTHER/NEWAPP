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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// NDC Colors
const COLORS = {
  green: '#006837', // NDC Green
  red: '#E31B23',   // NDC Red
  black: '#000000',
  white: '#FFFFFF',
  lightGreen: '#E6F4EA',
};

// Student photos (placeholders - you can replace these with TEIN specific images later)
const studentPhotos = [
  'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1588075592446-265fd1e9b4d6?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1543269865-96ae30571b5a?q=80&w=600&auto=format&fit=crop',
];

export default function Welcome() {
  const insets = useSafeAreaInsets();
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
    <View style={styles.container}>
      {/* Top gradient zone (Immersive: goes behind status bar) */}
      <Animated.View style={[styles.topZone, fadeUp(topAnim, 8)]}>
        <LinearGradient
          // NDC Green gradient to white
          colors={[COLORS.green, '#4CAF50', '#E8F5E9', '#FFFFFF']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.topGradient}
        />

        {/* Floating feature cards */}
        <Animated.View style={[styles.cardsWrap, fadeUp(cardsAnim, 10)]}>
          <View style={styles.cardsRow}>
            <View style={[styles.card, styles.cardSmall]}>
              {/* Replaced with book/education icon concept */}
              <Text style={[styles.cardIconText, { color: COLORS.green }]}>📚</Text>
              <Text style={styles.cardTitle}>Political Education</Text>
              <Text style={styles.cardMeta}>Learn & Grow</Text>
            </View>

            <View style={[styles.card, styles.cardSmall]}>
              <Text style={[styles.cardIconText, { color: COLORS.red }]}>🤝</Text>
              <Text style={styles.cardTitle}>Student Network</Text>
              <View style={styles.daysRow}>
                 {/* NDC Colors dots */}
                 <View style={[styles.dayDot, { backgroundColor: COLORS.green }]} />
                 <View style={[styles.dayDot, { backgroundColor: COLORS.white, borderWidth: 1, borderColor: '#eee' }]} />
                 <View style={[styles.dayDot, { backgroundColor: COLORS.red }]} />
                 <View style={[styles.dayDot, { backgroundColor: COLORS.black }]} />
              </View>
            </View>
          </View>

          <View style={styles.cardsRow}>
            <View style={[styles.card, styles.cardWide]}>
              <View style={[styles.cardIconSoft, { backgroundColor: COLORS.lightGreen }]}>
                <Text style={[styles.cardIconSoftText, { color: COLORS.green }]}>✓</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>News & Updates</Text>
                <Text style={styles.cardMeta}>
                  Stay informed with party activities.
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
              key={`avatar-${i}`}
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
      <Animated.View 
        style={[
          styles.bottomZone, 
          { paddingBottom: Math.max(insets.bottom, 24) }, 
          fadeUp(ctaAnim, 12)
        ]}
      >
        {/* TEIN Branding */}
        <Text style={styles.title}>TEIN Ghana</Text>
        <Text style={styles.motto}>Unity, Stability, and Development</Text>
        <Text style={styles.subtitle}>
          The Tertiary Education Institutions Network of the NDC.
        </Text>

        <Link href="/auth/sign-up" asChild>
          <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: COLORS.green }]} activeOpacity={0.9}>
            <Text style={styles.primaryBtnText}>Join TEIN</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/auth/login" asChild>
          <TouchableOpacity style={styles.loginLink} activeOpacity={0.8}>
            <Text style={styles.loginText}>Member Login</Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>
    </View>
  );
}

const CARD_RADIUS = 14;

const styles = StyleSheet.create({
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
    minHeight: 110,
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
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 13,
    color: '#6B7280',
  },
  cardIconText: {
    fontSize: 24,
    marginBottom: 8,
  },
  daysRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 12,
  },
  dayDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  cardIconSoft: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconSoftText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  avatarsWrap: {
    alignItems: 'center',
    marginBottom: 16,
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
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  motto: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E31B23', // Red for the motto
    textAlign: 'center',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#006837',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: '700',
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