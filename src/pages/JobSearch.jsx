import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Upload, Search, Briefcase, Mail, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import JobCard from '../components/JobSearch Components/JobCard';
import EmailModal from '../components/JobSearch Components/EmailModal';

const JobSearch = () => {
  const [resumeId, setResumeId] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [jobData, setJobData] = useState(null);
  const [error, setError] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Step 1: Upload Resume
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or DOCX file');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch('http://localhost:3000/api/upload-resume', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        setResumeId(result.data.resumeId);
        setUploadedFile(result.data);
        localStorage.setItem('resumeId', result.data.resumeId);
      } else {
        setError(result.message || 'Upload failed');
      }
    } catch (err) {
      setError('Failed to upload resume. Please try again.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // Step 2: Find Job & Generate Email
  const handleFindJob = async () => {
    if (!resumeId) {
      setError('Please upload your resume first');
      return;
    }

    setSearching(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/find-job-and-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId })
      });

      const result = await response.json();

      if (result.success) {
        setJobData(result.data);
      } else {
        setError(result.message || 'No jobs found');
      }
    } catch (err) {
      setError('Failed to find jobs. Please try again.');
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  const handleCopyEmail = () => {
    if (jobData?.email) {
      const emailText = `Subject: ${jobData.email.subject}\n\n${jobData.email.body}`;
      navigator.clipboard.writeText(emailText);
      alert('Email copied to clipboard!');
    }
  };

  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar />
      
      <div className='pt-32 pb-20 px-6 max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-6xl font-black tracking-tighter uppercase italic mb-4'>
            Job Search & <span className='text-purple-500'>Email Generator</span>
          </h1>
          <p className='text-zinc-400 text-lg max-w-2xl mx-auto'>
            Upload your resume, find relevant jobs, and generate personalized cold emails with AI
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className='max-w-3xl mx-auto mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3'>
            <AlertCircle className='w-5 h-5 text-red-500 flex-shrink-0' />
            <p className='text-red-400'>{error}</p>
          </div>
        )}

        {/* Step 1: Upload Resume */}
        <div className='max-w-3xl mx-auto mb-12'>
          <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold'>
                1
              </div>
              <h2 className='text-2xl font-bold'>Upload Your Resume</h2>
            </div>

            {!resumeId ? (
              <label className='block'>
                <div className='border-2 border-dashed border-white/20 rounded-xl p-12 text-center cursor-pointer hover:border-purple-500 transition-colors'>
                  <Upload className='w-12 h-12 mx-auto mb-4 text-purple-500' />
                  <p className='text-lg font-semibold mb-2'>
                    {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                  </p>
                  <p className='text-sm text-zinc-500'>PDF or DOCX (Max 10MB)</p>
                  <input
                    type='file'
                    accept='.pdf,.docx'
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className='hidden'
                  />
                </div>
              </label>
            ) : (
              <div className='flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl'>
                <CheckCircle className='w-6 h-6 text-green-500 flex-shrink-0' />
                <div className='flex-1'>
                  <p className='font-semibold text-green-400'>Resume Uploaded Successfully</p>
                  <p className='text-sm text-zinc-400'>{uploadedFile?.filename}</p>
                </div>
                <FileText className='w-8 h-8 text-green-500' />
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Find Jobs */}
        {resumeId && (
          <div className='max-w-3xl mx-auto mb-12'>
            <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold'>
                  2
                </div>
                <h2 className='text-2xl font-bold'>Find Relevant Jobs</h2>
              </div>

              <button
                onClick={handleFindJob}
                disabled={searching}
                className='w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3'
              >
                {searching ? (
                  <>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    Searching for Jobs...
                  </>
                ) : (
                  <>
                    <Search className='w-5 h-5' />
                    Find Job & Generate Email
                  </>
                )}
              </button>

              <p className='text-sm text-zinc-500 text-center mt-4'>
                This may take 5-10 seconds as we analyze your resume and search for the best match
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Display Job & Email */}
        {jobData && (
          <div className='max-w-6xl mx-auto'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold'>
                3
              </div>
              <h2 className='text-2xl font-bold'>Your Job Match & Cold Email</h2>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Job Card */}
              <JobCard 
                job={jobData.job} 
                atsAnalysis={jobData.atsAnalysis}
                onViewEmail={() => setShowEmailModal(true)}
              />

              {/* Email Preview */}
              <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6'>
                <div className='flex items-center gap-3 mb-6'>
                  <Mail className='w-6 h-6 text-purple-500' />
                  <h3 className='text-xl font-bold'>Generated Cold Email</h3>
                </div>

                <div className='space-y-4'>
                  <div>
                    <p className='text-sm text-zinc-500 mb-1'>Subject:</p>
                    <p className='font-semibold text-purple-400'>{jobData.email.subject}</p>
                  </div>

                  <div>
                    <p className='text-sm text-zinc-500 mb-2'>Email Body:</p>
                    <div className='bg-black/30 rounded-lg p-4 max-h-64 overflow-y-auto border border-white/5'>
                      <pre className='whitespace-pre-wrap text-sm text-zinc-300 font-sans'>
                        {jobData.email.body}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <p className='text-sm text-zinc-500 mb-2'>Key Highlights:</p>
                    <ul className='space-y-2'>
                      {jobData.email.keyHighlights.map((highlight, idx) => (
                        <li key={idx} className='flex items-start gap-2'>
                          <CheckCircle className='w-4 h-4 text-green-500 mt-1 flex-shrink-0' />
                          <span className='text-sm text-zinc-300'>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className='w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2'
                  >
                    <Mail className='w-4 h-4' />
                    Copy Email to Clipboard
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className='mt-8 flex justify-center gap-4'>
              <button
                onClick={() => {
                  setJobData(null);
                  setResumeId(null);
                  setUploadedFile(null);
                  localStorage.removeItem('resumeId');
                }}
                className='px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-colors'
              >
                Upload New Resume
              </button>
              <button
                onClick={handleFindJob}
                disabled={searching}
                className='px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50'
              >
                Find Another Job
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Email Modal */}
      {showEmailModal && jobData && (
        <EmailModal 
          email={jobData.email}
          job={jobData.job}
          onClose={() => setShowEmailModal(false)}
          onCopy={handleCopyEmail}
        />
      )}
    </div>
  );
};

export default JobSearch;
