import React from 'react';
import { X, Mail, Copy, CheckCircle } from 'lucide-react';

const EmailModal = ({ email, job, onClose, onCopy }) => {
  return (
    <div className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6'>
      <div className='bg-zinc-900 border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-white/10'>
          <div className='flex items-center gap-3'>
            <Mail className='w-6 h-6 text-purple-500' />
            <h2 className='text-2xl font-bold text-white'>Generated Cold Email</h2>
          </div>
          <button
            onClick={onClose}
            className='p-2 hover:bg-white/10 rounded-lg transition-colors'
          >
            <X className='w-6 h-6 text-white' />
          </button>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto p-6 space-y-6'>
          {/* Job Context */}
          <div className='bg-purple-500/10 border border-purple-500/30 rounded-xl p-4'>
            <p className='text-sm text-purple-400 mb-1'>Applying for:</p>
            <p className='font-bold text-white text-lg'>{job.title}</p>
            <p className='text-sm text-zinc-400'>{job.company}</p>
          </div>

          {/* Subject Line */}
          <div>
            <label className='text-sm font-semibold text-zinc-400 mb-2 block'>
              Subject Line
            </label>
            <div className='bg-black/30 border border-white/10 rounded-lg p-4'>
              <p className='text-white font-semibold'>{email.subject}</p>
            </div>
          </div>

          {/* Email Body */}
          <div>
            <label className='text-sm font-semibold text-zinc-400 mb-2 block'>
              Email Body
            </label>
            <div className='bg-black/30 border border-white/10 rounded-lg p-4'>
              <pre className='whitespace-pre-wrap text-sm text-zinc-300 font-sans leading-relaxed'>
                {email.body}
              </pre>
            </div>
          </div>

          {/* Key Highlights */}
          <div>
            <label className='text-sm font-semibold text-zinc-400 mb-2 block'>
              Your Key Highlights (Mentioned in Email)
            </label>
            <div className='bg-green-500/10 border border-green-500/30 rounded-xl p-4 space-y-2'>
              {email.keyHighlights.map((highlight, idx) => (
                <div key={idx} className='flex items-start gap-2'>
                  <CheckCircle className='w-4 h-4 text-green-500 mt-1 flex-shrink-0' />
                  <span className='text-sm text-zinc-300'>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div>
            <label className='text-sm font-semibold text-zinc-400 mb-2 block'>
              Call to Action
            </label>
            <div className='bg-blue-500/10 border border-blue-500/30 rounded-lg p-4'>
              <p className='text-sm text-zinc-300 italic'>"{email.callToAction}"</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className='p-6 border-t border-white/10 flex gap-3'>
          <button
            onClick={onClose}
            className='flex-1 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold text-white hover:bg-white/10 transition-colors'
          >
            Close
          </button>
          <button
            onClick={() => {
              onCopy();
              setTimeout(onClose, 1000);
            }}
            className='flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2'
          >
            <Copy className='w-4 h-4' />
            Copy Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
