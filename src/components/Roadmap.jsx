import React from 'react';
import { motion } from 'framer-motion';
import { roadmapSteps } from '../data/RoadmapData';

const Roadmap = () => {
  return (
    <div className="relative h-[1200px] w-full mt-20 0">
      {/* SVG scaled to 100x100 viewbox so the path 'd' values 
          match your RoadmapData x and y percentages exactly.
      */}
      <svg 
        className="absolute top-0 left-0 w-full h-full fill-none" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        {/* Background Trace Line */}
        <path 
          d="M 25 5 C 90 15, 90 20, 75 28 C 10 40, 10 45, 25 51 C 90 65, 90 70, 75 74 C 50 85, 50 90, 50 95" 
          stroke="#1e1b4b" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
        />
        
        {/* Animated Purple Path */}
        <motion.path 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          d="M 25 5 C 90 15, 90 20, 75 28 C 10 40, 10 45, 25 51 C 90 65, 90 70, 75 74 C 50 85, 50 90, 50 95" 
          stroke="#a855f7" 
          strokeWidth="0.8" 
          strokeLinecap="round" 
          style={{ filter: "drop-shadow(0 0 2px rgba(168, 85, 247, 0.8))" }}
        />
      </svg>

      {/* Rendering the Milestones */}
      {roadmapSteps.map((step, idx) => {
        // Calculate if the card should be on the left or right of the node
        const isOnLeftSide = parseFloat(step.x) < 50;

        return (
          <motion.div 
            key={step.id}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: "-100px" }}
            style={{ left: step.x, top: step.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="group relative flex flex-col items-center">
              {/* The Node Dot */}
              <div className={`w-12 h-12 rounded-full border-4 border-black flex items-center justify-center transition-all duration-500 z-10 ${
                step.status === 'completed' ? 'bg-purple-500 shadow-[0_0_20px_#a855f7]' : 
                step.status === 'current' ? 'bg-white shadow-[0_0_25px_white]' : 'bg-zinc-900 border-zinc-800'
              }`}>
                 <step.icon size={20} className={step.status === 'locked' ? 'text-zinc-600' : 'text-black'} />
              </div>

              {/* Label Card - Correctly aligned based on x-coordinate */}
              <div className={`absolute top-0 w-64 p-5 rounded-2xl border border-zinc-800 bg-black/90 backdrop-blur-md transition-all group-hover:border-purple-500/50 ${
                isOnLeftSide ? 'right-16 text-right' : 'left-16 text-left'
              }`}>
                 <h4 className="font-bold text-white text-lg leading-tight">{step.title}</h4>
                 <p className="text-zinc-500 text-sm mt-2 font-medium">{step.desc}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Roadmap;