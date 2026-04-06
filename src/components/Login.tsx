import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Fingerprint, ShieldCheck, Mail, Phone, ArrowRight, Loader2, GraduationCap, UserCog, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (userData: { email: string; role: UserRole; studentId?: string }) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0); // 0: Role, 1: Credentials, 2: Face, 3: Aadhar
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<UserRole>('student');
  const [formData, setFormData] = useState({ email: '', phone: '', aadhar: '' });

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(1);
  };

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === 'professor' && step === 1) {
        // Professor only needs credentials for this demo
        onLogin({ email: formData.email, role: 'professor' });
      } else {
        setStep((prev) => (prev + 1) as any);
      }
    }, 1500);
  };

  const handleFinalize = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // For student, we'll assume the first student in mock data for demo if email matches or just use a default
      onLogin({ email: formData.email, role: role, studentId: '1' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-3xl overflow-hidden bg-white">
        <div className="h-2 bg-slate-900" />
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center shadow-xl shadow-slate-300 overflow-hidden border-2 border-slate-700">
              <div className="flex flex-col items-center justify-center -space-y-1">
                <span className="text-[10px] font-black text-white uppercase tracking-tighter">smart</span>
                <div className="w-6 h-[1px] bg-indigo-500" />
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">CLASSROOM</span>
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Smart Classroom Login</CardTitle>
          <CardDescription className="text-xs font-medium text-slate-500 max-w-[250px] mx-auto">
            AI decodes emotions through just your eyes — even if your face is masked.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                <p className="text-center text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Select Your Role</p>
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={() => handleRoleSelect('professor')}
                    className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all group text-left"
                  >
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                      <UserCog className="w-6 h-6 text-indigo-600 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Professor Access</p>
                      <p className="text-xs text-slate-500">Manage classrooms and monitor students</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => handleRoleSelect('student')}
                    className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all group text-left"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                      <GraduationCap className="w-6 h-6 text-emerald-600 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Student Portal</p>
                      <p className="text-xs text-slate-500">View your progress and give feedback</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => handleRoleSelect('parent')}
                    className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all group text-left"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center group-hover:bg-amber-600 transition-colors">
                      <Users className="w-6 h-6 text-amber-600 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Parent Reporting</p>
                      <p className="text-xs text-slate-500">Track your child's classroom engagement</p>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email or Phone</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input 
                        id="email" 
                        placeholder={role === 'professor' ? "Professor Email" : "Student/Parent Email"} 
                        className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-indigo-500"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-200"
                  onClick={handleNext}
                  disabled={loading || !formData.email}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Continue'}
                </Button>
                <button onClick={() => setStep(0)} className="w-full text-center text-xs font-bold text-slate-400 hover:text-slate-600">Back to Role Selection</button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 text-center"
              >
                <div className="w-48 h-48 mx-auto bg-slate-100 rounded-full flex items-center justify-center border-4 border-dashed border-indigo-200 relative overflow-hidden">
                  <Camera className="w-12 h-12 text-indigo-300" />
                  <div className="absolute inset-0 border-2 border-indigo-500 rounded-full animate-pulse opacity-50" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Face Recognition</h3>
                  <p className="text-sm text-slate-500">Please look into the camera for verification</p>
                </div>
                <Button 
                  className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                  onClick={handleNext}
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify Face'}
                </Button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="aadhar" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Aadhar Number</Label>
                    <div className="relative">
                      <Fingerprint className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input 
                        id="aadhar" 
                        placeholder="XXXX XXXX XXXX" 
                        className="pl-10 h-12 rounded-xl border-slate-200"
                        value={formData.aadhar}
                        onChange={(e) => setFormData({ ...formData, aadhar: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Your Aadhar data is processed securely and used only for identity verification purposes.
                  </p>
                </div>
                <Button 
                  className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                  onClick={handleFinalize}
                  disabled={loading || formData.aadhar.length < 12}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Verification'}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};
