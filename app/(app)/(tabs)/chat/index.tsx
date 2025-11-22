import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { CHAT_CHANNELS } from '@/mocks/chat';
import { Search, Edit } from 'lucide-react-native';

export default function ChatList() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Edit color="#3B82F6" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
           <Search size={20} color="#94A3B8" />
           <Text style={styles.placeholderText}>Search chats...</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {CHAT_CHANNELS.map((channel) => (
          <Link key={channel.id} href={`/(app)/(tabs)/chat/${channel.id}`} asChild>
            <TouchableOpacity style={styles.chatItem} activeOpacity={0.7}>
              <View style={[styles.avatar, { backgroundColor: channel.color }]}>
                <Text style={styles.avatarText}>{channel.courseCode.substring(0, 2)}</Text>
              </View>
              
              <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName} numberOfLines={1}>{channel.name}</Text>
                  <Text style={styles.timeText}>{channel.lastMessageTime}</Text>
                </View>
                <View style={styles.chatFooter}>
                  <Text style={[styles.lastMessage, channel.unreadCount > 0 && styles.lastMessageBold]} numberOfLines={1}>
                    {channel.lastMessage}
                  </Text>
                  {channel.unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{channel.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },
  iconButton: {
    padding: 4,
  },
  searchBarContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 12,
    gap: 8,
  },
  placeholderText: {
    color: '#94A3B8',
    fontSize: 15,
  },
  content: {
    paddingBottom: 100,
  },
  chatItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    flex: 1,
    marginRight: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#64748B',
    flex: 1,
    marginRight: 8,
  },
  lastMessageBold: {
    color: '#0F172A',
    fontWeight: '600',
  },
  unreadBadge: {
    backgroundColor: '#3B82F6',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
