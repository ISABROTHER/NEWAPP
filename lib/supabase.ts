import "react-native-url-polyfill/auto";
import "react-native-get-random-values";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const FALLBACK_SUPABASE_URL = "https://ldsszpeirnwwvmzdvdtf.supabase.co";

function sanitizeSupabaseUrl(input: string | undefined): string | undefined {
  const raw = input?.trim();
  if (!raw) return undefined;
  const cleaned = raw.replace(/=+$/, "");
  return cleaned;
}

function sanitizeSupabaseKey(input: string | undefined): string | undefined {
  const raw = input?.trim();
  if (!raw) return undefined;
  return raw.replace(/=+$/, "");
}

const supabaseUrl =
  sanitizeSupabaseUrl(process.env.EXPO_PUBLIC_SUPABASE_URL as string | undefined) ??
  sanitizeSupabaseUrl(process.env.SUPABASE_URL as string | undefined) ??
  sanitizeSupabaseUrl(process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL as string | undefined) ??
  sanitizeSupabaseUrl(process.env.EXPO_PUBLIC_SUPABASE_REST_URL as string | undefined) ??
  FALLBACK_SUPABASE_URL;

const supabaseAnonKey =
  sanitizeSupabaseKey(
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string | undefined,
  ) ??
  sanitizeSupabaseKey(process.env.SUPABASE_ANON_KEY as string | undefined) ??
  sanitizeSupabaseKey(process.env.EXPO_PUBLIC_SUPABASE_ANON_TOKEN as string | undefined) ??
  sanitizeSupabaseKey(process.env.SUPABASE_ANON_TOKEN as string | undefined) ??
  sanitizeSupabaseKey(process.env.EXPO_PUBLIC_SUPABASE_KEY as string | undefined) ??
  sanitizeSupabaseKey(process.env.SUPABASE_KEY as string | undefined) ??
  "";

if (!supabaseUrl) {
  throw new Error(
    "Supabase is not configured: missing EXPO_PUBLIC_SUPABASE_URL (or SUPABASE_URL).",
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "Supabase is not configured: missing EXPO_PUBLIC_SUPABASE_ANON_KEY (or SUPABASE_ANON_KEY).",
  );
}

try {
  const host = (() => {
    try {
      return new URL(supabaseUrl).host;
    } catch {
      return "invalid-url";
    }
  })();
  console.log("[Supabase] init", {
    urlHost: host,
    hasAnonKey: Boolean(supabaseAnonKey),
    envUrlKeysPresent: {
      EXPO_PUBLIC_SUPABASE_URL: Boolean(process.env.EXPO_PUBLIC_SUPABASE_URL),
      SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
      EXPO_PUBLIC_SUPABASE_PROJECT_URL: Boolean(
        process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL,
      ),
      EXPO_PUBLIC_SUPABASE_REST_URL: Boolean(
        process.env.EXPO_PUBLIC_SUPABASE_REST_URL,
      ),
    },
    envAnonKeysPresent: {
      EXPO_PUBLIC_SUPABASE_ANON_KEY: Boolean(
        process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      ),
      SUPABASE_ANON_KEY: Boolean(process.env.SUPABASE_ANON_KEY),
      EXPO_PUBLIC_SUPABASE_ANON_TOKEN: Boolean(
        process.env.EXPO_PUBLIC_SUPABASE_ANON_TOKEN,
      ),
      SUPABASE_ANON_TOKEN: Boolean(process.env.SUPABASE_ANON_TOKEN),
      EXPO_PUBLIC_SUPABASE_KEY: Boolean(process.env.EXPO_PUBLIC_SUPABASE_KEY),
      SUPABASE_KEY: Boolean(process.env.SUPABASE_KEY),
    },
  });
} catch {}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
