import React from "react";
import { roadmaps } from "../data/RoadmapData";
import { CheckCircle2, Terminal, Circle, Zap } from "lucide-react";

const RoadmapVisualization = ({ roadmapId, onTopicSelect }) => {
  const roadmap = roadmaps[roadmapId];
  if (!roadmap) return (
    <div className="flex flex-col items-center justify-center p-20 text-zinc-600">
      <Zap size={40} className="mb-4 opacity-20" />
      <span className="font-mono text-xs uppercase tracking-[0.3em]">Protocol Offline: Data Missing</span>
    </div>
  );

  const mainNodes = roadmap.nodes.filter(node => node.type === "main");

  return (
    <div className="relative w-full py-20 flex flex-col items-center select-none overflow-visible">
      
      {/* 1. CENTRAL NEURAL CORE (The "Trunk") */}
      <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-zinc-800 to-transparent left-1/2 -translate-x-1/2 z-0 opacity-40" />

      <div className="w-full max-w-5xl space-y-52 relative z-10">
        {mainNodes.map((node, index) => {
          // Alternating layout logic
          const isLeft = index % 2 === 0;

          return (
            <div key={node.id} className="relative flex flex-col items-center group">
              
              {/* 2. MAIN HUB MODULE (Centered Goal) */}
              <div 
                onClick={() => onTopicSelect({ title: node.title, description: node.description })}
                className="relative bg-zinc-950 border-2 border-purple-500/50 hover:border-purple-400 px-10 py-5 rounded-2xl font-bold uppercase text-xs cursor-pointer transition-all duration-300 z-20 flex items-center gap-3 active:scale-95 shadow-[0_0_40px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_50px_rgba(168,85,247,0.2)]"
              >
                <div className="absolute inset-0 bg-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Terminal size={18} className="text-purple-500" strokeWidth={3} />
                <span className="tracking-[0.2em] text-white relative">{node.title}</span>
              </div>

              {/* 3. DYNAMIC BRANCHING SYSTEM */}
              {node.children && (
                <div className={`absolute top-1/2 -translate-y-1/2 w-[48%] flex ${isLeft ? 'flex-row-reverse -left-[45%]' : 'flex-row -right-[45%]'} items-center`}>
                  
                  {/* S-CURVE VECTOR CONNECTOR */}
                  <div className="relative w-24 h-32 flex-shrink-0">
                    <svg className={`w-full h-full ${isLeft ? 'scale-x-1' : 'scale-x-[-1]'}`} viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path 
                        d="M 0 50 C 50 50, 50 0, 100 0" 
                        fill="none" 
                        stroke="#6b21a8" 
                        strokeWidth="2.5" 
                        strokeDasharray="8 6" 
                        className="opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </svg>
                  </div>

                  {/* 4. SUB-SKILL CLUSTERS */}
                  <div className={`flex flex-col gap-3 ${isLeft ? 'items-end pr-4' : 'items-start pl-4'}`}>
                    {node.children.map((childId) => {
                      const child = roadmap.nodes.find(n => n.id === childId);
                      if (!child) return null;
                      return (
                        <button 
                          key={child.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onTopicSelect({ title: child.title, description: child.description });
                          }}
                          className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 hover:border-purple-500/50 px-6 py-2.5 rounded-xl text-[11px] font-bold text-zinc-400 hover:text-white transition-all whitespace-nowrap flex items-center gap-3 shadow-xl active:translate-y-0.5 group/btn"
                        >
                          <Circle size={8} className="text-purple-600 fill-purple-600/20 group-hover/btn:fill-purple-500 transition-all" />
                          {child.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* 5. FINAL ARCHITECT GOAL */}
        <div className="flex flex-col items-center pt-20">
          <div className="w-24 h-24 rounded-[3rem] bg-zinc-950 border-2 border-purple-500 flex items-center justify-center shadow-[0_0_60px_rgba(168,85,247,0.3)] animate-pulse z-20">
            <CheckCircle2 size={40} className="text-purple-500" strokeWidth={3} />
          </div>
          <div className="mt-8 px-8 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full">
             <span className="font-mono text-[10px] text-purple-500 uppercase tracking-[0.5em] font-black">Architecture Mastery Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapVisualization;