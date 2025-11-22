// context/auth.tsx
import createContextHook from "@nkzw/create-context-hook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";

type User = {
  id: string;
  email: string;
  name: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type SignUpPayload = {
  email: string;
  password: string;
  name?: string;
};

function mapSupabaseUser(sbUser: any | null): User | null {
  if (!sbUser) return null;
  const email = sbUser.email ?? "";
  const nameFromMeta =
    sbUser.user_metadata?.name ||
    sbUser.user_metadata?.full_name ||
    (email ? email.split("@")[0] : "User");
  return {
    id: sbUser.id,
    email,
    name: nameFromMeta
  };
}

export const [AuthProvider, useAuth] = createContextHook(() => {
  const queryClient = useQueryClient();

  // Initial load of session/user
  const userQuery = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.warn("[Supabase] getSession error:", error.message);
        return null;
      }
      return mapSupabaseUser(data.session?.user ?? null);
    }
  });

  // Keep local cache in sync with Supabase auth state
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const mapped = mapSupabaseUser(session?.user ?? null);
      queryClient.setQueryData(["auth-user"], mapped);
      if (!mapped) {
        // @ts-ignore
        router.replace("/auth/welcome");
      }
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, [queryClient]);

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: LoginPayload) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return data.user;
    },
    onSuccess: (sbUser) => {
      const mapped = mapSupabaseUser(sbUser);
      queryClient.setQueryData(["auth-user"], mapped);
      // @ts-ignore
      router.replace("/(app)/(tabs)/home");
    }
  });

  const signUpMutation = useMutation({
    mutationFn: async ({ email, password, name }: SignUpPayload) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: name ? { data: { name } } : undefined
      });
      if (error) throw error;
      return data.user;
    },
    onSuccess: (sbUser) => {
      const mapped = mapSupabaseUser(sbUser);
      queryClient.setQueryData(["auth-user"], mapped);
      // If confirmations are ON, user may be null until confirmed.
      // @ts-ignore
      router.replace("/(app)/(tabs)/home");
    }
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.setQueryData(["auth-user"], null);
      // @ts-ignore
      router.replace("/auth/welcome");
    }
  });

  return useMemo(
    () => ({
      user: userQuery.data,
      isLoading: userQuery.isLoading,
      login: loginMutation.mutate,
      signUp: signUpMutation.mutate,
      isLoggingIn: loginMutation.isPending || signUpMutation.isPending,
      logout: logoutMutation.mutate
    }),
    [
      userQuery.data,
      userQuery.isLoading,
      loginMutation.mutate,
      signUpMutation.mutate,
      loginMutation.isPending,
      signUpMutation.isPending,
      logoutMutation.mutate
    ]
  );
});
