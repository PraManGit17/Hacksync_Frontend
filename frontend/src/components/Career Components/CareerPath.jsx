// import React, { useRef } from 'react';
// import { motion } from 'framer-motion';
// import { TrendingUp, Target, BookOpen, Cpu, ChevronDown } from 'lucide-react';
// import Roadmap from '../Roadmap';

// const CareerPath = () => {
//   const roadmapRef = useRef(null);

//   const scrollToRoadmap = () => {
//     roadmapRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div className="flex flex-col items-center border-2 border-white w-full h-screen bg-black text-white p-8 font-sans no-scrollbar selection:bg-purple-500/30 overflow-x-hidden">

//       {/* Header */}
//       <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
//         <h1 className="text-6xl font-bold tracking-tighter mb-4">
//           SKILLSPHERE <span className="text-purple-500">INSIGHTS</span>
//         </h1>
//         <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
//           AI-powered career trajectory for the future workforce.
//         </p>
//       </motion.div>

//       {/* Bento Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-32">
//         <div className="md:col-span-2 relative group rounded-[2.5rem] border border-purple-900/30 bg-zinc-900/20 p-10 overflow-hidden transition-all hover:border-purple-500/40">
//           <div className="absolute -right-10 -top-10 h-64 w-64 bg-purple-600/10 blur-[100px]" />
//           <h2 className="text-purple-400 uppercase tracking-widest text-sm font-bold mb-4">Primary Path</h2>
//           <div className="text-4xl font-semibold mb-6">AI Solutions Architect</div>
//           <button onClick={scrollToRoadmap} className="bg-purple-600 text-white px-10 py-4 rounded-full font-bold hover:bg-purple-500 transition-all flex items-center gap-2">
//             View Journey <ChevronDown size={18} />
//           </button>
//         </div>

//         <div className="rounded-[2.5rem] border border-zinc-800 bg-zinc-900/40 p-8">
//           <TrendingUp className="text-purple-400 mb-4" />
//           <h3 className="text-xl font-medium mb-2 text-zinc-400">Market Demand</h3>
//           <div className="text-4xl font-bold">+24%</div>
//         </div>

//         <div className="rounded-[2.5rem] border border-zinc-800 bg-zinc-900/40 p-8">
//           <Target className="text-purple-400 mb-4" />
//           <h3 className="text-xl font-medium mb-2 text-zinc-400">Readiness</h3>
//           <div className="text-4xl font-bold text-white">82%</div>
//         </div>
//       </div>

//       {/* Snake Roadmap Section */}
//       {/* <div ref={roadmapRef} className="pt-20 pb-40 max-w-5xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold tracking-tight">PREDICTIVE <span className="text-purple-500">MILESTONES</span></h2>
//           <p className="text-zinc-500 mt-2">The winding path from student to industry leader.</p>
//         </div>
//         <Roadmap />
//       </div> */}

//     </div>
//   );
// };

// export default CareerPath;


import React from 'react'
import { ChevronRight, DollarSign, Target, TrendingUp } from 'lucide-react';


const CareerPath = () => {
  return (
    <div className='relative z-10 black_bg h-screen w-full flex justify-center items-center overflow-hidden '>

      <div className='absolute z-0 w-[50%] h-full '>
        <div className='absolute z-0 rotate-45 h-200 w-20 bg-[#360ba1] -bottom-50 -left-75 opacity-75 '></div>
        <div className='absolute z-0 rotate-315 h-150 w-20 bg-[#360ba1] bottom-25  right-90 opacity-75'></div>
        <div className='absolute z-0 rotate-45 h-200 w-20 bg-[#360ba1] -top-70 -right-75 opacity-75'></div>
      </div>


      <div className="relative z-10 text-white w-full h-screen flex flex-col items-center gap-5">

        <div className='flex flex-col poppins-bold leading-relaxed mt-30 text-center flex items-center gap-2 text-white'>
          <div className='text-4xl max-w-[1200px]'><span className='text-5xl'>SKILLSPHERE</span>  designs a clear path from where you are today, To where you want to be tomorrow.</div>
          {/* <div>Get actionable milestones, skill recommendations, and role-specific guidance—all tailored to your goals.</div> */}
        </div>

        <div className='relative flex flex-col gap-4 poppins mt-15 text-xl'>
          Enter Your Preferred Domain In Which Your Interested To Forged Your Career
          <input
            placeholder='Enter Domain/Role'
            className='border-2 mt-2 border-white backdrop-blur-md bg-white/5 rounded-xl px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
          />
          <button className='absolute right-1 bottom-1.5'>
            <ChevronRight className='text-white w-8 h-8' />
          </button>
        </div>

        <div className='flex items-center justify-center gap-20 w-[70%] mt-20'>

          <div className='backdrop-blur-md bg-white/0 flex flex-col gap-2 items-start w-[17%] p-5  border-2 border-white rounded-2xl'>
            <Target className='scale-150 text-[#5b34bf]' />
            <div className='mt-8 poppins-bold text-xl text-[#5b34bf]'>Readiness</div>
            <div className='poppins-bold text-xl text-[#5b34bf]'>68%</div>
          </div>

          <div className='backdrop-blur-md bg-white/0 flex flex-col gap-2 items-start w-[17%] p-5 border-2 border-white rounded-2xl'>
            <TrendingUp className='scale-150 text-[#5b34bf]' />
            <div className='mt-8 poppins-bold text-xl text-[#5b34bf]'>Trend</div>
            <div className='poppins-bold text-xl text-[#5b34bf]'>12%</div>
          </div>

          <div className='backdrop-blur-md bg-white/0  flex flex-col gap-2 items-start w-[17%] p-5 border-2 border-white rounded-2xl'>
            <DollarSign className='scale-150 text-[#5b34bf]' />
            <div className='mt-8 poppins-bold text-xl text-[#5b34bf]'>Payout</div>
            <div className='poppins-bold text-xl text-[#5b34bf]'>3K/month</div>
          </div>

          <div className='backdrop-blur-md bg-white/0 flex flex-col gap-2 items-start w-[17%] p-5 border-2 border-white rounded-2xl'>
            <Target className='scale-150 text-[#5b34bf]' />
            <div className='mt-8 poppins-bold text-xl text-[#5b34bf]'>Readiness</div>
            <div className='poppins-bold text-xl text-[#5b34bf]'>68%</div>
          </div>

        </div>
      </div>
    </div >
  )
}

export default CareerPath


