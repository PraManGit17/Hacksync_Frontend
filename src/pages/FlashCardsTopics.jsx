import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Cpu, Globe, ArrowRight, Clock, Brain, Layout } from "lucide-react";
import Navbar from "../components/Navbar";

const FlashCardsTopics = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Core Engineering",
      icon: <Cpu size={18} />,
      topics: [
        { name: "JavaScript", icon: "JS", desc: "Temporal Dead Zone, Closures, Prototypes", color: "from-yellow-500/10", border: "border-yellow-500/20" },
        { name: "System Design", icon: "SD", desc: "Load Balancing, Sharding, CAP Theorem", color: "from-green-500/10", border: "border-green-500/20" },
      ]
    },
    {
      title: "Frontend Mastery",
      icon: <Globe size={18} />,
      topics: [
        { name: "React", icon: "⚛", desc: "Reconciliation, Hooks, Context API", color: "from-blue-500/10", border: "border-blue-500/20" },
        { name: "Web Dev", icon: "HTML", desc: "DOM, CSS Grid, Semantic Markup", color: "from-orange-500/10", border: "border-orange-500/20" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-100 font-sans selection:bg-purple-500/30">
      <Navbar />

      {/* Background HUD Elements */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Content: pt-32 ensures it starts below the fixed navbar */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-10 pt-32 pb-24 relative z-10">
        
        {/* SECTION HEADER */}
        <header className="max-w-3xl mb-16 space-y-6">
          <div className="flex items-center gap-3 text-purple-500 font-mono text-[10px] uppercase tracking-[0.5em]">
            <Layout size={12} /> Intelligence Repository v.2.0
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter leading-tight">
            Skill<span className="text-zinc-500 text-purple-600">Library</span>
          </h1>
          <p className="text-zinc-500 text-lg font-medium leading-relaxed">
            Select a specialized module to begin active recall training. These decks are engineered to stabilize technical knowledge for senior-level assessments.
          </p>
        </header>

        {/* STATUS BAR */}
        <div className="mb-12 flex items-center gap-4">
          <div className="bg-zinc-900/50 border border-zinc-800 px-5 py-2.5 rounded-xl flex items-center gap-3 shadow-sm">
             <Clock size={14} className="text-purple-500" />
             <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
               Last Session: <span className="text-zinc-200">React Reconciliation</span>
             </span>
          </div>
        </div>

        {/* TOPICS CATEGORIES */}
        <div className="space-y-20">
          {categories.map((cat, idx) => (
            <section key={idx} className="space-y-8">
              {/* Category Title: No Italic, Proper Alignment */}
              <div className="flex items-center gap-3 border-b border-zinc-800/60 pb-5">
                <div className="p-2 bg-zinc-900 rounded-lg text-purple-500 border border-zinc-800">
                  {cat.icon}
                </div>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
                  {cat.title}
                </h2>
              </div>

              {/* Grid: 2 Columns with balanced spacing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {cat.topics.map((topic) => (
                  <div 
                    key={topic.name}
                    onClick={() => navigate(`/flash-cards/${topic.name}`)}
                    className={`group relative p-8 rounded-3xl bg-zinc-900/20 border border-zinc-800/50 hover:border-purple-500/40 hover:bg-zinc-900/40 transition-all duration-300 cursor-pointer overflow-hidden shadow-sm`}
                  >
                    {/* Background Subtle Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className="relative z-10 flex justify-between items-center">
                      <div className="flex items-center gap-6">
                        {/* Icon Box */}
                        <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg font-bold text-white shadow-inner group-hover:border-purple-500/50 transition-colors">
                          {topic.icon}
                        </div>
                        {/* Text Alignment */}
                        <div className="space-y-1">
                          <h3 className="text-xl font-bold text-white tracking-tight">
                            {topic.name}
                          </h3>
                          <p className="text-zinc-500 text-xs font-medium tracking-wide">
                            {topic.desc}
                          </p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-600 transition-all duration-300">
                        <ArrowRight size={16} className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* RE-ARCHITECTED FOOTER CTA */}
        <footer className="mt-24 p-12 rounded-[2.5rem] bg-zinc-900/10 border border-zinc-800/60 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6 text-left">
            <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 shadow-xl text-purple-500">
               <Brain size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Custom Intelligence Request</h3>
              <p className="text-zinc-500 text-sm max-w-sm">Our AI can architect specialized decks for any niche stack or architecture.</p>
            </div>
          </div>
          <button className="whitespace-nowrap px-10 py-4 bg-white text-black rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-purple-600 hover:text-white transition-all shadow-xl active:scale-95">
            Initialize Custom Deck
          </button>
        </footer>
      </main>
    </div>
  );
};

export default FlashCardsTopics;