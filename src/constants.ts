import { Student, ClassroomStats } from './types';

export const MOCK_STUDENTS: Student[] = [
  { 
    id: '1', 
    name: 'O. Vinod Kumar Reddy', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vinod', 
    seat: 1, 
    rollNumber: 'CS201', 
    age: 19, 
    grade: 'A+', 
    status: 'focused', 
    attendanceStatus: 'absent',
    totalClasses: 50,
    attendedClasses: 49,
    attendancePercentage: 98,
    score: 98, 
    history: [95, 96, 97, 98, 98, 97, 98, 98, 99, 98], 
    lastUpdate: new Date().toISOString(),
    feedback: 'Exceptional focus and consistent performance.',
    parentContact: { name: 'V. Reddy', phone: '+91-9876543210', email: 'reddy.v@example.com' },
    isVerified: true,
    studentFeedbacks: [
      {
        id: 'f1',
        studentId: '1',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        mood: 'happy',
        comment: 'The lecture on AI ethics was very interesting!'
      }
    ]
  },
  { 
    id: '2', 
    name: 'C. Sai Charitesh', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sai', 
    seat: 2, 
    rollNumber: 'CS202', 
    age: 18, 
    grade: 'A', 
    status: 'focused', 
    attendanceStatus: 'absent',
    totalClasses: 50,
    attendedClasses: 45,
    attendancePercentage: 90,
    score: 89, 
    history: [85, 87, 88, 89, 90, 89, 88, 89, 90, 89], 
    lastUpdate: new Date().toISOString(),
    feedback: 'Very attentive and quick to grasp concepts.',
    parentContact: { name: 'C. Rao', phone: '+91-9876543211', email: 'rao.c@example.com' },
    isVerified: true
  },
  { 
    id: '3', 
    name: 'K. Shanmugam', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shanmugam', 
    seat: 3, 
    rollNumber: 'CS203', 
    age: 19, 
    grade: 'B+', 
    status: 'focused', 
    attendanceStatus: 'absent',
    totalClasses: 50,
    attendedClasses: 40,
    attendancePercentage: 80,
    score: 79, 
    history: [75, 76, 78, 79, 80, 79, 78, 79, 81, 79], 
    lastUpdate: new Date().toISOString(),
    feedback: 'Good steady progress, maintains focus well.',
    parentContact: { name: 'K. Mani', phone: '+91-9876543212', email: 'mani.k@example.com' },
    isVerified: true
  },
  { 
    id: '4', 
    name: 'J. Sruthi', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sruthi', 
    seat: 4, 
    rollNumber: 'CS204', 
    age: 18, 
    grade: 'A', 
    status: 'focused', 
    attendanceStatus: 'absent',
    totalClasses: 50,
    attendedClasses: 43,
    attendancePercentage: 86,
    score: 85, 
    history: [80, 82, 84, 85, 86, 85, 84, 85, 86, 85], 
    lastUpdate: new Date().toISOString(),
    feedback: 'Active participant in all classroom activities.',
    parentContact: { name: 'J. Lakshmi', phone: '+91-9876543213', email: 'lakshmi.j@example.com' },
    isVerified: true
  },
  { 
    id: '5', 
    name: 'B. Tejaswini', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tejaswini', 
    seat: 5, 
    rollNumber: 'CS205', 
    age: 19, 
    grade: 'A+', 
    status: 'focused', 
    attendanceStatus: 'absent',
    totalClasses: 50,
    attendedClasses: 49,
    attendancePercentage: 98,
    score: 98, 
    history: [96, 97, 98, 98, 99, 98, 97, 98, 99, 98], 
    lastUpdate: new Date().toISOString(),
    feedback: 'Consistently high engagement levels.',
    parentContact: { name: 'B. Prasad', phone: '+91-9876543214', email: 'prasad.b@example.com' },
    isVerified: true
  },
  { 
    id: '6', 
    name: 'K. Thilak', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thilak', 
    seat: 6, 
    rollNumber: 'CS206', 
    age: 18, 
    grade: 'A', 
    status: 'focused', 
    attendanceStatus: 'absent',
    totalClasses: 50,
    attendedClasses: 47,
    attendancePercentage: 94,
    score: 93, 
    history: [90, 91, 92, 93, 94, 93, 92, 93, 94, 93], 
    lastUpdate: new Date().toISOString(),
    feedback: 'Excellent analytical skills and focus.',
    parentContact: { name: 'K. Kumar', phone: '+91-9876543215', email: 'kumar.k@example.com' },
    isVerified: true
  },
  { 
    id: '7', 
    name: 'M. Varun Teja', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Varun', 
    seat: 7, 
    rollNumber: 'CS207', 
    age: 19, 
    grade: 'A', 
    status: 'focused', 
    attendanceStatus: 'absent',
    totalClasses: 50,
    attendedClasses: 43,
    attendancePercentage: 86,
    score: 85, 
    history: [80, 82, 84, 85, 86, 85, 84, 85, 86, 85], 
    lastUpdate: new Date().toISOString(),
    feedback: 'Maintains a good balance of focus and participation.',
    parentContact: { name: 'M. Rao', phone: '+91-9876543216', email: 'rao.m@example.com' },
    isVerified: true
  },
  { 
    id: '8', 
    name: 'K. Nandhini', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nandhini', 
    seat: 8, 
    rollNumber: 'CS208', 
    age: 18, 
    grade: 'A+', 
    status: 'focused', 
    attendanceStatus: 'absent',
    totalClasses: 50,
    attendedClasses: 48,
    attendancePercentage: 96,
    score: 95, 
    history: [92, 93, 94, 95, 96, 95, 94, 95, 96, 95], 
    lastUpdate: new Date().toISOString(),
    feedback: 'Highly disciplined and focused student.',
    parentContact: { name: 'K. Devi', phone: '+91-9876543217', email: 'devi.k@example.com' },
    isVerified: true
  },
];

export const getClassroomStats = (students: Student[]): ClassroomStats => {
  const total = students.length;
  const focused = students.filter(s => s.status === 'focused').length;
  const distracted = students.filter(s => s.status === 'distracted').length;
  const sleepy = students.filter(s => s.status === 'sleepy').length;
  const away = students.filter(s => s.status === 'away').length;
  const avg = students.reduce((acc, s) => acc + s.score, 0) / total;

  return {
    averageAttention: Math.round(avg),
    totalStudents: total,
    focusedCount: focused,
    distractedCount: distracted,
    sleepyCount: sleepy,
    awayCount: away,
  };
};

export const STATUS_COLORS = {
  focused: 'bg-emerald-500',
  distracted: 'bg-amber-500',
  sleepy: 'bg-indigo-500',
  away: 'bg-slate-400',
};

export const STATUS_LABELS = {
  focused: 'Focused',
  distracted: 'Distracted',
  sleepy: 'Sleepy',
  away: 'Away',
};
