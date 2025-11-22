import "react-native-url-polyfill/auto";
import "react-native-get-random-values";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ldsszpeirnwwvmzdvdtf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkc3N6cGVpcm53d3ZtemR2ZHRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NzAwNzQsImV4cCI6MjA3OTM0NjA3NH0.0_CLlYLjlB3-tjAgih_MhhHd9GnND_J6npJzqe6Ex3U";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
