import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, BookOpen, ExternalLink, Target, TrendingUp, Clock, Star, Award } from "lucide-react";
import Navbar from "../components/Navbar";

export default function CourseRecommender() {
  const navigate = useNavigate();
  
  // State
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  // Popular role suggestions
  const popularRoles = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "DevOps Engineer",
    "Mobile App Developer",
    "UI/UX Designer",
    "Machine Learning Engineer",
    "Cloud Architect",
    "Cybersecurity Analyst"
  ];

  // Fetch course recommendations
  const handleGetRecommendations = async () => {
    if (!targetRole.trim()) {
      setError("Please enter a target role");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Get resume data from localStorage
      const userProfile = localStorage.getItem('userProfile');
      if (!userProfile) {
        setError("No resume data found. Please complete onboarding first.");
        return;
      }

      const resumeData = JSON.parse(userProfile);

      // Call backend API
      const response = await fetch('http://localhost:3000/api/courses/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeData: resumeData,
          targetRole: targetRole
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to get recommendations' }));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to generate recommendations');
      }

      setRecommendations(result);

    } catch (err) {
      console.error('Failed to fetch course recommendations:', err);
      setError(err.message || 'Failed to get course recommendations');
    } finally {
      setLoading(false);
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    const lower = difficulty.toLowerCase();
    if (lower.includes('beginner')) return 'text-green-400 bg-green-500/10 border-green-500/30';
    if (lower.includes('intermediate')) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    if (lower.includes('advanced')) return 'text-red-400 bg-red-500/10 border-red-500/30';
    return 'text-zinc-400 bg-zinc-500/10 border-zinc-500/30';
  };

  // Get rank badge color
  const getRankBadgeColor = (rank) => {
    if (rank <= 3) return 'bg-gradient-to-r from-red-500 to-orange-500';
    if (rank <= 5) return 'bg-gradient-to-r from-yellow-500 to-amber-500';
    return 'bg-gradient-to-r from-green-500 to-emerald-500';
  };

  // Get rank label
  const getRankLabel = (rank) => {
    if (rank <= 3) return 'Critical';
    if (rank <= 5) return 'Recommended';
    return 'Advanced';
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-10 pt-32 pb-20">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate('/')}
            className="mb-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/30">
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-5xl font-black uppercase tracking-tight">
                AI Course <span className="text-purple-500">Recommender</span>
              </h1>
              <p className="text-zinc-400 text-lg mt-2">
                Get personalized course recommendations powered by AI
              </p>
            </div>
          </div>
        </div>

        {/* Input Section */}
        {!recommendations && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold">What's your target role?</h2>
              </div>

              {/* Target Role Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Target Role
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g., Full Stack Developer"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                  onKeyDown={(e) => e.key === 'Enter' && handleGetRecommendations()}
                />
              </div>

              {/* Popular Roles */}
              <div className="mb-8">
                <p className="text-sm text-zinc-400 mb-3">Popular roles:</p>
                <div className="flex flex-wrap gap-2">
                  {popularRoles.map((role) => (
                    <button
                      key={role}
                      onClick={() => setTargetRole(role)}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-purple-500/50 rounded-lg text-sm transition-all"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Get Recommendations Button */}
              <button
                onClick={handleGetRecommendations}
                disabled={loading || !targetRole.trim()}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed rounded-xl font-bold text-white uppercase tracking-wider flex items-center justify-center gap-3 transition-all shadow-lg shadow-purple-500/20"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Analyzing Your Profile...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Get AI Recommendations
                  </>
                )}
              </button>

              {/* Info Note */}
              <div className="mt-6 p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                <p className="text-xs text-zinc-400 text-center">
                  💡 We'll analyze your resume data and recommend the best courses to help you become a {targetRole || "your target role"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-zinc-800 rounded-xl mb-4 w-2/3 mx-auto"></div>
              <div className="h-4 bg-zinc-800 rounded-xl mb-6 w-1/2 mx-auto"></div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 bg-zinc-800 rounded-xl mb-4"></div>
              ))}
            </div>
          </div>
        )}

        {/* Results Section */}
        {recommendations && !loading && (
          <div className="max-w-5xl mx-auto">
            {/* Gap Analysis Card */}
            <div className="mb-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Skill Gap Analysis</h3>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    {recommendations.data.gapAnalysis}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-zinc-400">Current Skills:</span>
                    {recommendations.currentSkills.slice(0, 8).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                    {recommendations.currentSkills.length > 8 && (
                      <span className="px-2 py-1 text-xs text-zinc-500">
                        +{recommendations.currentSkills.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Header with New Search Button */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-purple-400" />
                <h2 className="text-3xl font-bold">
                  Recommended Courses for <span className="text-purple-400">{recommendations.targetRole}</span>
                </h2>
              </div>
              <button
                onClick={() => {
                  setRecommendations(null);
                  setTargetRole("");
                  setError(null);
                }}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm flex items-center gap-2 transition-colors"
              >
                New Search
              </button>
            </div>

            {/* Course Cards */}
            <div className="space-y-6">
              {recommendations.data.recommendedCourses.map((course) => (
                <div
                  key={course.rank}
                  className="group relative bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/50 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-purple-500/10"
                >
                  {/* Rank Badge */}
                  <div className="absolute -left-3 -top-3 flex flex-col items-center">
                    <div className={`${getRankBadgeColor(course.rank)} w-12 h-12 rounded-full flex items-center justify-center font-black text-white text-lg shadow-lg`}>
                      {course.rank}
                    </div>
                    <span className="mt-1 px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {getRankLabel(course.rank)}
                    </span>
                  </div>

                  <div className="ml-8">
                    {/* Course Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-sm text-zinc-400 mb-3">
                          {course.reason}
                        </p>
                      </div>
                    </div>

                    {/* Course Metadata */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      {/* Platform */}
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                        <BookOpen className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-300 font-medium">{course.platform}</span>
                      </div>

                      {/* Instructor */}
                      {course.instructor && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg">
                          <Award className="w-4 h-4 text-zinc-400" />
                          <span className="text-sm text-zinc-300">{course.instructor}</span>
                        </div>
                      )}

                      {/* Duration */}
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg">
                        <Clock className="w-4 h-4 text-zinc-400" />
                        <span className="text-sm text-zinc-300">{course.duration}</span>
                      </div>

                      {/* Rating */}
                      {course.rating !== "N/A" && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-zinc-300">{course.rating}</span>
                        </div>
                      )}

                      {/* Difficulty */}
                      <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg ${getDifficultyColor(course.difficulty)}`}>
                        <span className="text-sm font-medium">{course.difficulty}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-white uppercase text-sm tracking-wider transition-all shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40"
                    >
                      View Course
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-12 flex gap-4 justify-center">
              <button
                onClick={() => {
                  setRecommendations(null);
                  setTargetRole("");
                  setError(null);
                }}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-white uppercase text-sm tracking-wider transition-all"
              >
                Search Another Role
              </button>
              <button
                onClick={() => navigate('/roadmaps')}
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-bold text-white uppercase text-sm tracking-wider transition-all"
              >
                View Learning Roadmap
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
