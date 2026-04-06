import React, { useState, useEffect, useMemo } from 'react';
import { Student, ClassroomStats, AttentionDataPoint, UserRole, StudentFeedback } from './types';
import { MOCK_STUDENTS, getClassroomStats } from './constants';
import { StatsOverview } from './components/StatsOverview';
import { AttentionChart } from './components/AttentionChart';
import { StudentGrid } from './components/StudentGrid';
import { StudentList } from './components/StudentList';
import { AIInsightsCard } from './components/AIInsightsCard';
import { StudentDetailModal } from './components/StudentDetailModal';
import { Login } from './components/Login';
import { Settings as SettingsPage } from './components/Settings';
import { StudentPortal } from './components/StudentPortal';
import { ParentPortal } from './components/ParentPortal';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, List, Activity, Bell, Settings, Search, Calendar as CalendarIcon, Clock, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

import { addFeedbackToStudent } from './lib/studentUtils';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentStudentId, setCurrentStudentId] = useState<string | null>(null);
  const [view, setView] = useState<'dashboard' | 'settings'>('dashboard');
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [history, setHistory] = useState<AttentionDataPoint[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Simulation: Update student scores every 5 seconds
  useEffect(() => {
    if (!isLoggedIn) return;
    
    const interval = setInterval(() => {
      setStudents(prev => prev.map(student => {
        if (student.status === 'away') return student;
        
        // Randomly fluctuate score
        const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
        const newScore = Math.max(0, Math.min(100, student.score + change));
        
        // Update status based on score
        let newStatus = student.status;
        if (newScore > 75) newStatus = 'focused';
        else if (newScore > 40) newStatus = 'distracted';
        else newStatus = 'sleepy';

        return {
          ...student,
          score: newScore,
          status: newStatus,
          history: [...student.history.slice(1), newScore],
          lastUpdate: new Date().toISOString()
        };
      }));
      
      setCurrentTime(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  // Update classroom history chart
  useEffect(() => {
    if (!isLoggedIn || userRole !== 'professor' || view !== 'dashboard') return;
    
    const stats = getClassroomStats(students);
    const newPoint = {
      time: format(new Date(), 'HH:mm:ss'),
      score: stats.averageAttention
    };
    setHistory(prev => [...prev.slice(-19), newPoint]);
  }, [students, isLoggedIn, userRole, view]);

  const stats = useMemo(() => getClassroomStats(students), [students]);

  const handleLogin = (userData: { email: string; role: UserRole; studentId?: string }) => {
    setIsLoggedIn(true);
    setUserRole(userData.role);
    if (userData.studentId) {
      setCurrentStudentId(userData.studentId);
      
      // Mark attendance when student logs in (simulating face scan)
      if (userData.role === 'student') {
        setStudents(prev => prev.map(s => {
          if (s.id === userData.studentId && s.attendanceStatus === 'absent') {
            const newAttended = s.attendedClasses + 1;
            return {
              ...s,
              attendanceStatus: 'present',
              attendedClasses: newAttended,
              attendancePercentage: Math.round((newAttended / s.totalClasses) * 100)
            };
          }
          return s;
        }));
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentStudentId(null);
    setView('dashboard');
  };

  const handleFeedbackSubmit = (feedback: Omit<StudentFeedback, 'id' | 'timestamp'>) => {
    setStudents(prev => prev.map(s => {
      if (s.id === feedback.studentId) {
        return addFeedbackToStudent(s, feedback);
      }
      return s;
    }));
  };

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const currentStudent = useMemo(() => 
    students.find(s => s.id === currentStudentId) || null
  , [students, currentStudentId]);

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('dashboard')}>
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center shadow-lg shadow-slate-400 overflow-hidden border border-slate-700">
                <div className="flex flex-col items-center justify-center -space-y-1">
                  <span className="text-[8px] font-black text-white uppercase tracking-tighter">smart</span>
                  <div className="w-4 h-[1px] bg-indigo-500" />
                  <span className="text-[8px] font-black text-indigo-400 uppercase tracking-tighter">CLASSROOM</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900">Smart Classroom</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Emotion Decoder</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {userRole === 'professor' && (
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search students..." 
                    className="bg-transparent border-none outline-none text-sm font-medium w-48 placeholder:text-slate-400"
                  />
                </div>
              )}
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                </button>
                {userRole === 'professor' && (
                  <button 
                    className={`p-2 transition-colors ${view === 'settings' ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
                    onClick={() => setView('settings')}
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                )}
                <button 
                  className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5" />
                </button>
                <div className="h-8 w-[1px] bg-slate-200 mx-2" />
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900">
                      {userRole === 'professor' ? 'Prof. Anderson' : userRole === 'parent' ? `Parent of ${currentStudent?.name.split(' ')[0]}` : currentStudent?.name}
                    </p>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                      {userRole === 'professor' ? 'Mathematics Dept.' : userRole === 'parent' ? 'Parent Access' : 'Student Portal'}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                    <img 
                      src={userRole === 'professor' ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Anderson" : currentStudent?.avatar} 
                      alt="Profile" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-[1600px] mx-auto px-6 py-8">
          <AnimatePresence mode="wait">
            {view === 'settings' ? (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <SettingsPage />
              </motion.div>
            ) : userRole === 'professor' ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col gap-8"
              >
                {/* Top Section: Stats & Time */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Classroom Dashboard</h2>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-sm font-bold text-slate-500">
                        <CalendarIcon className="w-4 h-4 text-indigo-500" />
                        {format(currentTime, 'EEEE, MMMM do')}
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      <div className="flex items-center gap-1.5 text-sm font-bold text-slate-500">
                        <Clock className="w-4 h-4 text-indigo-500" />
                        {format(currentTime, 'HH:mm:ss')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider">Live Monitoring Active</span>
                    </div>
                  </div>
                </div>

                {/* Stats Overview */}
                <StatsOverview stats={stats} />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Visual Monitoring & Analytics */}
                  <div className="lg:col-span-8 space-y-8">
                    {/* Live Classroom View */}
                    <Card className="border-none shadow-sm bg-white overflow-hidden rounded-3xl">
                      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-4">
                        <div>
                          <CardTitle className="text-lg font-bold text-slate-900">Live Classroom View</CardTitle>
                          <CardDescription className="text-xs font-medium text-slate-400">Interactive seating arrangement and attention indicators</CardDescription>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg border border-slate-100">
                          <button className="p-1.5 bg-white shadow-sm rounded-md text-indigo-600"><LayoutGrid className="w-4 h-4" /></button>
                          <button className="p-1.5 text-slate-400 hover:text-slate-600"><List className="w-4 h-4" /></button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <StudentGrid students={students} onSelectStudent={handleSelectStudent} />
                      </CardContent>
                    </Card>

                    {/* Attention Trends */}
                    <Card className="border-none shadow-sm bg-white rounded-3xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-bold text-slate-900">Class Attention Trends</CardTitle>
                        <CardDescription className="text-xs font-medium text-slate-400">Average classroom attention score over time</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <AttentionChart data={history} />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Column: AI Insights & Student List */}
                  <div className="lg:col-span-4 space-y-8">
                    {/* AI Insights */}
                    <AIInsightsCard students={students} />

                    {/* Student Ranking/List */}
                    <Card className="border-none shadow-sm bg-white rounded-3xl">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-bold text-slate-900">Student Engagement</CardTitle>
                        <CardDescription className="text-xs font-medium text-slate-400">Real-time attention ranking</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0 px-6 pb-6">
                        <Tabs defaultValue="all" className="w-full">
                          <TabsList className="grid w-full grid-cols-3 mb-6 bg-slate-50 p-1 rounded-xl">
                            <TabsTrigger value="all" className="text-xs font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">All</TabsTrigger>
                            <TabsTrigger value="focused" className="text-xs font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Focused</TabsTrigger>
                            <TabsTrigger value="distracted" className="text-xs font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Distracted</TabsTrigger>
                          </TabsList>
                          <TabsContent value="all" className="mt-0">
                            <StudentList students={students} onSelectStudent={handleSelectStudent} />
                          </TabsContent>
                          <TabsContent value="focused" className="mt-0">
                            <StudentList students={students.filter(s => s.status === 'focused')} onSelectStudent={handleSelectStudent} />
                          </TabsContent>
                          <TabsContent value="distracted" className="mt-0">
                            <StudentList students={students.filter(s => s.status !== 'focused')} onSelectStudent={handleSelectStudent} />
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ) : userRole === 'student' && currentStudent ? (
              <motion.div
                key="student-portal"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <StudentPortal 
                  student={currentStudent} 
                  onFeedbackSubmit={handleFeedbackSubmit} 
                />
              </motion.div>
            ) : userRole === 'parent' && currentStudent ? (
              <motion.div
                key="parent-portal"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <ParentPortal student={currentStudent} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </main>

        {/* Student Detail Modal */}
        <StudentDetailModal 
          student={selectedStudent} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </TooltipProvider>
  );
}
