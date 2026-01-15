import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Globe, Server, Database, ShieldCheck, ArrowRight } from "lucide-react";

const roadmapOptions = [
  {
    id: "frontend",
    title: "Frontend Engineer",
    icon: <Globe size={32} />,
    description: "Master user interfaces, React architecture, and performance optimization.",
    color: "border-blue-500/20 hover:border-blue-500/50",
    accent: "bg-blue-500",
  },
  {
    id: "backend",
    title: "Backend Engineer",
    icon: <Server size={32} />,
    description: "Architect scalable APIs, distributed systems, and secure server logic.",
    color: "border-emerald-500/20 hover:border-emerald-500/50",
    accent: "bg-emerald-500",
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    icon: <Database size={32} />,
    description: "Build robust data pipelines, ETL processes, and analytical infrastructure.",
    color: "border-purple-500/20 hover:border-purple-500/50",
    accent: "bg-purple-500",
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    icon: <ShieldCheck size={32} />,
    description: "Automate deployment cycles, manage cloud infra, and ensure CI/CD reliability.",
    color: "border-orange-500/20 hover:border-orange-500/50",
    accent: "bg-orange-500",
  },
];

const RoadmapsIndexPage = () => {
  return (
    <div className="min-h-screen bg-[#080808] text-zinc-100 font-sans tracking-tight">
      <Navbar />
      
      <main className="max-w-[1400px] mx-auto px-6 md:px-10 pt-32 pb-20">
        <header className="max-w-3xl mb-16 space-y-6">
          <div className="flex items-center gap-3 text-purple-500 font-mono text-[10px] uppercase tracking-[0.5em]">
            SkillSphere / Development Paths
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter">
            Career<span className="text-purple-600">Roadmaps</span>
          </h1>
          <p className="text-zinc-500 text-lg font-medium leading-relaxed">
            Professional learning trajectories designed by industry experts. Choose your specialization to access the granular technical breakdown.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roadmapOptions.map((option) => (
            <Link to={`/roadmaps/${option.id}`} key={option.id} className="group">
              <div className={`h-full bg-zinc-900/20 border-2 ${option.color} rounded-[2.5rem] p-10 transition-all duration-300 hover:bg-zinc-900/40 relative overflow-hidden backdrop-blur-sm`}>
                <div className={`w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 text-white shadow-xl transition-transform group-hover:scale-110`}>
                  {option.icon}
                </div>
                
                <h2 className="text-2xl font-bold mb-3 text-white">{option.title}</h2>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-sm">{option.description}</p>
                
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-300">
                  Analyze Path <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Decorative Accent */}
                <div className={`absolute bottom-0 right-0 w-32 h-32 ${option.accent} opacity-[0.03] blur-3xl`} />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RoadmapsIndexPage;