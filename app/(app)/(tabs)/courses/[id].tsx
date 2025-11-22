import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, FileText, CheckCircle, MessageSquare, Clock, Download, MoreVertical } from 'lucide-react-native';
import { COURSES_DATA } from '@/mocks/courses';

export default function CourseDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const course = COURSES_DATA.find(c => c.id === id);

  if (!course) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text>Course not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#0F172A" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{course.code}</Text>
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical color="#0F172A" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Course Overview Card */}
        <View style={styles.overviewCard}>
          <View style={[styles.iconCircle, { backgroundColor: course.color + '20' }]}>
             <Text style={[styles.iconText, { color: course.color }]}>{course.code.substring(0, 2)}</Text>
          </View>
          <Text style={styles.courseTitle}>{course.name}</Text>
          <Text style={styles.lecturer}>{course.lecturer}</Text>
          <View style={styles.metaRow}>
            <Clock size={14} color="#64748B" />
            <Text style={styles.metaText}>{course.schedule}</Text>
          </View>
          <View style={styles.metaRow}>
            <MessageSquare size={14} color="#64748B" />
            <Text style={styles.metaText}>Academic Chat</Text>
          </View>
        </View>

        {/* Action Grid */}
        <View style={styles.actionGrid}>
           <TouchableOpacity style={styles.actionItem} onPress={() => router.push({ pathname: '/(app)/(tabs)/courses/attendance', params: { courseId: course.id } })}>
              <View style={[styles.actionIcon, { backgroundColor: '#EFF6FF' }]}>
                <CheckCircle color="#3B82F6" size={24} />
              </View>
              <Text style={styles.actionLabel}>Attendance</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: '#ECFDF5' }]}>
                <MessageSquare color="#10B981" size={24} />
              </View>
              <Text style={styles.actionLabel}>Discuss</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: '#FFFBEB' }]}>
                <FileText color="#F59E0B" size={24} />
              </View>
              <Text style={styles.actionLabel}>Grades</Text>
           </TouchableOpacity>
        </View>

        {/* Assignments Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Assignments</Text>
          {course.assignments.length === 0 ? (
            <Text style={styles.emptyText}>No active assignments.</Text>
          ) : (
            course.assignments.map(assign => (
              <View key={assign.id} style={styles.itemCard}>
                <View style={styles.itemIcon}>
                  <FileText size={20} color="#64748B" />
                </View>
                <View style={styles.itemContent}>
                   <Text style={styles.itemTitle}>{assign.title}</Text>
                   <Text style={styles.itemMeta}>Due: {assign.dueDate}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(assign.status) + '20' }]}>
                   <Text style={[styles.statusText, { color: getStatusColor(assign.status) }]}>{assign.status}</Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Materials Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Materials</Text>
          {course.materials.length === 0 ? (
            <Text style={styles.emptyText}>No materials uploaded yet.</Text>
          ) : (
            course.materials.map(material => (
              <View key={material.id} style={styles.itemCard}>
                <View style={styles.itemIcon}>
                  <FileText size={20} color="#64748B" />
                </View>
                <View style={styles.itemContent}>
                   <Text style={styles.itemTitle}>{material.title}</Text>
                   <Text style={styles.itemMeta}>{material.type} • {material.date}</Text>
                </View>
                <TouchableOpacity style={styles.downloadBtn}>
                  <Download size={20} color="#3B82F6" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Pending': return '#3B82F6';
    case 'Submitted': return '#10B981';
    case 'Late': return '#EF4444';
    case 'Graded': return '#8B5CF6';
    default: return '#64748B';
  }
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
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  moreButton: {
    padding: 8,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 20,
    fontWeight: '700',
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 4,
  },
  lecturer: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#64748B',
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  actionItem: {
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  emptyText: {
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  itemIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 2,
  },
  itemMeta: {
    fontSize: 13,
    color: '#64748B',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  downloadBtn: {
    padding: 8,
  },
});
