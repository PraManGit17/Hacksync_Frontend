import React from "react";

const ProgressBar = ({ currentQuestionIndex, totalQuestions }) => {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full space-y-3">
      {/* Progress Text */}
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>
        <span className="font-semibold">{Math.round(progress)}%</span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;