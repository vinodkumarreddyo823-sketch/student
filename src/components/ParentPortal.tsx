import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Student } from '../types';
import { AttentionChart } from './AttentionChart';
import { Users, TrendingUp, Calendar, ShieldCheck, Download, Bell, MessageCircle } from 'lucide-react';

interface ParentPortalProps {
  student: Student;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({ student }) => {
  const chartData = student.history.map((score, i) => ({
    time: `${i}m ago`,
    score
  })).reverse();

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Parent Report: {student.name}</h2>
          <p className="text-slate-500 mt-1 font-medium">Monitoring your child's classroom engagement and academic progress.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600 flex items-center gap-2">
            <Download className="w-4 h-4" /> Export PDF
          </Button>
          <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> Contact Teacher
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-500" />
                Live Engagement Tracking
              </CardTitle>
              <CardDescription className="text-xs font-medium text-slate-400">Real-time attention monitoring during current session</CardDescription>
            </div>
            <div className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Live</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Focus</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-slate-900">{student.score}%</span>
                  <span className="text-xs font-bold text-emerald-500 mb-1">Stable</span>
                </div>
                <Progress value={student.score} className="h-1.5 mt-3 bg-slate-200" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Weekly Average</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-slate-900">92%</span>
                  <span className="text-xs font-bold text-emerald-500 mb-1">High</span>
                </div>
                <Progress value={92} className="h-1.5 mt-3 bg-slate-200" />
              </div>
            </div>
            <div className="h-[200px]">
              <AttentionChart data={chartData} />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-indigo-500" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 items-start p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Attendance Verified</p>
                  <p className="text-[10px] text-slate-500">Face & Aadhar verification successful at 08:30 AM.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Weekly Report Ready</p>
                  <p className="text-[10px] text-slate-500">Your weekly summary for Mathematics is available.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-indigo-600 text-white">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Teacher's Feedback</h4>
                <p className="text-sm text-indigo-100 mt-1 leading-relaxed italic">
                  "{student.feedback}"
                </p>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anderson" alt="Teacher" />
                </div>
                <div className="text-[10px]">
                  <p className="font-bold">Prof. Anderson</p>
                  <p className="text-indigo-200">Mathematics Dept.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">Academic Summary</CardTitle>
          <CardDescription className="text-xs font-medium text-slate-400">Overall performance metrics for the current semester</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Grade</p>
              <p className="text-2xl font-black text-indigo-600">{student.grade}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Attendance</p>
              <p className="text-2xl font-black text-indigo-600">{student.attendancePercentage}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Focus Rank</p>
              <p className="text-2xl font-black text-indigo-600">#3 in Class</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assignments</p>
              <p className="text-2xl font-black text-indigo-600">12/12 Done</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
