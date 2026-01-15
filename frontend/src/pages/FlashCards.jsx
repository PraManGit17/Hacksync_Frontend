import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, RotateCcw, Brain, Zap, HelpCircle, LayoutGrid, Info, ChevronLeft } from "lucide-react";
import Navbar from "../components/Navbar";

const FlashCards = () => {
  const { topic } = useParams();
  const navigate = useNavigate();

  const questionBank = {
    "JavaScript": [
      { question: "What is the 'Temporal Dead Zone'?", answer: "The period between a variable's declaration (let/const) and its initialization where it cannot be accessed." },
      { question: "Explain 'Memoization'.", answer: "An optimization technique that stores the results of expensive function calls and returns the cached result when the same inputs occur again." },
      { question: "What are the different types of Scopes in JS?", answer: "Global Scope, Function (Local) Scope, and Block Scope (introduced with let/const)." }
    ],
    "React": [
      { question: "How does the Reconciliation algorithm work?", answer: "React compares the Virtual DOM with the real DOM and only updates the specific parts that have changed to maximize efficiency." },
      { question: "What is the difference between useMemo and useCallback?", answer: "useMemo returns a memoized VALUE; useCallback returns a memoized FUNCTION." },
      { question: "What is 'Lifting State Up'?", answer: "Moving shared state to the closest common ancestor of components that need it to ensure data consistency." }
    ],
    "System Design": [
      { question: "What is Sharding?", answer: "A database architecture pattern that breaks up a large database into smaller, more manageable parts called shards." },
      { question: "Explain the CAP Theorem.", answer: "It states that a distributed system can only provide two out of three guarantees: Consistency, Availability, and Partition Tolerance." }
    ]
  };

  const cards = questionBank[topic] || questionBank["JavaScript"];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleNext = useCallback(() => {
    setFlipped(false);
    setTimeout(() => setCurrentIdx((prev) => (prev + 1) % cards.length), 150);
  }, [cards.length]);

  const handlePrev = useCallback(() => {
    setFlipped(false);
    setTimeout(() => setCurrentIdx((prev) => (prev - 1 + cards.length) % cards.length), 150);
  }, [cards.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        setFlipped(!flipped);
      }
      if (e.code === "ArrowRight") handleNext();
      if (e.code === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [flipped, handleNext, handlePrev]);

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-100 font-sans selection:bg-purple-500/30 overflow-hidden relative">
      <Navbar />

      {/* Professional Background Elements */}
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-900/5 blur-[120px] rounded-full pointer-events-none" />

      <style>{`
        .perspective-2000 { perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      {/* Main HUD: pt-32 to clear Navbar */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-10 pt-32 pb-12 relative z-10 min-h-screen flex flex-col">
        
        {/* TOP HUD BAR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-zinc-800/60 pb-8">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => navigate('/flashcards-topics')}
              className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2 text-purple-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-1">
                <Brain size={12} /> Active Recall Session
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tighter uppercase">{topic}</h1>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 p-2 rounded-2xl">
            <div className="px-4 py-2 bg-zinc-950 rounded-xl border border-zinc-800">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mr-3">Progress</span>
              <span className="text-sm font-mono text-purple-400 font-bold">{currentIdx + 1} / {cards.length}</span>
            </div>
            <button 
              onClick={() => navigate('/flashcards-topics')}
              className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
            >
              Quit
            </button>
          </div>
        </div>

        {/* WORKSPACE GRID */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: SESSION METRICS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-900/20 border border-zinc-800/60 p-8 rounded-[2rem] backdrop-blur-sm">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Zap size={14} className="text-purple-500" /> Session Statistics
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-3">
                    <span className="text-zinc-400">Mastery Level</span>
                    <span className="text-white">{Math.round(((currentIdx + 1) / cards.length) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-700" 
                      style={{ width: `${((currentIdx + 1) / cards.length) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="p-4 bg-zinc-950/50 border border-zinc-800 rounded-xl flex items-start gap-3">
                  <Info size={16} className="text-zinc-600 mt-0.5" />
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    Flashcards utilize <span className="text-zinc-300">Spaced Repetition</span>. Toggle the card to verify knowledge before proceeding.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: THE INTERACTIVE ENGINE */}
          <div className="lg:col-span-8 flex flex-col items-center gap-12">
            <div className="relative w-full max-w-2xl h-[450px] perspective-2000">
              <div 
                onClick={() => setFlipped(!flipped)}
                className={`relative w-full h-full transition-transform duration-[800ms] preserve-3d cursor-pointer active:scale-[0.98] ${flipped ? 'rotate-y-180' : ''}`}
              >
                {/* FRONT: QUESTION */}
                <div className="absolute inset-0 bg-zinc-900/40 border border-zinc-800/80 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center backface-hidden backdrop-blur-md shadow-2xl">
                  <div className="absolute top-12 w-12 h-12 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                    <HelpCircle className="text-purple-500" size={24} />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight px-6 uppercase">
                    {cards[currentIdx].question}
                  </p>
                  <div className="absolute bottom-12 px-6 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 text-[9px] font-bold text-purple-400 uppercase tracking-[0.3em] animate-pulse flex items-center gap-2">
                    <Zap size={12} className="fill-current" /> Decrypt Answer
                  </div>
                </div>

                {/* BACK: SOLUTION */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-zinc-950 border border-purple-500/30 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center backface-hidden rotate-y-180 shadow-[0_0_80px_rgba(168,85,247,0.1)]">
                  <span className="absolute top-12 text-[10px] font-bold text-purple-500 uppercase tracking-[0.5em]">Verified Intelligence</span>
                  <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed font-semibold tracking-tight px-8">
                    {cards[currentIdx].answer}
                  </p>
                  <div className="absolute bottom-12 flex gap-1.5">
                    {[1, 2, 3].map(i => <div key={i} className="w-8 h-1 bg-purple-500/20 rounded-full" />)}
                  </div>
                </div>
              </div>
            </div>

            {/* CONTROL NAVIGATION */}
            <div className="flex items-center gap-6">
              <button 
                onClick={handlePrev}
                className="group p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all active:scale-90"
              >
                <ArrowLeft size={24} className="text-zinc-500 group-hover:text-white group-hover:-translate-x-1 transition-all" strokeWidth={3} />
              </button>
              
              <div className="px-10 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl font-mono text-sm font-bold flex gap-4 shadow-inner">
                <span className="text-purple-500">{currentIdx + 1}</span>
                <span className="text-zinc-700">/</span>
                <span className="text-zinc-400">{cards.length}</span>
              </div>

              <button 
                onClick={handleNext}
                className="group p-5 rounded-2xl bg-purple-600 border border-purple-500 hover:bg-purple-500 transition-all active:scale-90 shadow-[0_0_30px_rgba(168,85,247,0.25)]"
              >
                <ArrowRight size={24} className="text-white group-hover:translate-x-1 transition-all" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>

        {/* KEYBOARD SHORTCUT HUD */}
        <div className="mt-auto py-8 border-t border-zinc-800/40 flex justify-center">
          <div className="flex gap-6 opacity-40 hover:opacity-100 transition-opacity">
            {[
              { key: 'SPACE', action: 'Flip Card' },
              { key: '←', action: 'Previous' },
              { key: '→', action: 'Next' }
            ].map(item => (
              <div key={item.key} className="flex items-center gap-3">
                <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[9px] font-mono text-zinc-400 font-bold">{item.key}</span>
                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{item.action}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FlashCards;