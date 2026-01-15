// src/data/RoadmapData.js
import { Lock, Sparkles, Video, FileText, Target } from 'lucide-react';

export const roadmapSteps = [
  { 
    id: 1, 
    title: "AI Career Path Recommender", 
    desc: "Analyzing skills, education, and interests to suggest trending roles.", 
    status: "completed", 
    icon: Sparkles,
    x: "25%", y: "5%"  // Left side start
  },
  { 
    id: 2, 
    title: "AI Resume & Readiness", 
    desc: "Generating ATS-compatible resumes and evaluating job readiness.", 
    status: "current", 
    icon: FileText,
    x: "75%", y: "28%" // Right side peak
  },
  { 
    id: 3, 
    title: "Personalized Learning Guide", 
    desc: "Identifying skill gaps and recommending relevant certifications.", 
    status: "locked", 
    icon: Target,
    x: "25%", y: "51%" // Left side peak
  },
  { 
    id: 4, 
    title: "Interactive Interview Module", 
    desc: "Live simulator with video, coding support, and AI feedback.", 
    status: "locked", 
    icon: Video,
    x: "75%", y: "74%" // Right side peak
  },
  { 
    id: 5, 
    title: "Career Persona Generator", 
    desc: "Final summarized professional profile and portfolio deployment.", 
    status: "locked", 
    icon: Sparkles,
    x: "50%", y: "95%" // Center finish
  },
];