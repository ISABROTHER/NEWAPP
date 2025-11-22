import { Link } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Keep official brand colors available, but use them subtly
const BRAND_RED = "#D71920";
const BRAND_BLACK = "#000000";
const BRAND_WHITE = "#FFFFFF";

// Official umbrella logo (identity, not loud politics)
const LOGO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Logo_of_the_National_Democratic_Congress_%28Ghana%29.svg/2560px-Logo_of_the_National_Democratic_Congress_%28Ghana%29.svg.png";

export default function Welcome() {
  const insets = useSafeAreaInsets();

  // Simple premium entrance
  const fade = useRef(new Animated.Value(0)).current;
  const lift = useRef(new Animated.Value(10)).current;

  // Subtle float for life (not flashy)
  const floatY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(lift, {
        toValue: 0,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, {
          toValue: -3,
          duration: 1600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatY, {
          toValue: 0,
          duration: 1600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fade, lift, floatY]);

  return (
    <View style={styles.container}>
      <View style={[styles.safe, { paddingTop: Math.max(insets.top, 24) }]}>
        <Animated.View
          style={[
            styles.center,
            { opacity: fade, transform: [{ translateY: lift }] },
          ]}
        >
          {/* Logo is kept but styled neutral */}
          <Animated.View style={{ transform: [{ translateY: floatY }] }}>
            <View style={styles.logoWrap}>
              <Image
                source={{ uri: LOGO_URL }}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </Animated.View>

          {/* Student-first copy (no politics tone) */}
          <Text style={styles.title}>TEIN Ghana</Text>
          <Text style={styles.subtitle}>
            A campus community for students to connect, organize, and grow as leaders.
          </Text>
        </Animated.View>

        {/* CTAs */}
        <Animated.View
          style={[
            styles.ctaWrap,
            {
              paddingBottom: Math.max(insets.bottom, 22),
              opacity: fade,
              transform: [{ translateY: lift }],
            },
          ]}
        >
          <Link href="/auth/sign-up" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.primaryBtn,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.primaryBtnText}>Get Started</Text>
            </Pressable>
          </Link>

          <Link href="/auth/login" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.secondaryBtn,
                pressed && styles.pressedSecondary,
              ]}
            >
              <Text style={styles.secondaryBtnText}>Sign In</Text>
            </Pressable>
          </Link>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BRAND_WHITE },

  safe: { flex: 1, paddingHorizontal: 24 },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  logoWrap: {
    width: 110,
    height: 110,
    borderRadius: 20,
    backgroundColor: BRAND_WHITE,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    shadowColor: BRAND_BLACK,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 18,
  },
  logo: { width: "100%", height: "100%" },

  title: {
    fontSize: Math.min(34, width * 0.09),
    fontWeight: "900",
    color: BRAND_BLACK,
    letterSpacing: 0.4,
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15.8,
    fontWeight: "600",
    color: "rgba(0,0,0,0.65)",
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 520,
    paddingHorizontal: 6,
  },

  ctaWrap: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },

  primaryBtn: {
    width: "100%",
    maxWidth: 380,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: BRAND_RED, // subtle brand touch only here
    shadowColor: BRAND_RED,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.20,
    shadowRadius: 12,
    elevation: 3,
  },
  primaryBtnText: {
    color: BRAND_WHITE,
    fontSize: 16.5,
    fontWeight: "900",
    letterSpacing: 0.2,
  },

  secondaryBtn: {
    width: "100%",
    maxWidth: 380,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: BRAND_WHITE,
    borderWidth: 1.4,
    borderColor: "rgba(0,0,0,0.10)",
  },
  secondaryBtnText: {
    color: BRAND_BLACK,
    fontSize: 15.5,
    fontWeight: "800",
  },

  pressed: { transform: [{ scale: 0.985 }], opacity: 0.95 },
  pressedSecondary: { transform: [{ scale: 0.99 }], opacity: 0.9 },
});
