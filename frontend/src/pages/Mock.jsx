import React from "react";
import FaceTracking from "../components/Interview Components/FaceTracking";
// import { Subtitles } from "lucide-react";
import Questions from "../components/Interview Components/Questions";
import Subtitles from "../components/Interview Components/Subtitles";


const Mock = () => {
  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex flex-col p-6 font-sans overflow-hidden">
      {/* 1. HUD Header */}
      <div className="flex justify-between items-center h-[10%] w-full bg-zinc-900/40 border border-zinc-800 shadow-2xl rounded-[2rem] px-8 mb-6">
        <h1 className="text-3xl font-black italic tracking-tighter uppercase">
          Neural <span className="text-purple-600">Interface</span>
        </h1>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-black border border-zinc-800 rounded-full text-[10px] font-mono tracking-widest text-purple-400">
            PROCTOR_ACTIVE
          </div>
        </div>
      </div>

      {/* 2. Main Simulation Grid */}
      <div className="flex flex-col md:flex-row h-[85%] w-full gap-6 px-2">
        
        {/* Left Section: Visual & Audio Logs */}
        <div className="h-full w-full md:w-[40%] flex flex-col gap-6">
          {/* Camera Feed with TensorFlow Overlay */}
          <div className="h-[55%] w-full bg-zinc-900/50 border-2 border-zinc-800 rounded-[3rem] relative overflow-hidden shadow-2xl">
            <FaceTracking />
          </div>

          {/* Real-time Subtitles */}
          <div className="h-[40%] w-full bg-zinc-900/20 border-2 border-zinc-800 rounded-[2.5rem] p-6">
            <Subtitles />
          </div>
        </div>

        {/* Right Section: Question Engine */}
        <div className="h-full w-full md:w-[60%] bg-zinc-900/10 border-2 border-zinc-800 rounded-[3rem] p-8">
          <Questions />
        </div>
      </div>
    </div>
  );
};

export default Mock;