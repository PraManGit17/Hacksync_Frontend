import { CheckCircle, XCircle, AlertCircle, TrendingUp, Target, Lightbulb, Database, Code } from 'lucide-react';

function EvaluationResult() {
  const analysisData = {
    matchScore: 75,
    overallAssessment: "Strong candidate with transferable skills. MySQL experience translates well to PostgreSQL.",
    missingKeywords: ["PostgreSQL"],
    criticalGaps: ["No explicit PostgreSQL mention"],
    matchingStrengths: [
      "Python expertise demonstrated",
      "Web scraping experience via MediStats project",
      "Database management with MySQL"
    ],
    improvementTips: [
      "Add 'PostgreSQL' to skills section (similar to MySQL)",
      "Mention 'Web Scraping' explicitly in project descriptions",
      "Highlight database migration experience if any"
    ],
    skillGapAnalysis: {
      technicalSkills: {
        required: ["PostgreSQL", "Python", "Web Scraping"],
        present: ["Python", "Web Scraping (implicit)", "MySQL"],
        missing: ["PostgreSQL (explicit)"]
      },
      experience: {
        required: "Junior level",
        present: "Student with practical projects",
        gap: "None significant"
      }
    },
    keywordOptimization: [
      {
        keyword: "PostgreSQL",
        suggestion: "Add to skills section and mention learning it",
        priority: "High"
      }
    ],
    atsCompatibility: {
      score: 78,
      issues: ["Missing exact keyword 'PostgreSQL'"],
      recommendations: ["Use exact keywords from job description"]
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-blue-500';
    if (score >= 60) return 'text-purple-600';
    return 'text-rose-600';
  };



  return (
    <div className="min-h-screen black_bg ]">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl poppins-bold text-white mb-2">Resume Analysis Report</h1>
          <p className="text-white poppins">Comprehensive evaluation of your resume against the job requirements</p>
        </div>

        <div className={`rounded-2xl border-2 p-8 mb-8 backdrop-blur-sm bg-white/5  border-white`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Target className={`w-8 h-8 ${getScoreColor(analysisData.matchScore)}`} />
                <h2 className="text-2xl font-bold text-purple-600">Overall Match Score</h2>
              </div>
              <p className="text-purple-500 max-w-2xl">{analysisData.overallAssessment}</p>
            </div>
            <div className="text-center">
              <div className={`text-6xl font-bold ${getScoreColor(analysisData.matchScore)}`}>
                {analysisData.matchScore}%
              </div>
              <div className="text-sm text-purple-500 mt-1">Match Rate</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/5 backdrop-blur-2xl rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">Matching Strengths</h3>
            </div>
            <ul className="space-y-3">
              {analysisData.matchingStrengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"></div>
                  <span className="text-white">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-2xl rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold text-purple-600 ">Critical Gaps</h3>
            </div>
            <div className="space-y-3">
              {analysisData.criticalGaps.map((gap, index) => (
                <div key={index} className="flex items-start gap-3 black_bg rounded-lg p-3">
                  <XCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-purple-600">{gap}</span>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="text-sm font-semibold text-white mb-2">Missing Keywords:</div>
                <div className="flex flex-wrap gap-2">
                  {analysisData.missingKeywords.map((keyword, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-700/50 text-white rounded-full text-sm font-medium">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="backdrop-blur-md bg-white/5 rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">Improvement Tips</h3>
            </div>
            <ul className="space-y-3">
              {analysisData.improvementTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 bg-black rounded-lg p-3">
                  <div className="w-6 h-6 rounded-full bg-[#360ba1] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-white">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">Skill Gap Analysis</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Technical Skills</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-white w-20">Required:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisData.skillGapAnalysis.technicalSkills.required.map((skill, index) => (
                        <span key={index} className="px-2 py-1  text-[#360ba1] rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-white w-20">Present:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisData.skillGapAnalysis.technicalSkills.present.map((skill, index) => (
                        <span key={index} className="px-2 py-1 text-blue-600 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-white w-20">Missing:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisData.skillGapAnalysis.technicalSkills.missing.map((skill, index) => (
                        <span key={index} className="px-2 py-1 text-rose-700 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-white mb-2">Experience Level</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white">Required:</span>
                    <span className="font-medium text-white">{analysisData.skillGapAnalysis.experience.required}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Present:</span>
                    <span className="font-medium text-white">{analysisData.skillGapAnalysis.experience.present}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Gap:</span>
                    <span className="font-medium text-emerald-600">{analysisData.skillGapAnalysis.experience.gap}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">Keyword Optimization</h3>
            </div>
            <div className="space-y-3">
              {analysisData.keywordOptimization.map((item, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">{item.keyword}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.priority} Priority
                    </span>
                  </div>
                  <p className="text-sm text-white">{item.suggestion}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">ATS Compatibility</h3>
            </div>
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {analysisData.atsCompatibility.score}%
              </div>
              <p className="text-sm text-blue-600">Applicant Tracking System Score</p>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Issues Detected:</h4>
                <ul className="space-y-2">
                  {analysisData.atsCompatibility.issues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-white">
                      <AlertCircle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-white mb-2">Recommendations:</h4>
                <ul className="space-y-2">
                  {analysisData.atsCompatibility.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EvaluationResult;
