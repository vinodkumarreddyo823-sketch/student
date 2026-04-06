import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, RefreshCcw, BrainCircuit } from 'lucide-react';
import { getTeacherInsights } from '../lib/gemini';
import { Student } from '../types';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';

interface AIInsightsCardProps {
  students: Student[];
}

export const AIInsightsCard: React.FC<AIInsightsCardProps> = ({ students }) => {
  const [insights, setInsights] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const generateInsights = async () => {
    setLoading(true);
    const dataString = students.map(s => `${s.name}: ${s.status} (${s.score}%)`).join(', ');
    const result = await getTeacherInsights(dataString);
    setInsights(result);
    setLoading(false);
  };

  useEffect(() => {
    generateInsights();
  }, []);

  return (
    <Card className="border-none shadow-sm bg-gradient-to-br from-indigo-50/50 to-white backdrop-blur-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2 text-indigo-900">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          AI Teacher Insights
        </CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={generateInsights} 
          disabled={loading}
          className="h-8 w-8 hover:bg-indigo-100 text-indigo-600"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 space-y-4"
            >
              <div className="relative">
                <BrainCircuit className="w-12 h-12 text-indigo-200 animate-pulse" />
                <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-sm font-medium text-indigo-400">Analyzing classroom dynamics...</p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-sm max-w-none prose-indigo prose-p:text-slate-600 prose-li:text-slate-600"
            >
              <ReactMarkdown>{insights}</ReactMarkdown>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
