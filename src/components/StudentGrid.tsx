import React from 'react';
import { Student } from '../types';
import { STATUS_COLORS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface StudentGridProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
}

export const StudentGrid: React.FC<StudentGridProps> = ({ students, onSelectStudent }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
        <AnimatePresence mode="popLayout">
          {students.map((student) => (
            <TooltipProvider key={student.id}>
              <Tooltip>
                <TooltipTrigger>
                  <motion.div
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    onClick={() => onSelectStudent(student)}
                    className="relative cursor-pointer group"
                  >
                    <div className={`w-full aspect-square rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
                      student.status === 'focused' ? 'border-emerald-200 bg-emerald-50' : 
                      student.status === 'distracted' ? 'border-amber-200 bg-amber-50' : 
                      student.status === 'sleepy' ? 'border-indigo-200 bg-indigo-50' : 
                      'border-slate-200 bg-slate-50'
                    }`}>
                      <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                      </Avatar>
                      
                      {/* Status Indicator Dot */}
                      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${STATUS_COLORS[student.status]}`} />
                      
                      {/* Attendance Indicator */}
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm ${student.attendanceStatus === 'present' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      
                      {/* Attention Score Ring */}
                      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none opacity-20">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="45%"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray={`${student.score * 2.8} 280`}
                          className={student.score > 70 ? 'text-emerald-500' : student.score > 40 ? 'text-amber-500' : 'text-rose-500'}
                        />
                      </svg>
                    </div>
                    <p className="text-[10px] font-medium text-center mt-1 text-slate-500 truncate w-full">{student.name.split(' ')[0]}</p>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="top" className="p-3 bg-white border border-slate-200 shadow-xl rounded-xl">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback>{student.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{student.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{student.status} • {student.score}% Attention</p>
                      <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${student.attendanceStatus === 'present' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {student.attendanceStatus}
                      </p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <div key={status} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
