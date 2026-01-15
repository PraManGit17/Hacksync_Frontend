import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileVerification = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('userProfile');
      if (stored) {
        setProfileData(JSON.parse(stored));
      } else {
        setError('No profile data found in localStorage');
      }
    } catch (err) {
      setError('Failed to parse profile data: ' + err.message);
    }
  }, []);

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear the stored profile data?')) {
      localStorage.removeItem('userProfile');
      setProfileData(null);
      setError('Profile data cleared');
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  if (error && !profileData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold mb-2">No Profile Data Found</h2>
            <p className="text-zinc-400 mb-6">{error}</p>
            <button
              onClick={handleGoBack}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Profile Verification
            </h1>
            <p className="text-zinc-400">Review your stored profile data from localStorage</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleGoBack}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-bold"
            >
              ← Back
            </button>
            <button
              onClick={handleClearData}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-bold"
            >
              Clear Data
            </button>
          </div>
        </div>

        {/* Success Badge */}
        <div className="mb-6 bg-green-900/30 border border-green-600 rounded-xl p-4 flex items-center gap-3">
          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-bold text-green-400">Data Successfully Stored!</p>
            <p className="text-sm text-zinc-400">Your profile has been saved to localStorage under key: <code className="text-purple-400">userProfile</code></p>
          </div>
        </div>

        {profileData && (
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-wider">Full Name</label>
                  <p className="text-lg font-medium">{profileData.fullName || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-wider">Email</label>
                  <p className="text-lg font-medium">{profileData.email || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-wider">Phone</label>
                  <p className="text-lg font-medium">{profileData.phone || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Education
              </h2>
              {profileData.education && profileData.education.length > 0 ? (
                <div className="space-y-4">
                  {profileData.education.map((edu, index) => (
                    <div key={index} className="bg-black/50 rounded-lg p-4 border border-zinc-800">
                      <p className="font-bold text-lg mb-1">{edu.degree || 'N/A'}</p>
                      <p className="text-zinc-400">{edu.institution || 'N/A'}</p>
                      <div className="flex gap-4 mt-2 text-sm text-zinc-500">
                        <span>Field: {edu.field || 'N/A'}</span>
                        <span>•</span>
                        <span>{edu.year || 'N/A'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500">No education data</p>
              )}
            </div>

            {/* Work Experience */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Work Experience
              </h2>
              {profileData.workExperience && profileData.workExperience.length > 0 ? (
                <div className="space-y-4">
                  {profileData.workExperience.map((work, index) => (
                    <div key={index} className="bg-black/50 rounded-lg p-4 border border-zinc-800">
                      <p className="font-bold text-lg mb-1">{work.position || 'N/A'}</p>
                      <p className="text-zinc-400 mb-2">{work.company || 'N/A'} • {work.duration || 'N/A'}</p>
                      <p className="text-sm text-zinc-500">{work.description || 'N/A'}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500">No work experience data</p>
              )}
            </div>

            {/* Skills */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Skills
              </h2>
              {profileData.skills && profileData.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-600/20 border border-purple-500 rounded-full text-sm text-purple-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500">No skills data</p>
              )}
            </div>

            {/* Projects */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Projects
              </h2>
              {profileData.projects && profileData.projects.length > 0 ? (
                <div className="space-y-4">
                  {profileData.projects.map((project, index) => (
                    <div key={index} className="bg-black/50 rounded-lg p-4 border border-zinc-800">
                      <p className="font-bold text-lg mb-2">{project.name || 'N/A'}</p>
                      <p className="text-sm text-zinc-400 mb-3">{project.description || 'N/A'}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-xs text-zinc-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500">No projects data</p>
              )}
            </div>

            {/* Raw JSON Data */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Raw JSON Data
              </h2>
              <div className="bg-black rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs text-zinc-300">
                  {JSON.stringify(profileData, null, 2)}
                </pre>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(profileData, null, 2));
                  alert('JSON copied to clipboard!');
                }}
                className="mt-3 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm"
              >
                Copy JSON
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileVerification;
