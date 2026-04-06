import { Student, StudentFeedback } from '../types';

/**
 * Adds a new feedback entry to a student's feedback history.
 * @param student The student object to update.
 * @param feedback The feedback data (without id and timestamp).
 * @returns A new student object with the updated feedback history.
 */
export const addFeedbackToStudent = (
  student: Student,
  feedback: Omit<StudentFeedback, 'id' | 'timestamp'>
): Student => {
  const newFeedback: StudentFeedback = {
    ...feedback,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString(),
  };

  return {
    ...student,
    studentFeedbacks: [newFeedback, ...(student.studentFeedbacks || [])],
  };
};
