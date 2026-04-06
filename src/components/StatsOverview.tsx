import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClassroomStats } from '../types';
import { Users, Brain, Zap, Moon, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

interface StatsOverviewProps {
  stats: ClassroomStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const items = [
    { title: 'Avg. Attention', value: `${stats.averageAttention}%`, icon: Brain, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Total Students', value: stats.totalStudents, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Focused', value: stats.focusedCount, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
    { title: 'Sleepy/Distracted', value: stats.sleepyCount + stats.distractedCount, icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { title: 'Away', value: stats.awayCount, icon: LogOut, color: 'text-slate-500', bg: 'bg-slate-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{item.title}</p>
                  <h3 className="text-2xl font-bold mt-1 text-slate-900">{item.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${item.bg}`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
