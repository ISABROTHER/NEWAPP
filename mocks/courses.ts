export type Assignment = {
  id: string;
  title: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Graded' | 'Late';
  grade?: string;
};

export type Material = {
  id: string;
  title: string;
  type: 'PDF' | 'Slide' | 'Video' | 'Link';
  date: string;
  size?: string;
};

export type Course = {
  id: string;
  code: string;
  name: string;
  lecturer: string;
  location: string;
  schedule: string;
  color: string;
  assignments: Assignment[];
  materials: Material[];
  nextClass?: string;
};

export const COURSES_DATA: Course[] = [
  {
    id: '1',
    code: 'CS301',
    name: 'Data Structures & Algorithms',
    lecturer: 'Dr. K. Mensah',
    location: 'Lecture Hall A1',
    schedule: 'Mon 08:30 • Wed 11:00',
    color: '#3B82F6',
    nextClass: 'Wed, 11:00 AM',
    assignments: [
      { id: 'a1', title: 'Binary Search Trees Implementation', dueDate: '2023-10-25', status: 'Pending' },
      { id: 'a2', title: 'Sorting Algorithms Analysis', dueDate: '2023-10-15', status: 'Graded', grade: '85/100' },
    ],
    materials: [
      { id: 'm1', title: 'Lecture 5: AVL Trees', type: 'Slide', date: '2023-10-20', size: '2.4 MB' },
      { id: 'm2', title: 'Graph Theory Basics', type: 'PDF', date: '2023-10-18', size: '1.1 MB' },
    ],
  },
  {
    id: '2',
    code: 'MATH202',
    name: 'Linear Algebra',
    lecturer: 'Prof. Sarah Boateng',
    location: 'Room 404',
    schedule: 'Mon 11:00 • Thu 09:00',
    color: '#8B5CF6',
    assignments: [
      { id: 'a3', title: 'Matrix Operations Quiz', dueDate: '2023-10-28', status: 'Pending' },
    ],
    materials: [
      { id: 'm3', title: 'Week 4: Eigenvalues', type: 'PDF', date: '2023-10-21', size: '850 KB' },
    ],
  },
  {
    id: '3',
    code: 'CS305',
    name: 'Database Systems',
    lecturer: 'Mr. David Osei',
    location: 'Computer Lab 2',
    schedule: 'Mon 14:00 • Fri 10:00',
    color: '#10B981',
    assignments: [],
    materials: [
      { id: 'm4', title: 'SQL Advanced Queries', type: 'Video', date: '2023-10-19' },
    ],
  },
  {
    id: '4',
    code: 'ENG101',
    name: 'Communication Skills',
    lecturer: 'Mrs. A. Addo',
    location: 'Hall B',
    schedule: 'Tue 09:00',
    color: '#F59E0B',
    assignments: [
      { id: 'a4', title: 'Essay Draft', dueDate: '2023-10-30', status: 'Late' },
    ],
    materials: [],
  },
];
