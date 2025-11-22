export type Message = {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: string;
  isMe: boolean;
  role?: 'Student' | 'Lecturer' | 'TA' | 'Rep';
};

export type ChatChannel = {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  courseCode: string;
  color: string;
};

export const CHAT_CHANNELS: ChatChannel[] = [
  {
    id: '1',
    name: 'Data Structures & Algorithms',
    courseCode: 'CS301',
    lastMessage: 'Dr. Mensah: Don\'t forget the deadline for Assignment 1 is tomorrow.',
    lastMessageTime: '10:45 AM',
    unreadCount: 2,
    color: '#3B82F6',
  },
  {
    id: '2',
    name: 'Linear Algebra',
    courseCode: 'MATH202',
    lastMessage: 'Who wants to study group for the midterm?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    color: '#8B5CF6',
  },
  {
    id: '3',
    name: 'Database Systems',
    courseCode: 'CS305',
    lastMessage: 'TA: Lab starts in 10 minutes at Computer Lab 2.',
    lastMessageTime: 'Yesterday',
    unreadCount: 5,
    color: '#10B981',
  },
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    text: 'Hi everyone, welcome to the course chat.',
    senderId: 'lecturer1',
    senderName: 'Dr. K. Mensah',
    timestamp: '09:00 AM',
    isMe: false,
    role: 'Lecturer',
  },
  {
    id: 'm2',
    text: 'Will the slides be uploaded today?',
    senderId: 'student2',
    senderName: 'Sarah K.',
    timestamp: '09:15 AM',
    isMe: false,
    role: 'Student',
  },
  {
    id: 'm3',
    text: 'Yes, I just uploaded them to the Course Hub.',
    senderId: 'ta1',
    senderName: 'Kwame (TA)',
    timestamp: '09:20 AM',
    isMe: false,
    role: 'TA',
  },
  {
    id: 'm4',
    text: 'Thanks! I see them now.',
    senderId: 'me',
    senderName: 'Me',
    timestamp: '09:22 AM',
    isMe: true,
    role: 'Student',
  },
  {
    id: 'm5',
    text: 'Don\'t forget the deadline for Assignment 1 is tomorrow.',
    senderId: 'lecturer1',
    senderName: 'Dr. K. Mensah',
    timestamp: '10:45 AM',
    isMe: false,
    role: 'Lecturer',
  },
];
