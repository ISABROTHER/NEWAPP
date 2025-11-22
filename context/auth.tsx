import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect, useMemo } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
};

export const [AuthProvider, useAuth] = createContextHook(() => {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ['auth-user'],
    queryFn: async () => {
      const stored = await AsyncStorage.getItem('auth-user');
      return stored ? (JSON.parse(stored) as User) : null;
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (user: User) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await AsyncStorage.setItem('auth-user', JSON.stringify(user));
      return user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['auth-user'], user);
      // @ts-ignore
      router.replace('/(app)/(tabs)/home');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await AsyncStorage.removeItem('auth-user');
    },
    onSuccess: () => {
      queryClient.setQueryData(['auth-user'], null);
      // @ts-ignore - route doesn't exist yet
      router.replace('/auth/welcome');
    },
  });

  return useMemo(() => ({
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    logout: logoutMutation.mutate,
  }), [userQuery.data, userQuery.isLoading, loginMutation.mutate, loginMutation.isPending, logoutMutation.mutate]);
});
