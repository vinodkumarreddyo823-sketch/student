export type AttentionStatus = 'focused' | 'distracted' | 'sleepy' | 'away';

export type UserRole = 'professor' | 'student' | 'parent';

export interface StudentFeedback {
  id: string;
  studentId: string;
  timestamp: string;
  mood: 'happy' | 'confused' | 'struggling' | 'bored';
  comment: string;
}

export type AttendanceStatus = 'present' | 'absent';

export interface Student {
  id: string;
  name: string;
  avatar: string;
  seat: number;
  rollNumber: string;
  age: number;
  grade: string;
  status: AttentionStatus;
  attendanceStatus: AttendanceStatus;
  totalClasses: number;
  attendedClasses: number;
  attendancePercentage: number;
  score: number; // 0-100
  history: number[]; // Last 10 minutes attention scores
  lastUpdate: string;
  feedback: string;
  parentContact: {
    name: string;
    phone: string;
    email: string;
  };
  aadharNumber?: string;
  isVerified: boolean;
  studentFeedbacks?: StudentFeedback[];
}

export interface ClassroomStats {
  averageAttention: number;
  totalStudents: number;
  focusedCount: number;
  distractedCount: number;
  sleepyCount: number;
  awayCount: number;
}

export interface AttentionDataPoint {
  time: string;
  score: number;
}
