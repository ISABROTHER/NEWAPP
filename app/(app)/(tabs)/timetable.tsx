import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, MapPin, AlertCircle, User } from 'lucide-react-native';
import { TIMETABLE_DATA, ClassSession } from '@/mocks/timetable';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function Timetable() {
  const insets = useSafeAreaInsets();
  const [selectedDay, setSelectedDay] = useState('Mon');

  const daysClasses = TIMETABLE_DATA.filter(c => c.day === selectedDay).sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
        <TouchableOpacity style={styles.calendarBtn}>
           <CalendarIcon color="#3B82F6" size={20} />
           <Text style={styles.calendarBtnText}>Academic Calendar</Text>
        </TouchableOpacity>
      </View>

      {/* Day Selector */}
      <View style={styles.daysContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysScroll}>
          {DAYS.map((day) => {
            const isSelected = day === selectedDay;
            return (
              <TouchableOpacity
                key={day}
                style={[styles.dayChip, isSelected && styles.dayChipSelected]}
                onPress={() => setSelectedDay(day)}
                activeOpacity={0.7}
              >
                <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>{day}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.timelineContainer}>
           {daysClasses.length === 0 ? (
             <View style={styles.emptyState}>
               <Text style={styles.emptyStateText}>No classes scheduled for {selectedDay}</Text>
             </View>
           ) : (
             daysClasses.map((item, index) => (
               <ClassCard key={item.id} item={item} isLast={index === daysClasses.length - 1} />
             ))
           )}
        </View>
      </ScrollView>
    </View>
  );
}

function ClassCard({ item, isLast }: { item: ClassSession, isLast: boolean }) {
  const isCancelled = item.status === 'Cancelled';
  const isRoomChanged = item.status === 'RoomChanged';

  return (
    <View style={styles.classRow}>
       {/* Time Column */}
       <View style={styles.timeColumn}>
         <Text style={styles.startTime}>{item.startTime}</Text>
         <Text style={styles.endTime}>{item.endTime}</Text>
         {!isLast && <View style={styles.timelineLine} />}
       </View>

       {/* Card */}
       <View style={[styles.cardContainer, isCancelled && styles.cardCancelled]}>
          <View style={[styles.statusStrip, { backgroundColor: getStatusColor(item.status) }]} />
          
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <View style={styles.codeBadge}>
                <Text style={styles.codeText}>{item.courseCode}</Text>
              </View>
              <Text style={styles.typeText}>{item.type}</Text>
            </View>
            
            <Text style={[styles.courseName, isCancelled && styles.textCancelled]}>{item.courseName}</Text>
            
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <User size={14} color="#64748B" />
                <Text style={styles.detailText} numberOfLines={1}>{item.lecturer}</Text>
              </View>
            </View>

            <View style={styles.detailsRow}>
               <View style={styles.detailItem}>
                <MapPin size={14} color={isRoomChanged ? "#D97706" : "#64748B"} />
                <Text style={[styles.detailText, isRoomChanged && styles.textChanged]} numberOfLines={1}>
                  {item.location}
                </Text>
               </View>
            </View>
            
            {/* Alert / Note */}
            {(item.note || isCancelled || isRoomChanged) && (
              <View style={[
                styles.alertBox, 
                isCancelled ? styles.alertBoxRed : (isRoomChanged ? styles.alertBoxOrange : styles.alertBoxBlue)
              ]}>
                <AlertCircle size={14} color={isCancelled ? "#EF4444" : (isRoomChanged ? "#D97706" : "#3B82F6")} />
                <Text style={[
                  styles.alertText,
                  isCancelled ? styles.textRed : (isRoomChanged ? styles.textOrange : styles.textBlue)
                ]}>
                  {isCancelled ? 'Cancelled' : (isRoomChanged ? 'Room Changed' : 'Update')}
                  {item.note ? `: ${item.note}` : ''}
                </Text>
              </View>
            )}
          </View>
       </View>
    </View>
  );
}

function getStatusColor(status: ClassSession['status']) {
  switch (status) {
    case 'Cancelled': return '#EF4444';
    case 'RoomChanged': return '#F59E0B';
    case 'Rescheduled': return '#3B82F6';
    default: return '#3B82F6'; // Default blue strip
  }
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },
  calendarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  calendarBtnText: {
    color: '#3B82F6',
    fontWeight: '600',
    fontSize: 12,
  },
  daysContainer: {
    marginBottom: 10,
  },
  daysScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  dayChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dayChipSelected: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  dayTextSelected: {
    color: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  timelineContainer: {
    flex: 1,
  },
  classRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeColumn: {
    width: 60,
    alignItems: 'center',
    marginRight: 12,
  },
  startTime: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  endTime: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginTop: 8,
    marginBottom: -20, // Extend to next item
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  cardCancelled: {
    opacity: 0.7,
    backgroundColor: '#FEF2F2',
  },
  statusStrip: {
    width: 5,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  codeBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  codeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  typeText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  courseName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    lineHeight: 22,
  },
  textCancelled: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginRight: 16,
  },
  detailText: {
    fontSize: 13,
    color: '#64748B',
  },
  textChanged: {
    color: '#D97706',
    fontWeight: '600',
  },
  alertBox: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    padding: 8,
    borderRadius: 8,
  },
  alertBoxRed: {
    backgroundColor: '#FEF2F2',
  },
  alertBoxOrange: {
    backgroundColor: '#FFFBEB',
  },
  alertBoxBlue: {
    backgroundColor: '#EFF6FF',
  },
  alertText: {
    fontSize: 12,
    flex: 1,
    lineHeight: 16,
  },
  textRed: {
    color: '#EF4444',
  },
  textOrange: {
    color: '#D97706',
  },
  textBlue: {
    color: '#3B82F6',
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#94A3B8',
    fontSize: 16,
  },
});
