import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Cpu, BarChart3, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { useInterview } from '../context/InterviewContext';
import RoleCard from '../components/Interview Components/RoleCard';

const InterviewDashboard = () => {
  const { updateInterview } = useInterview();
  const navigate = useNavigate();

  const handleSelect = (role) => {
    updateInterview({ selectedRole: role, startTime: Date.now() });
    navigate('/interview-lobby');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-12 font-sans selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl font-black tracking-tighter italic uppercase leading-none">
              Interview <span className="text-purple-600">Command</span>
            </h1>
            <p className="text-zinc-500 font-mono text-xs mt-4 tracking-[0.4em] uppercase">
              Select Neural Path // Initialize Simulation
            </p>
          </motion.div>

          {/* Quick Stats Bento (Placeholder for actual score logic) */}
          <div className="flex gap-4">
            <div className="px-6 py-4 bg-zinc-900/40 border border-zinc-800 rounded-3xl flex items-center gap-4">
              <div className="text-purple-500"><BarChart3 size={20}/></div>
              <div>
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Avg Readiness</p>
                <p className="text-lg font-black italic">84%</p>
              </div>
            </div>
          </div>
        </header>

        {/* ROLE SELECTION GRID */}
        <div className="space-y-8">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700">Available Specializations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RoleCard 
              role="FULL-STACK" 
              icon={Code2} 
              description="Focuses on MERN stack, REST APIs, and system architecture."
              onSelect={handleSelect}
            />
            <RoleCard 
              role="COMPUTER-ENGINEER" 
              icon={Cpu} 
              description="Focuses on AI integration, hardware-software logic, and Gemini APIs."
              onSelect={handleSelect}
            />
          </div>
        </div>

        {/* SYSTEM CAPABILITIES FOOTER */}
        <footer className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-zinc-900">
          <div className="flex items-center gap-4 p-6 rounded-3xl bg-zinc-900/10 border border-zinc-800">
            <ShieldCheck size={24} className="text-purple-600" />
            <div>
              <p className="text-[10px] font-bold uppercase text-zinc-500">AI Proctoring</p>
              <p className="text-xs text-zinc-400">TensorFlow Gaze Tracking</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 rounded-3xl bg-zinc-900/10 border border-zinc-800">
            <Zap size={24} className="text-purple-600" />
            <div>
              <p className="text-[10px] font-bold uppercase text-zinc-500">Voice Synthesis</p>
              <p className="text-xs text-zinc-400">Neural Text-to-Speech</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 rounded-3xl bg-zinc-900/10 border border-zinc-800">
            <Code2 size={24} className="text-purple-600" />
            <div>
              <p className="text-[10px] font-bold uppercase text-zinc-500">Artifact Generation</p>
              <p className="text-xs text-zinc-400">PDF Performance Export</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default InterviewDashboard;