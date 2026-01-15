import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { Camera, Mic, ShieldAlert, Zap, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

const InterviewLobby = () => {
  const { interviewData, updateInterview } = useInterview();
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // 1. Request Media Permissions
  const setupMedia = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      updateInterview({ isHardwareReady: true });
    } catch (err) {
      console.error("Hardware access denied:", err);
      alert("Please enable Camera and Microphone to proceed.");
    }
  };

  // 2. Trigger Full-Screen and Start
  const startInterview = async () => {
    try {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      }
      updateInterview({ isFullscreen: true });
      navigate('/interview-room');
    } catch (err) {
      console.error("Fullscreen failed:", err);
    }
  };

  useEffect(() => {
    setupMedia();
    // Cleanup stream on unmount
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
        
        {/* Left: Camera Preview */}
        <div className="space-y-6">
          <div className="relative aspect-video rounded-[2.5rem] bg-zinc-900 overflow-hidden border border-zinc-800 shadow-2xl">
            {stream ? (
              <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-zinc-600">
                <Camera size={48} className="mb-4 animate-pulse" />
                <p className="text-xs uppercase font-mono">Initializing Optics...</p>
              </div>
            )}
            <div className="absolute bottom-6 left-6 flex gap-2">
              <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-mono flex items-center gap-2 border border-zinc-700">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> CAM_ACTIVE
              </span>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-purple-500"><Mic size={20}/></div>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-purple-500"><Monitor size={20}/></div>
          </div>
        </div>

        {/* Right: Security & Start */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">
              Neural <span className="text-purple-600">Verification</span>
            </h2>
            <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest">Target Role: {interviewData.selectedRole}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <ShieldAlert className="text-purple-500 mt-1" size={20} />
              <div>
                <h4 className="text-xs font-bold uppercase mb-1">AI Proctoring Active</h4>
                <p className="text-[10px] text-zinc-500 leading-relaxed uppercase">The system will track gaze divergence and focal points via TensorFlow.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <Zap className="text-purple-500 mt-1" size={20} />
              <div>
                <h4 className="text-xs font-bold uppercase mb-1">Lockdown Mode</h4>
                <p className="text-[10px] text-zinc-500 leading-relaxed uppercase">Exiting full-screen or switching tabs will flag the interview artifact.</p>
              </div>
            </div>
          </div>

          <button 
            onClick={startInterview}
            disabled={!interviewData.isHardwareReady}
            className={`w-full py-5 rounded-3xl font-black uppercase tracking-widest transition-all ${
              interviewData.isHardwareReady 
              ? 'bg-white text-black hover:scale-[1.02] shadow-2xl' 
              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
            Engage Simulation
          </button>
        </div>

      </div>
    </div>
  );
};

export default InterviewLobby;