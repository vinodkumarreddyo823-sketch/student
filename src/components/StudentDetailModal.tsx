import React from 'react';
import { Student } from '../types';
import { STATUS_COLORS, STATUS_LABELS } from '../constants';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, MapPin, TrendingUp, MessageCircle } from 'lucide-react';

interface StudentDetailModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ student, isOpen, onClose }) => {
  if (!student) return null;

  const chartData = student.history.map((score, i) => ({
    time: `${i}m ago`,
    score
  })).reverse();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl">
        <div className={`h-24 w-full ${STATUS_COLORS[student.status]} opacity-20 absolute top-0 left-0`} />
        
        <div className="relative p-6 pt-12">
          <div className="flex items-start gap-6 mb-8">
            <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
              <AvatarImage src={student.avatar} />
              <AvatarFallback>{student.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{student.name}</h2>
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Roll No: {student.rollNumber}</p>
                </div>
                <Badge className={`${STATUS_COLORS[student.status]} text-white border-none shadow-sm`}>
                  {STATUS_LABELS[student.status]}
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-2 text-slate-500">
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  Seat {student.seat}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  Age {student.age} • Grade {student.grade}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Attention</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-slate-900">{student.score}%</span>
                <TrendingUp className={`w-5 h-5 mb-1.5 ${student.score > 70 ? 'text-emerald-500' : 'text-amber-500'}`} />
              </div>
              <Progress value={student.score} className="h-1.5 mt-3 bg-slate-200" indicatorClassName={STATUS_COLORS[student.status]} />
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status Duration</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-slate-900">12</span>
                <span className="text-sm font-bold text-slate-400 mb-1.5">mins</span>
              </div>
              <p className="text-[10px] font-medium text-slate-400 mt-3">Consistent {student.status} state</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
              <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">Teacher Feedback</h4>
              <p className="text-sm text-slate-600 italic">"{student.feedback}"</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Attendance Summary</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Today's Status</span>
                  <Badge className={`${student.attendanceStatus === 'present' ? 'bg-emerald-500' : 'bg-rose-500'} text-white border-none text-[10px] h-5`}>
                    {student.attendanceStatus.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Attendance Rate</span>
                  <span className="text-xs font-bold text-slate-900">{student.attendancePercentage}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Attended Classes</span>
                  <span className="text-xs font-bold text-slate-900">{student.attendedClasses} / {student.totalClasses}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Parent Contact</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Name</span>
                  <span className="text-xs font-bold text-slate-900">{student.parentContact.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Phone</span>
                  <span className="text-xs font-bold text-slate-900">{student.parentContact.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Email</span>
                  <span className="text-xs font-bold text-slate-900">{student.parentContact.email}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                Attention History (Last 10m)
              </h3>
              <div className="h-[180px] w-full bg-slate-50/50 rounded-2xl p-2 border border-slate-100">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="time" hide />
                    <YAxis domain={[0, 100]} hide />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke={student.score > 70 ? '#10b981' : '#f59e0b'} 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: '#fff', strokeWidth: 2 }} 
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {student.studentFeedbacks && student.studentFeedbacks.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-indigo-500" />
                  Recent Student Feedback
                </h3>
                <div className="space-y-3">
                  {student.studentFeedbacks.map((f) => (
                    <div key={f.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">{f.mood}</span>
                        <span className="text-[10px] text-slate-400">{new Date(f.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-xs text-slate-600">{f.comment || 'No comment provided.'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
