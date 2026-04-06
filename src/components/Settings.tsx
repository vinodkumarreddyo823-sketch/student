import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell, Shield, User, Database, Globe, Moon, Sun, Save } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Settings</h2>
        <p className="text-slate-500 mt-1 font-medium">Manage your classroom preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm">
            <User className="w-4 h-4" /> Profile Settings
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors">
            <Bell className="w-4 h-4" /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors">
            <Shield className="w-4 h-4" /> Security & Privacy
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors">
            <Database className="w-4 h-4" /> Database Sync
          </button>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-slate-900">Profile Information</CardTitle>
              <CardDescription className="text-xs font-medium text-slate-400">Update your teacher profile details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs font-bold text-slate-500 uppercase tracking-wider">First Name</Label>
                  <Input id="firstName" defaultValue="Anderson" className="h-11 rounded-xl border-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Name</Label>
                  <Input id="lastName" defaultValue="Prof." className="h-11 rounded-xl border-slate-200" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</Label>
                <Input id="email" defaultValue="anderson@school.edu" className="h-11 rounded-xl border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dept" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Department</Label>
                <Input id="dept" defaultValue="Mathematics" className="h-11 rounded-xl border-slate-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-slate-900">Preferences</CardTitle>
              <CardDescription className="text-xs font-medium text-slate-400">System-wide behavior and appearance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold text-slate-900">Dark Mode</Label>
                  <p className="text-xs text-slate-400 font-medium">Switch between light and dark themes.</p>
                </div>
                <Switch />
              </div>
              <Separator className="bg-slate-50" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold text-slate-900">Real-time Sync</Label>
                  <p className="text-xs text-slate-400 font-medium">Automatically sync data with Firebase.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-slate-50" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold text-slate-900">AI Insights</Label>
                  <p className="text-xs text-slate-400 font-medium">Enable AI-powered classroom analysis.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="ghost" className="h-11 rounded-xl font-bold text-slate-500">Cancel</Button>
            <Button className="h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
