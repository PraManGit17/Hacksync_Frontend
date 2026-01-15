import { CheckCircle, XCircle, AlertCircle, TrendingUp, Target, Lightbulb, Database, Code } from 'lucide-react';

function EvaluationResult({ data }) {
  // Use data from API if available, otherwise show placeholder
  const analysisData = data || {
    matchScore: 0,
    overallAssessment: "Complete the evaluation to see your results",
    missingKeywords: [],
    criticalGaps: [],
    matchingStrengths: [],
    improvementTips: []
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
            {analysisData.matchingStrengths.length > 0 ? (
              <ul className="space-y-3">
                {analysisData.matchingStrengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"></div>
                    <span className="text-white">{strength}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic">No matching strengths identified yet</p>
            )}
          </div>

          <div className="bg-white/5 backdrop-blur-2xl rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold text-purple-600 ">Critical Gaps</h3>
            </div>
            {analysisData.criticalGaps.length > 0 || analysisData.missingKeywords.length > 0 ? (
              <div className="space-y-3">
                {analysisData.criticalGaps.map((gap, index) => (
                  <div key={index} className="flex items-start gap-3 black_bg rounded-lg p-3">
                    <XCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-600">{gap}</span>
                  </div>
                ))}
                {analysisData.missingKeywords.length > 0 && (
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
                )}
              </div>
            ) : (
              <p className="text-gray-400 italic">No critical gaps identified</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="backdrop-blur-md bg-white/5 rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">Improvement Tips</h3>
            </div>
            {analysisData.improvementTips.length > 0 ? (
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
            ) : (
              <p className="text-gray-400 italic">No improvement tips available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EvaluationResult;
