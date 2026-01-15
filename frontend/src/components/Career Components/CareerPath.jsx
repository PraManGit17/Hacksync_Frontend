import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, BookOpen, Cpu, ChevronDown } from 'lucide-react';
import Roadmap from '../Roadmap';

const CareerPath = () => {
  const roadmapRef = useRef(null);

  const scrollToRoadmap = () => {
    roadmapRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <h1 className="text-6xl font-bold tracking-tighter mb-4">
          SKILLSPHERE <span className="text-purple-500">INSIGHTS</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          AI-powered career trajectory for the future workforce.
        </p>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-32">
        <div className="md:col-span-2 relative group rounded-[2.5rem] border border-purple-900/30 bg-zinc-900/20 p-10 overflow-hidden transition-all hover:border-purple-500/40">
          <div className="absolute -right-10 -top-10 h-64 w-64 bg-purple-600/10 blur-[100px]" />
          <h2 className="text-purple-400 uppercase tracking-widest text-sm font-bold mb-4">Primary Path</h2>
          <div className="text-4xl font-semibold mb-6">AI Solutions Architect</div>
          <button onClick={scrollToRoadmap} className="bg-purple-600 text-white px-10 py-4 rounded-full font-bold hover:bg-purple-500 transition-all flex items-center gap-2">
            View Journey <ChevronDown size={18} />
          </button>
        </div>

        <div className="rounded-[2.5rem] border border-zinc-800 bg-zinc-900/40 p-8">
          <TrendingUp className="text-purple-400 mb-4" />
          <h3 className="text-xl font-medium mb-2 text-zinc-400">Market Demand</h3>
          <div className="text-4xl font-bold">+24%</div>
        </div>

        <div className="rounded-[2.5rem] border border-zinc-800 bg-zinc-900/40 p-8">
          <Target className="text-purple-400 mb-4" />
          <h3 className="text-xl font-medium mb-2 text-zinc-400">Readiness</h3>
          <div className="text-4xl font-bold text-white">82%</div>
        </div>
      </div>

      {/* Snake Roadmap Section */}
      <div ref={roadmapRef} className="pt-20 pb-40 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight">PREDICTIVE <span className="text-purple-500">MILESTONES</span></h2>
          <p className="text-zinc-500 mt-2">The winding path from student to industry leader.</p>
        </div>
        <Roadmap />
      </div>

    </div>
  );
};

export default CareerPath;