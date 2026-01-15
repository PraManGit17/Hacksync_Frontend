import React from 'react';
import { Briefcase, MapPin, ExternalLink, TrendingUp, Award, AlertTriangle } from 'lucide-react';

const JobCard = ({ job, atsAnalysis, onViewEmail }) => {
  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-500 border-green-500 bg-green-500/10';
    if (score >= 50) return 'text-yellow-500 border-yellow-500 bg-yellow-500/10';
    return 'text-red-500 border-red-500 bg-red-500/10';
  };

  const getScoreIcon = (score) => {
    if (score >= 70) return <Award className='w-5 h-5' />;
    if (score >= 50) return <TrendingUp className='w-5 h-5' />;
    return <AlertTriangle className='w-5 h-5' />;
  };

  return (
    <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-6'>
      {/* Job Header */}
      <div>
        <div className='flex items-start justify-between mb-3'>
          <div className='flex-1'>
            <h3 className='text-2xl font-bold mb-2'>{job.title}</h3>
            <div className='flex items-center gap-2 text-zinc-400'>
              <Briefcase className='w-4 h-4' />
              <span className='font-semibold'>{job.company}</span>
            </div>
          </div>
          <a
            href={job.url}
            target='_blank'
            rel='noopener noreferrer'
            className='p-2 hover:bg-white/10 rounded-lg transition-colors'
          >
            <ExternalLink className='w-5 h-5 text-purple-500' />
          </a>
        </div>

        <div className='flex items-center gap-2 text-sm text-zinc-500'>
          <MapPin className='w-4 h-4' />
          <span>{job.location}</span>
          <span className='mx-2'>•</span>
          <span>{job.experienceLevel}</span>
          <span className='mx-2'>•</span>
          <span>{new Date(job.postedDate).toLocaleDateString()}</span>
        </div>
      </div>

      {/* ATS Match Score */}
      <div className={`border-2 rounded-xl p-4 ${getScoreColor(atsAnalysis.matchScore)}`}>
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center gap-2'>
            {getScoreIcon(atsAnalysis.matchScore)}
            <span className='font-bold'>ATS Match Score</span>
          </div>
          <span className='text-3xl font-black'>{atsAnalysis.matchScore}%</span>
        </div>
        <p className='text-sm opacity-90'>{atsAnalysis.interpretation}</p>
      </div>

      {/* Skills Match */}
      <div>
        <p className='text-sm font-semibold text-zinc-400 mb-3'>Required Skills</p>
        <div className='flex flex-wrap gap-2'>
          {job.requiredSkills.map((skill, idx) => {
            const isMatched = atsAnalysis.matchedSkills.includes(skill);
            return (
              <span
                key={idx}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  isMatched
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
              >
                {skill}
              </span>
            );
          })}
        </div>
      </div>

      {/* Missing Skills */}
      {atsAnalysis.missingSkills.length > 0 && (
        <div>
          <p className='text-sm font-semibold text-zinc-400 mb-3'>Skills to Develop</p>
          <div className='flex flex-wrap gap-2'>
            {atsAnalysis.missingSkills.map((skill, idx) => (
              <span
                key={idx}
                className='px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommendation */}
      <div className='bg-purple-500/10 border border-purple-500/30 rounded-xl p-4'>
        <p className='text-sm font-semibold text-purple-400 mb-2'>AI Recommendation</p>
        <p className='text-sm text-zinc-300'>{atsAnalysis.recommendation}</p>
      </div>

      {/* Job Description Preview */}
      <div>
        <p className='text-sm font-semibold text-zinc-400 mb-2'>Job Description</p>
        <div className='bg-black/30 rounded-lg p-4 max-h-32 overflow-y-auto border border-white/5'>
          <p className='text-sm text-zinc-400 line-clamp-6'>{job.description}</p>
        </div>
      </div>

      {/* Action Button */}
      <a
        href={job.url}
        target='_blank'
        rel='noopener noreferrer'
        className='block w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-center transition-colors'
      >
        View Full Job Posting
      </a>
    </div>
  );
};

export default JobCard;
