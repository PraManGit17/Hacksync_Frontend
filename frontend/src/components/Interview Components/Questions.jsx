import React, { useState, useEffect } from "react";
import { textToSpeech } from "../../utils/speechToText";
import { useInterview } from "../../context/InterviewContext";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const Questions = () => {
  const { interviewData, saveTranscript, updateInterview } = useInterview();
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);

  const questions = [
    "Explain the difference between Virtual DOM and Real DOM in React.",
    "Describe the architecture of a MERN stack application.",
    "How do you handle state management in complex React apps?",
    "Tell me about a time you solved a difficult technical bug."
  ];

  useEffect(() => {
    textToSpeech(questions[currentIdx]);
  }, [currentIdx]);

  const handleNext = () => {
    // 1. Grab transcript from context buffer
    const answer = interviewData.currentTranscript || "No response recorded";
    
    // 2. Save it permanently to the transcripts array
    saveTranscript(currentIdx, answer);

    // 3. Reset buffer in context for next question
    updateInterview({ currentTranscript: "" });

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      navigate("/interview-feedback");
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-6">
        <p className="text-zinc-600 font-mono text-xs tracking-widest uppercase">
          Sequence {currentIdx + 1} of {questions.length}
        </p>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-tight">
          {questions[currentIdx]}
        </h2>
      </div>

      <div className="space-y-8">
        <ProgressBar currentQuestionIndex={currentIdx} totalQuestions={questions.length} />
        <button 
          onClick={handleNext}
          className="w-full py-6 bg-white text-black rounded-[2rem] font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-2xl"
        >
          {currentIdx === questions.length - 1 ? "Terminate Session" : "Confirm & Next"}
        </button>
      </div>
    </div>
  );
};

export default Questions;