export const startSpeechToText = (onTranscript) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    
    onTranscript(transcript);
  };

  recognition.start();
  return recognition; 
};

export const textToSpeech = (text) => {
  if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop any current speech first
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.95;
      speechSynthesis.speak(utterance);
  } else {
      console.error("Text-to-Speech is not supported.");
  }
};