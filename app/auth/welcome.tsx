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
  const headerAnim = useRef(new Animated.Value(0)).current;
  const btnAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(btnAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [headerAnim, btnAnim]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerAnim,
              transform: [{ translateY: headerAnim.interpolate({ inputRange: [0,1], outputRange: [20,0] }) }],
            },
          ]}
        >
          <Text style={styles.title}>YourAppName</Text>
          <Text style={styles.subtitle}>Welcome to something amazing.</Text>
        </Animated.View>

        <Animated.View
          style={{
            opacity: btnAnim,
            transform: [{ translateY: btnAnim.interpolate({ inputRange: [0,1], outputRange: [40,0] }) }],
          }}
        >
          <Link href="/auth/login" asChild>
            <TouchableOpacity style={styles.buttonPrimary}>
              <Text style={styles.buttonPrimaryText}>Log In</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/auth/sign-up" asChild>
            <TouchableOpacity style={styles.buttonSecondary}>
              <Text style={styles.buttonSecondaryText}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4F7FA',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#0F1116',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  buttonPrimary: {
    backgroundColor: '#2E86DE',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    borderColor: '#1ABC9C',
    borderWidth: 2,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: '#1ABC9C',
    fontSize: 16,
    fontWeight: '600',
  },
});
