import React from 'react';
import { Student } from '../types';
import { STATUS_COLORS, STATUS_LABELS } from '../constants';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'motion/react';

interface StudentListProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
}

export const StudentList: React.FC<StudentListProps> = ({ students, onSelectStudent }) => {
  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="space-y-3">
        {students.sort((a, b) => b.score - a.score).map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectStudent(student)}
            className="group flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer"
          >
            <div className="relative">
              <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                <AvatarImage src={student.avatar} />
                <AvatarFallback>{student.name[0]}</AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${STATUS_COLORS[student.status]}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 truncate">
                  <h4 className="text-sm font-semibold text-slate-900 truncate">{student.name}</h4>
                  <div className={`w-1.5 h-1.5 rounded-full ${student.attendanceStatus === 'present' ? 'bg-emerald-500' : 'bg-rose-500'}`} title={student.attendanceStatus === 'present' ? 'Present' : 'Absent'} />
                </div>
                <Badge variant="secondary" className={`text-[10px] h-5 px-1.5 font-medium ${
                  student.status === 'focused' ? 'bg-emerald-50 text-emerald-700' : 
                  student.status === 'distracted' ? 'bg-amber-50 text-amber-700' : 
                  student.status === 'sleepy' ? 'bg-indigo-50 text-indigo-700' : 
                  'bg-slate-50 text-slate-700'
                }`}>
                  {STATUS_LABELS[student.status]}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <Progress 
                  value={student.score} 
                  className="h-1.5 bg-slate-100" 
                  indicatorClassName={student.score > 70 ? 'bg-emerald-500' : student.score > 40 ? 'bg-amber-500' : 'bg-rose-500'}
                />
                <span className="text-xs font-bold text-slate-500 w-8">{student.score}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );
};
