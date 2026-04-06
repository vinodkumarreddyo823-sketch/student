import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Student, StudentFeedback } from '../types';
import { AttentionChart } from './AttentionChart';
import { Smile, Frown, Meh, HelpCircle, Send, TrendingUp, BookOpen, MessageSquare, ShieldCheck, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface StudentPortalProps {
  student: Student;
  onFeedbackSubmit: (feedback: Omit<StudentFeedback, 'id' | 'timestamp'>) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({ student, onFeedbackSubmit }) => {
  const [mood, setMood] = useState<StudentFeedback['mood']>('happy');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    onFeedbackSubmit({ studentId: student.id, mood, comment });
    setSubmitted(true);
    setComment('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  const chartData = student.history.map((score, i) => ({
    time: `${i}m ago`,
    score
  })).reverse();

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome, {student.name.split(' ')[0]}!</h2>
          <p className="text-slate-500 mt-1 font-medium">Your personal learning dashboard and engagement metrics.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Verified Profile</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              Your Attention Trends
            </CardTitle>
            <CardDescription className="text-xs font-medium text-slate-400">Real-time monitoring of your classroom engagement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Focus Score</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-slate-900">{student.score}%</span>
                  <span className="text-xs font-bold text-emerald-500 mb-1.5">+5% from last session</span>
                </div>
              </div>
              <div className="w-32">
                <Progress value={student.score} className="h-2 bg-slate-200" />
              </div>
            </div>
            <div className="h-[250px]">
              <AttentionChart data={chartData} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl overflow-hidden h-fit">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-500" />
              Classroom Feedback
            </CardTitle>
            <CardDescription className="text-xs font-medium text-slate-400">How are you feeling about the current lesson?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between gap-2">
              {(['happy', 'confused', 'struggling', 'bored'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`flex-1 p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    mood === m ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  {m === 'happy' && <Smile className={`w-6 h-6 ${mood === m ? 'text-indigo-600' : 'text-slate-400'}`} />}
                  {m === 'confused' && <HelpCircle className={`w-6 h-6 ${mood === m ? 'text-indigo-600' : 'text-slate-400'}`} />}
                  {m === 'struggling' && <Frown className={`w-6 h-6 ${mood === m ? 'text-indigo-600' : 'text-slate-400'}`} />}
                  {m === 'bored' && <Meh className={`w-6 h-6 ${mood === m ? 'text-indigo-600' : 'text-slate-400'}`} />}
                  <span className="text-[10px] font-bold capitalize">{m}</span>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Additional Comments</Label>
              <Textarea 
                placeholder="Tell your teacher more..." 
                className="rounded-xl border-slate-200 min-h-[100px] resize-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <Button 
              className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-2"
              onClick={handleSubmit}
              disabled={submitted}
            >
              {submitted ? 'Feedback Sent!' : <><Send className="w-4 h-4" /> Send Feedback</>}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              Academic Progress
            </CardTitle>
            <CardDescription className="text-xs font-medium text-slate-400">Summary of your recent performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
              <span className="text-sm font-bold text-slate-600">Current Grade</span>
              <span className="text-xl font-black text-indigo-600">{student.grade}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
              <span className="text-sm font-bold text-slate-600">Attendance Rate</span>
              <span className="text-xl font-black text-indigo-600">{student.attendancePercentage}%</span>
            </div>
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
              <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">Professor's Note</p>
              <p className="text-sm text-slate-600 italic">"{student.feedback}"</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" />
              Parent Reporting
            </CardTitle>
            <CardDescription className="text-xs font-medium text-slate-400">Information shared with your guardians</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-500">Primary Contact</span>
                <span className="font-bold text-slate-900">{student.parentContact.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-500">Last Report Sent</span>
                <span className="font-bold text-slate-900">Today, 09:00 AM</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">Weekly Summary Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-bold text-emerald-700">Positive Engagement Report</span>
              </div>
            </div>
            <Button variant="outline" className="w-full h-11 rounded-xl border-slate-200 font-bold text-slate-600">
              View Full Parent Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
