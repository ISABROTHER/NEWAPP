import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Clock } from 'lucide-react-native';
import { COURSES_DATA } from '@/mocks/courses';

export default function CoursesList() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>My Courses</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {COURSES_DATA.map((course) => (
            <Link key={course.id} href={`/(app)/(tabs)/courses/${course.id}`} asChild>
              <TouchableOpacity style={styles.card} activeOpacity={0.9}>
                <View style={[styles.colorStrip, { backgroundColor: course.color }]} />
                <View style={styles.cardContent}>
                   <View style={styles.cardHeader}>
                     <View style={[styles.codeBadge, { backgroundColor: course.color + '15' }]}>
                        <Text style={[styles.codeText, { color: course.color }]}>{course.code}</Text>
                     </View>
                   </View>
                   
                   <Text style={styles.courseName} numberOfLines={2}>{course.name}</Text>
                   
                   <View style={styles.footer}>
                     <View style={styles.lecturerRow}>
                        <Text style={styles.lecturerText} numberOfLines={1}>{course.lecturer}</Text>
                     </View>
                     
                     {course.nextClass && (
                       <View style={styles.nextClassBadge}>
                         <Clock size={12} color="#64748B" />
                         <Text style={styles.nextClassText}>{course.nextClass}</Text>
                       </View>
                     )}
                   </View>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    paddingTop: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  grid: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    flexDirection: 'row',
    height: 130,
  },
  colorStrip: {
    width: 6,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  codeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  codeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  courseName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 24,
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 12,
  },
  lecturerRow: {
    flex: 1,
    marginRight: 10,
  },
  lecturerText: {
    fontSize: 13,
    color: '#64748B',
  },
  nextClassBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  nextClassText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
});
