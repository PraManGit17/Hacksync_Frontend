import React, { useEffect, useState } from 'react';
import { useInterview } from '../context/InterviewContext';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Target, Download, CheckCircle, ShieldAlert, ShieldCheck, MessageSquare, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const FeedbackReport = () => {
  const { interviewData } = useInterview();
  const [scores, setScores] = useState({ technical: 0, integrity: 100, communication: 0, total: 0 });

  useEffect(() => {
    // 1. Technical Score Logic
    const techBase = interviewData.transcripts.length > 0 ? 75 : 0;
    const technicalScore = Math.min(100, techBase + (interviewData.transcripts.length * 5));

    // 2. Integrity Score Calculation
    const integrityScore = Math.max(0, 100 - (interviewData.integrityFlags * 2));
    
    // 3. Communication Score
    const totalWords = interviewData.transcripts.reduce((acc, curr) => acc + curr.text.split(' ').length, 0);
    const commsScore = Math.min(100, (totalWords / (interviewData.transcripts.length || 1)) * 10);

    setScores({
      technical: Math.round(technicalScore),
      integrity: Math.round(integrityScore),
      communication: Math.round(commsScore),
      total: Math.round((technicalScore + integrityScore + commsScore) / 3)
    });
  }, [interviewData]);

  const chartData = [
    { subject: 'Technical', A: scores.technical, fullMark: 100 },
    { subject: 'Integrity', A: scores.integrity, fullMark: 100 },
    { subject: 'Communication', A: scores.communication, fullMark: 100 },
    { subject: 'Focus', A: 85, fullMark: 100 },
    { subject: 'Confidence', A: 90, fullMark: 100 },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans overflow-x-hidden">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-zinc-800 pb-10 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none">
              Interview <span className="text-purple-600">Artifact</span>
            </h1>
            <p className="text-zinc-500 font-mono text-[10px] mt-4 tracking-[0.4em] uppercase">
              Evaluation Hash: {Math.random().toString(36).substring(7).toUpperCase()} // Session Terminated
            </p>
          </motion.div>
          <div className="text-left md:text-right bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Candidate Path</p>
            <p className="text-xl font-black text-white italic uppercase tracking-tight">
              {interviewData.selectedRole || "MERN Stack"}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* PERFORMANCE RADAR */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 p-8 rounded-[3rem] bg-zinc-900/20 border border-zinc-800 backdrop-blur-xl"
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-purple-500 mb-8 flex items-center gap-3">
              <Target size={16}/> Neural Performance Matrix
            </h3>
            <div style={{ width: '100%', height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="#27272a" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 12, fontWeight: 'bold' }} />
                  <Radar name="Candidate" dataKey="A" stroke="#a855f7" fill="#a855f7" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* METRICS SIDEBAR */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
               whileHover={{ scale: 1.02 }}
               className="p-8 rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 flex items-center justify-between"
            >
              <div>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Total Readiness</p>
                <h4 className="text-6xl font-black tracking-tighter text-white italic">{scores.total}%</h4>
              </div>
              <Award size={48} className="text-purple-600 opacity-50" />
            </motion.div>

            <div className="p-8 rounded-[2.5rem] bg-zinc-900/10 border border-zinc-800 space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-600 border-b border-zinc-900 pb-4 flex items-center gap-2">
                <ShieldCheck size={14}/> Integrity Verification
              </h4>
              <div className="flex justify-between items-center text-sm font-mono">
                <span className="text-zinc-500 italic">Face Bounds Flags</span>
                <span className={interviewData.integrityFlags > 5 ? "text-red-500 animate-pulse" : "text-green-500"}>
                  {interviewData.integrityFlags}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm font-mono">
                <span className="text-zinc-500 italic">Communication Depth</span>
                <span className="text-purple-400">{scores.communication}%</span>
              </div>
            </div>

            <button 
              onClick={() => window.print()}
              className="w-full py-6 bg-white text-black rounded-[2rem] font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3"
            >
              <Download size={18} /> Export Intelligence Log
            </button>
          </div>
        </div>

        {/* TRANSCRIPT ARCHIVE */}
        <section className="space-y-6 pt-10">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 flex items-center gap-3">
            <MessageSquare size={16}/> Response Archive
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interviewData.transcripts.length > 0 ? (
              interviewData.transcripts.map((t, i) => (
                <div key={i} className="p-6 rounded-3xl bg-zinc-900/30 border border-zinc-800 font-mono text-sm group hover:border-purple-900 transition-colors">
                  <p className="text-purple-500 text-[10px] mb-3 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle size={10}/> Response Segment {i + 1}
                  </p>
                  <p className="text-zinc-400 italic leading-relaxed">"{t.text}"</p>
                </div>
              ))
            ) : (
              <div className="col-span-2 p-12 text-center border-2 border-dashed border-zinc-800 rounded-[3rem] text-zinc-600 italic">
                No verbal responses were archived.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FeedbackReport;