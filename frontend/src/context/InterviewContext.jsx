import React, { createContext, useContext, useState } from 'react';

const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [interviewData, setInterviewData] = useState({
    selectedRole: "FULL-STACK", 
    transcripts: [], 
    currentTranscript: "", // Buffer for live speech from Subtitles.jsx
    integrityFlags: 0,     // Total warnings from FaceTracking.jsx
    startTime: Date.now(),
  });

  const updateInterview = (updates) => {
    setInterviewData(prev => ({ ...prev, ...updates }));
  };

  const saveTranscript = (questionId, text) => {
    setInterviewData(prev => ({
      ...prev,
      transcripts: [...prev.transcripts, { questionId, text: text.toUpperCase() }]
    }));
  };

  return (
    <InterviewContext.Provider value={{ interviewData, updateInterview, saveTranscript }}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => useContext(InterviewContext);