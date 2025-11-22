export type ClassSession = {
  id: string;
  courseCode: string;
  courseName: string;
  startTime: string;
  endTime: string;
  location: string;
  lecturer: string;
  type: 'Lecture' | 'Tutorial' | 'Lab';
  status: 'Scheduled' | 'Cancelled' | 'Rescheduled' | 'RoomChanged';
  day: string;
  note?: string;
};

export const TIMETABLE_DATA: ClassSession[] = [
  {
    id: '1',
    courseCode: 'CS301',
    courseName: 'Data Structures & Algorithms',
    startTime: '08:30',
    endTime: '10:30',
    location: 'Lecture Hall A1',
    lecturer: 'Dr. K. Mensah',
    type: 'Lecture',
    status: 'Scheduled',
    day: 'Mon',
  },
  {
    id: '2',
    courseCode: 'MATH202',
    courseName: 'Linear Algebra',
    startTime: '11:00',
    endTime: '12:30',
    location: 'Room 404',
    lecturer: 'Prof. Sarah Boateng',
    type: 'Tutorial',
    status: 'RoomChanged',
    day: 'Mon',
    note: 'Moved from Room 302 due to AC maintenance.',
  },
  {
    id: '3',
    courseCode: 'CS305',
    courseName: 'Database Systems',
    startTime: '14:00',
    endTime: '16:00',
    location: 'Computer Lab 2',
    lecturer: 'Mr. David Osei',
    type: 'Lab',
    status: 'Scheduled',
    day: 'Mon',
  },
  {
    id: '4',
    courseCode: 'ENG101',
    courseName: 'Communication Skills',
    startTime: '09:00',
    endTime: '10:30',
    location: 'Hall B',
    lecturer: 'Mrs. A. Addo',
    type: 'Lecture',
    status: 'Cancelled',
    day: 'Tue',
    note: 'Lecturer is attending a conference. Make-up class on Friday.',
  },
  {
    id: '5',
    courseCode: 'CS301',
    courseName: 'Data Structures & Algorithms',
    startTime: '11:00',
    endTime: '13:00',
    location: 'Lecture Hall A1',
    lecturer: 'Dr. K. Mensah',
    type: 'Lecture',
    status: 'Scheduled',
    day: 'Wed',
  },
];
