import { Link } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Welcome() {
  // Animations
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslate = useRef(new Animated.Value(12)).current;

  const btn1Opacity = useRef(new Animated.Value(0)).current;
  const btn1Translate = useRef(new Animated.Value(16)).current;

  const btn2Opacity = useRef(new Animated.Value(0)).current;
  const btn2Translate = useRef(new Animated.Value(16)).current;

  const glowScale = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0.18)).current;

  useEffect(() => {
    // Entrance sequence
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 650,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(headerTranslate, {
          toValue: 0,
          duration: 650,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.stagger(120, [
        Animated.parallel([
          Animated.timing(btn1Opacity, {
            toValue: 1,
            duration: 520,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(btn1Translate, {
            toValue: 0,
            duration: 520,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(btn2Opacity, {
            toValue: 1,
            duration: 520,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(btn2Translate, {
            toValue: 0,
            duration: 520,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start();

    // Subtle breathing glow loop
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(glowScale, {
            toValue: 1.06,
            duration: 1800,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.28,
            duration: 1800,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(glowScale, {
            toValue: 1,
            duration: 1800,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.18,
            duration: 1800,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, [
    headerOpacity,
    headerTranslate,
    btn1Opacity,
    btn1Translate,
    btn2Opacity,
    btn2Translate,
    glowScale,
    glowOpacity,
  ]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Animated glow behind header */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.glow,
            {
              opacity: glowOpacity,
              transform: [{ scale: glowScale }],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerOpacity,
              transform: [{ translateY: headerTranslate }],
            },
          ]}
        >
          <Text style={styles.title}>Rork</Text>
          <Text style={styles.subtitle}>Build better apps, faster.</Text>
        </Animated.View>

        <View style={styles.footer}>
          {/* ✅ Link direct child is TouchableOpacity again */}
          <Link href="/auth/login" asChild>
            <TouchableOpacity style={styles.buttonPrimary} activeOpacity={0.85}>
              <Animated.View
                style={{
                  opacity: btn1Opacity,
                  transform: [{ translateY: btn1Translate }],
                }}
              >
                <Text style={styles.buttonPrimaryText}>Log In</Text>
              </Animated.View>
            </TouchableOpacity>
          </Link>

          <Link href="/auth/sign-up" asChild>
            <TouchableOpacity style={styles.buttonSecondary} activeOpacity={0.85}>
              <Animated.View
                style={{
                  opacity: btn2Opacity,
                  transform: [{ translateY: btn2Translate }],
                }}
              >
                <Text style={styles.buttonSecondaryText}>Sign Up</Text>
              </Animated.View>
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
    position: 'relative',
    overflow: 'hidden',
  },

  glow: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 70,
    alignSelf: 'center',
    width: 260,
    height: 260,
    borderRadius: 999,
    backgroundColor: '#0066FF',
  },

  header: {
    marginTop: Platform.OS === 'ios' ? 80 : 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 44,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 18,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 280,
  },

  footer: {
    gap: 14,
    marginBottom: 40,
  },
  buttonPrimary: {
    backgroundColor: '#0066FF',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#0066FF',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00C9A7',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  buttonSecondaryText: {
    color: '#00C9A7',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
