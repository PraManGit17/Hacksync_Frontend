import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoadmapLevel from "./RoadmapLevel";
import RoadmapPanel from "./RoadmapPanel";

export default function RoadmapView() {
  const navigate = useNavigate();
  
  // State
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState({});
  const [selected, setSelected] = useState(null);

  // Fetch roadmap from backend
  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user profile from localStorage
        const userProfile = localStorage.getItem('userProfile');
        if (!userProfile) {
          throw new Error('No user profile found. Please complete onboarding first.');
        }

        const profile = JSON.parse(userProfile);
        
        // Call backend API with user profile
        const response = await fetch('http://localhost:3000/api/generate-roadmap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userProfile: profile
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to generate roadmap' }));
          throw new Error(errorData.message || `Server error: ${response.status}`);
        }

        const data = await response.json();
        
        // Backend should return: { success: true, data: { roadmap: {...} } }
        if (!data.success || !data.data || !data.data.roadmap) {
          throw new Error('Invalid response format from server');
        }

        setRoadmapData(data.data.roadmap);

        // Initialize progress state
        const allNodes = data.data.roadmap.levels.flatMap(l => l.nodes);
        const initialProgress = {};
        allNodes.forEach(node => {
          // Nodes with no prerequisites start as "available", others as "locked"
          initialProgress[node.id] = node.prerequisites.length === 0 ? "available" : "locked";
        });
        setProgress(initialProgress);

      } catch (err) {
        console.error('Failed to fetch roadmap:', err);
        setError(err.message || 'Failed to load roadmap');
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  // Mark a node as completed and unlock dependent nodes
  const markCompleted = (id) => {
    if (!roadmapData) return;

    setProgress(prev => {
      const next = { ...prev, [id]: "completed" };

      // Check all nodes to see if any should be unlocked
      const allNodes = roadmapData.levels.flatMap(l => l.nodes);
      allNodes.forEach(node => {
        if (
          node.prerequisites.includes(id) &&
          node.prerequisites.every(prereqId => next[prereqId] === "completed")
        ) {
          next[node.id] = "available";
        }
      });

      return next;
    });

    // Optional: Save progress to backend
    saveProgressToBackend(id);
  };

  // Save progress to backend (optional)
  const saveProgressToBackend = async (nodeId) => {
    try {
      await fetch('http://localhost:3000/api/roadmap/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: JSON.parse(localStorage.getItem('userProfile'))?.email || 'unknown',
          nodeId,
          status: 'completed',
          completedAt: new Date().toISOString()
        })
      });
    } catch (err) {
      console.error('Failed to save progress:', err);
      // Don't show error to user - progress is saved locally
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-zinc-400">Generating your personalized roadmap...</p>
          <p className="text-xs text-zinc-600 mt-2">This may take a moment</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold mb-2">Failed to Load Roadmap</h2>
            <p className="text-zinc-400 mb-6">{error}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold"
              >
                Retry
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-bold"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <button
          onClick={() => navigate('/')}
          className="mb-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {roadmapData?.title || 'Your Learning Path'}
            </h1>
            {roadmapData?.description && (
              <p className="text-zinc-400 text-lg">{roadmapData.description}</p>
            )}
            {roadmapData?.estimatedDuration && (
              <div className="mt-4 flex gap-4 text-sm">
                <span className="px-3 py-1 bg-purple-900/30 border border-purple-500/50 rounded-full text-purple-300">
                  ⏱️ {roadmapData.estimatedDuration}
                </span>
                {roadmapData?.difficulty && (
                  <span className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-300">
                    📊 {roadmapData.difficulty}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Roadmap Content */}
      <div className="max-w-7xl mx-auto">
        <div className="relative flex gap-20">
          <div className="flex flex-col gap-32">
            {roadmapData?.levels.map(level => (
              <RoadmapLevel
                key={level.level}
                level={level}
                progress={progress}
                onSelect={setSelected}
              />
            ))}
          </div>

          <RoadmapPanel topic={selected} onComplete={markCompleted} />
        </div>
      </div>
    </div>
  );
}
