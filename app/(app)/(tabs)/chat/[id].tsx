import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Send, MoreVertical, Paperclip } from 'lucide-react-native';
import { CHAT_CHANNELS, MOCK_MESSAGES } from '@/mocks/chat';

export default function ChatRoom() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [inputText, setInputText] = useState('');

  const channel = CHAT_CHANNELS.find(c => c.id === id);

  if (!channel) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#0F172A" size={24} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle} numberOfLines={1}>{channel.name}</Text>
          <Text style={styles.headerSubtitle}>{channel.courseCode}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical color="#0F172A" size={24} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView 
        contentContainerStyle={styles.messagesList} 
        showsVerticalScrollIndicator={false}
      >
        {MOCK_MESSAGES.map((msg) => (
          <View 
            key={msg.id} 
            style={[
              styles.messageRow, 
              msg.isMe ? styles.messageRowMe : styles.messageRowOther
            ]}
          >
            {!msg.isMe && (
              <View style={styles.senderAvatar}>
                <Text style={styles.senderAvatarText}>{msg.senderName.charAt(0)}</Text>
              </View>
            )}
            
            <View style={[
              styles.bubble, 
              msg.isMe ? styles.bubbleMe : styles.bubbleOther,
              !msg.isMe && msg.role === 'Lecturer' && styles.bubbleLecturer
            ]}>
              {!msg.isMe && (
                <View style={styles.bubbleHeader}>
                   <Text style={styles.senderName}>{msg.senderName}</Text>
                   {msg.role && msg.role !== 'Student' && (
                     <View style={[
                       styles.roleBadge, 
                       msg.role === 'Lecturer' ? styles.roleLecturer : styles.roleTA
                     ]}>
                       <Text style={styles.roleText}>{msg.role}</Text>
                     </View>
                   )}
                </View>
              )}
              <Text style={[
                styles.messageText,
                msg.isMe ? styles.textMe : styles.textOther
              ]}>{msg.text}</Text>
              <Text style={[
                styles.timestamp,
                msg.isMe ? styles.timeMe : styles.timeOther
              ]}>{msg.timestamp}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={[styles.inputArea, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <TouchableOpacity style={styles.attachButton}>
             <Paperclip color="#64748B" size={24} />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          
          <TouchableOpacity 
            style={[styles.sendButton, !inputText && styles.sendButtonDisabled]}
            disabled={!inputText}
          >
             <Send color="#FFFFFF" size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  moreButton: {
    padding: 8,
  },
  messagesList: {
    padding: 16,
    paddingBottom: 20,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  messageRowMe: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  messageRowOther: {
    alignSelf: 'flex-start',
  },
  senderAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 4,
  },
  senderAvatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  bubble: {
    borderRadius: 16,
    padding: 12,
    maxWidth: '100%',
  },
  bubbleMe: {
    backgroundColor: '#3B82F6',
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  bubbleLecturer: {
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
  },
  bubbleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  roleBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  roleLecturer: {
    backgroundColor: '#FFFBEB',
  },
  roleTA: {
    backgroundColor: '#ECFDF5',
  },
  roleText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  textMe: {
    color: '#FFFFFF',
  },
  textOther: {
    color: '#1E293B',
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  timeMe: {
    color: 'rgba(255,255,255,0.7)',
  },
  timeOther: {
    color: '#94A3B8',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  attachButton: {
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 8,
    fontSize: 15,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#CBD5E1',
  },
});
