import React, { useEffect, useState } from "react";
import { startSpeechToText } from "../../utils/speechToText";
import { useInterview } from "../../context/InterviewContext";

const Subtitles = () => {
  const [localText, setLocalText] = useState("");
  const { updateInterview } = useInterview();

  useEffect(() => {
    const recognition = startSpeechToText((transcript) => {
      setLocalText(transcript);
      // Update global context so Questions.jsx can see what you said
      updateInterview({ currentTranscript: transcript });
    });

    return () => { if (recognition) recognition.stop(); };
  }, [updateInterview]);

  return (
    <div className="h-full w-full flex flex-col justify-center">
      <p className="text-[10px] font-mono text-zinc-600 uppercase mb-4 tracking-widest">
        Neural Transcript Output
      </p>
      <p className="text-xl text-purple-400 font-medium italic leading-relaxed">
        {localText || "Awaiting audio signal..."}
      </p>
    </div>
  );
};

export default Subtitles;