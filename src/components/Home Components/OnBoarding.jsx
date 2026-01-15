import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",

  education: [
    {
      degree: "",
      institution: "",
      field: "",
      year: ""
    }
  ],

  workExperience: [
    {
      position: "",
      company: "",
      duration: "",
      description: ""
    }
  ],

  skills: [],

  projects: [
    {
      name: "",
      description: "",
      technologies: []
    }
  ]
};


const OnBoarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [skillInput, setSkillInput] = useState("");
  const [techInput, setTechInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' }); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (!name.includes("[")) {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
      return;
    }

    // Handles nested fields like education[0].degree
    const keys = name.replace("]", "").split(/\.|\[/);

    setFormData((prev) => {
      const updated = structuredClone(prev);
      let ref = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        ref = ref[keys[i]];
      }

      ref[keys[keys.length - 1]] = value;
      return updated;
    });
  };


  const addSkill = () => {
    if (!skillInput.trim()) return;

    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, skillInput.trim()]
    }));

    setSkillInput("");
  };


  const addTechnology = () => {
    if (!techInput.trim()) return;
    setFormData(prev => {
      const updated = structuredClone(prev);
      updated.projects[0].technologies.push(techInput.trim());
      return updated;
    });
    setTechInput("");
  };

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
  };

  /*
    Backend API Contract:
    - Endpoint: POST http://localhost:3000/api/parse-resume
    - FormData key: 'resume'
    - Accepts: .pdf, .docx (Max 10 MB)
    - Success Response: { success: true, data: { fullName, email, phone, education[], workExperience[], skills[], projects[] } }
    - Error Response: non-2xx with error message
  */
  const handleFileUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Validate file size (10 MB max)
    if (file.size > 10 * 1024 * 1024) {
      showToast('File size exceeds 10 MB limit', 'error');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const payload = new FormData();
      payload.append('resume', file);

      const res = await fetch('http://localhost:3000/api/parse-resume', {
        method: 'POST',
        body: payload
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Upload failed' }));
        throw new Error(errorData.message || `Server error: ${res.status}`);
      }

      const response = await res.json();

      // Backend returns { success: true, data: { ... } }
      if (!response.success || !response.data) {
        throw new Error('Invalid response format from server');
      }

      const parsed = response.data;

      // Map the response to our form structure
      const mapped = {
        fullName: parsed.fullName || formData.fullName,
        email: parsed.email || formData.email,
        phone: parsed.phone || formData.phone,
        education: Array.isArray(parsed.education) && parsed.education.length
          ? parsed.education.map(ed => ({
              degree: ed.degree || '',
              institution: ed.institution || '',
              field: ed.field || '',
              year: ed.year || ''
            }))
          : formData.education,
        workExperience: Array.isArray(parsed.workExperience) && parsed.workExperience.length
          ? parsed.workExperience.map(w => ({
              position: w.position || '',
              company: w.company || '',
              duration: w.duration || '',
              description: w.description || ''
            }))
          : formData.workExperience,
        skills: Array.isArray(parsed.skills) ? parsed.skills : formData.skills,
        projects: Array.isArray(parsed.projects) && parsed.projects.length
          ? parsed.projects.map(p => ({
              name: p.name || '',
              description: p.description || '',
              technologies: Array.isArray(p.technologies) ? p.technologies : []
            }))
          : formData.projects
      };

      // Ensure arrays exist with at least one entry
      if (!Array.isArray(mapped.projects) || !mapped.projects.length) {
        mapped.projects = initialFormData.projects;
      }
      if (!Array.isArray(mapped.education) || !mapped.education.length) {
        mapped.education = initialFormData.education;
      }
      if (!Array.isArray(mapped.workExperience) || !mapped.workExperience.length) {
        mapped.workExperience = initialFormData.workExperience;
      }

      setFormData(prev => ({ ...prev, ...mapped }));
      showToast('Resume parsed successfully! Please review and edit the fields.', 'success');

    } catch (err) {
      console.error('Upload error:', err);
      const errorMessage = err.message || 'Failed to upload and parse resume';
      setUploadError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setUploading(false);
      if (e.target) e.target.value = '';
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      localStorage.setItem('userProfile', JSON.stringify(formData));
      console.log('Saved Resume Data to userProfile:', formData);
      showToast('Profile saved successfully!', 'success');
      
      // Navigate to career page after a short delay
      setTimeout(() => {
        navigate('/career');
      }, 1500);
    } catch (err) {
      console.error('Failed saving profile', err);
      showToast('Failed to save profile to localStorage', 'error');
    }
  };

  // Confirm button handler (can be called from a separate Confirm button)
  const handleConfirmAndNavigate = () => {
    try {
      localStorage.setItem('userProfile', JSON.stringify(formData));
      console.log('Profile confirmed and saved:', formData);
      showToast('Profile saved! Redirecting to Career Roadmap...', 'success');
      
      setTimeout(() => {
        navigate('/career');
      }, 1500);
    } catch (err) {
      console.error('Failed to save profile', err);
      showToast('Failed to save profile', 'error');
    }
  };


  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // useEffect(() => {
  //   const saved = localStorage.getItem("resumeFormData");
  //   if (saved) {
  //     setFormData(JSON.parse(saved));
  //   }
  // }, []);

  // Ensure arrays exist (defensive)
  useEffect(() => {
    setFormData(prev => ({
      ...initialFormData,
      ...prev,
      education: Array.isArray(prev.education) && prev.education.length ? prev.education : initialFormData.education,
      workExperience: Array.isArray(prev.workExperience) && prev.workExperience.length ? prev.workExperience : initialFormData.workExperience,
      projects: Array.isArray(prev.projects) && prev.projects.length ? prev.projects : initialFormData.projects,
      skills: Array.isArray(prev.skills) ? prev.skills : []
    }));
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  return (
    <div className='relative z-10 black_bg h-screen w-full flex justify-center items-center overflow-hidden '>

      <div className='absolute z-0 w-[50%] h-full '>
        <div className='absolute z-0 rotate-45 h-200 w-20 bg-[#360ba1] -bottom-50 -left-75 '></div>
        <div className='absolute z-0 rotate-45 h-200 w-20 bg-[#360ba1] -top-70 -right-75 '></div>
      </div>


      <div className="relative z-10 text-white w-full h-screen flex flex-col items-center gap-5">


        <div className='text-4xl poppins-bold leading-relaxed mt-25 text-center flex items-center gap-2'>
          <div> Help us understand you,</div>
          <div>So we can guide you better.</div>
        </div>

        <div className="max-w-[1200px] w-full flex items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <label 
              htmlFor="resume-upload" 
              className="relative cursor-pointer py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold text-sm transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Resume
            </label>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
            {uploading && (
              <span className="flex items-center gap-2 text-xs text-purple-400 bg-purple-900/30 px-3 py-1 rounded-full">
                <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading & parsing...
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                // quick load saved profile into form if exists
                const saved = localStorage.getItem('userProfile') || localStorage.getItem('resumeFormData');
                if (saved) {
                  setFormData(JSON.parse(saved));
                  showToast('Profile loaded from storage', 'success');
                }
              }}
              className="py-2 px-4 bg-zinc-700 hover:bg-zinc-600 rounded-lg font-bold text-sm"
            >
              Load saved
            </button>
            
            <button
              type="button"
              onClick={handleConfirmAndNavigate}
              className="py-2 px-4 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold text-sm"
            >
              Confirm & Continue
            </button>
          </div>
        </div>

        <div
          className="
    border-2 border-white w-[35%] rounded-3xl
    backdrop-blur-xl bg-white/0
    flex flex-col
  "
        >

          <form onSubmit={handleSubmit} className="w-full h-full px-4 py-6 text-white">
            {/* First Step */}
            {step === 1 && (
              <>
                <div className="flex flex-col h-[450px]">

                  <div className="shrink-0 text-center mt-3">
                    <div className="poppins-bold text-xl">
                      Lets Begin With Your Introduction
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto no-scrollbar scroll-fade">
                    <div className="w-full flex flex-col items-center pb-6">


                      <div className="flex flex-col gap-2 w-[80%] mt-8">
                        <label className="poppins">Name</label>
                        <input
                          name="fullName"
                          placeholder="Enter Name"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="
              border border-white bg-transparent backdrop-blur-xl
              px-3 py-1.5 rounded-lg
              placeholder:text-gray-300/60 placeholder:text-sm
            "
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-[80%] mt-6">
                        <label className="poppins">Phone</label>
                        <input
                          name="phone"
                          placeholder="Enter Phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="
              border border-white bg-transparent backdrop-blur-xl
              px-3 py-1.5 rounded-lg
              placeholder:text-gray-300/60 placeholder:text-sm
            "
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-[80%] mt-6">
                        <label className="poppins">Email</label>
                        <input
                          name="email"
                          placeholder="Enter Email"
                          value={formData.email}
                          onChange={handleChange}
                          className="
              border border-white bg-transparent backdrop-blur-xl
              px-3 py-1.5 rounded-lg
              placeholder:text-gray-300/60 placeholder:text-sm
            "
                        />
                      </div>

                    </div>
                  </div>

                  <div className="shrink-0 flex justify-center w-[80%] mx-auto mt-6">
                    <button
                      type="button" onClick={nextStep}
                      className="bg-blue-500/80 rounded-md w-40 px-4 py-2"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </>)}

            {/* Second Step */}
            {step === 2 && (
              <>

                <div className="shrink-0 text-center">
                  <div className="poppins-bold text-xl">
                    Lets Us Know Your Qualification
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar scroll-fade">
                  <div className="w-full flex flex-col items-center pb-6">

                    <div className="flex flex-col gap-2 w-[80%] mt-4">
                      <label className="poppins">Degree</label>
                      <input
                        type="text"
                        placeholder="e.g. Bachelors of Engineering"
                        name="education[0].degree"
                        value={formData.education[0].degree}
                        onChange={handleChange}
                        className="
              border border-white bg-transparent backdrop-blur-xl
              px-3 py-1.5 rounded-lg
              placeholder:text-gray-300/60 placeholder:text-sm
            "
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-[80%] mt-6">
                      <label className="poppins">Institution</label>

                      <input
                        type="text"
                        placeholder="e.g. Thadomal Shahani Engineering College"
                        name="education[0].institution"
                        value={formData.education[0].institution}
                        onChange={handleChange}
                        className="
              border border-white bg-transparent backdrop-blur-xl
              px-3 py-1.5 rounded-lg
              placeholder:text-gray-300/60 placeholder:text-sm
            "
                      />
                    </div>



                    <div className="flex flex-col gap-2 w-[80%] mt-6">
                      <label className="poppins">Field of Study</label>
                      <input
                        type="text"
                        placeholder="e.g. Computer Engineering"
                        name="education[0].field"
                        value={formData.education[0].field}
                        onChange={handleChange}
                        className="
              border border-white bg-transparent backdrop-blur-xl
              px-3 py-1.5 rounded-lg
              placeholder:text-gray-300/60 placeholder:text-sm
            "
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-[80%] mt-6">
                      <label className="poppins">Duration</label>
                      <input
                        type="text"
                        placeholder="e.g. August 2023 - Present"
                        name="education[0].year"
                        value={formData.education[0].year}
                        onChange={handleChange}
                        className="
              border border-white bg-transparent backdrop-blur-xl
              px-3 py-1.5 rounded-lg
              placeholder:text-gray-300/60 placeholder:text-sm
            "
                      />
                    </div>
                  </div>
                </div>


                <div className="shrink-0 flex items-center gap-4 w-[80%] mx-auto mt-6">
                  <button
                    type="button" onClick={prevStep}
                    className="border border-white w-[50%] px-6 py-2 rounded-lg"
                  >
                    Back
                  </button>

                  <button
                    type="button" onClick={nextStep}
                    className="bg-blue-500/80 rounded-md w-[50%] px-2 py-2"
                  >
                    Continue
                  </button>
                </div>
              </>)}

            {/* Third Step */}

            {step === 3 && (
              <>
                <div className="flex flex-col h-[450px]">
                  <div className="shrink-0 text-center">
                    <div className="poppins-bold text-xl">
                      Lets Us Know Your Experience
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto no-scrollbar scroll-fade">

                    <div className="w-full flex flex-col items-center pb-6">

                      <div className="flex flex-col gap-2 w-[80%] mt-4">
                        <label className="poppins">Job Title / Role</label>
                        <input
                          type="text"
                          placeholder="e.g. Member of Tech Team"
                          name="workExperience[0].position"
                          value={formData.workExperience[0].position}
                          onChange={handleChange}
                          className="border border-white bg-transparent backdrop-blur-xl
                     px-3 py-1.5 rounded-lg
                     placeholder:text-gray-300/60 placeholder:text-sm"
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-[80%] mt-6">
                        <label className="poppins">Company</label>
                        <input
                          type="text"
                          placeholder="e.g. CSI - TSEC"
                          name="workExperience[0].company"
                          value={formData.workExperience[0].company}
                          onChange={handleChange}
                          className="border border-white bg-transparent backdrop-blur-xl
                     px-3 py-1.5 rounded-lg
                     placeholder:text-gray-300/60 placeholder:text-sm"
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-[80%] mt-6">
                        <label className="poppins">Description</label>
                        <textarea
                          placeholder="Describe your responsibilities and achievements"
                          name="workExperience[0].description"
                          value={formData.workExperience[0].description}
                          onChange={handleChange}
                          className="border border-white bg-transparent backdrop-blur-xl
                     px-3 py-1.5 rounded-lg
                     placeholder:text-gray-300/60 placeholder:text-sm"
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-[80%] mt-6">
                        <label className="poppins">Duration</label>
                        <input
                          type="text"
                          placeholder="e.g. June 2024 - Dec 2024"
                          name="workExperience[0].duration"
                          value={formData.workExperience[0].duration}
                          onChange={handleChange}
                          className="border border-white bg-transparent backdrop-blur-xl
                     px-3 py-1.5 rounded-lg
                     placeholder:text-gray-300/60 placeholder:text-sm"
                        />
                      </div>

                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-4 w-[80%] mx-auto mt-4">
                    <button
                      type="button" onClick={prevStep}
                      className="border border-white w-[50%] px-6 py-2 rounded-lg"
                    >
                      Back
                    </button>

                    <button
                      type="button" onClick={nextStep}
                      className="bg-blue-500/80 rounded-md w-[50%] px-2 py-2"
                    >
                      Continue
                    </button>
                  </div>
                </div>

              </>)}

            {/* Fourth Step */}
            {step === 4 && (
              <>
                <div className="flex flex-col h-[450px]">
                  <div className="shrink-0 text-center">
                    <div className="poppins-bold text-xl">
                      Lets Us Know Your Skills
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto no-scrollbar scroll-fade">

                    <div className="w-full flex flex-col items-center pb-6">
                      <div className="flex flex-col gap-2 w-[70%] mt-6">
                        <label className="poppins">Skills</label>
                        <input
                          type="text"
                          placeholder="Type Skill"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          className="
                        border border-white bg-transparent backdrop-blur-xl
                        px-3 py-1.5 rounded-lg
                        placeholder:text-gray-300/60 placeholder:text-sm
                        "
                        />
                      </div>
                      <div className='w-[70%] flex justify-end'>

                        <button type="button" onClick={addSkill}
                          className="bg-blue-500/80 rounded-md w-40 px-2 py-1.5 mt-4 text-sm"
                        >
                          + Add Skill
                        </button>
                      </div>
                    </div>

                    <ul>
                      {formData.skills.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>

                  <div className="shrink-0 flex items-center gap-4 w-[80%] mx-auto mt-4">
                    <button
                      type="button" onClick={prevStep}
                      className="border border-white w-[50%] px-6 py-2 rounded-lg"
                    >
                      Back
                    </button>

                    <button
                      type="button" onClick={nextStep}
                      className="bg-blue-500/80 rounded-md w-[50%] px-2 py-2"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </>)}

            {/* Fifth Step */}
            {step === 5 && (
              <>
                <div className="flex flex-col h-[450px]">
                  <div className="shrink-0 text-center">
                    <div className="poppins-bold text-xl">
                      Share Your Work With Us
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto no-scrollbar scroll-fade">
                    <div className="w-full flex flex-col items-center pb-6">

                      <div className="flex flex-col gap-2 w-[80%] mt-4">
                        <label className="poppins">Project Name</label>
                        <input
                          type="text"
                          placeholder="e.g. MediStats"
                          name="projects[0].name"
                          value={formData.projects[0].name}
                          onChange={handleChange}
                          className="border border-white bg-transparent backdrop-blur-xl
                     px-3 py-1.5 rounded-lg
                     placeholder:text-gray-300/60 placeholder:text-sm"
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-[80%] mt-6">
                        <label className="poppins">Project Description</label>
                        <textarea
                          placeholder="Explain what the project does"
                          name="projects[0].description"
                          value={formData.projects[0].description}
                          onChange={handleChange}
                          className="border border-white bg-transparent backdrop-blur-xl
                     px-3 py-1.5 rounded-lg
                     placeholder:text-gray-300/60 placeholder:text-sm"
                        ></textarea>
                      </div>

                      <div className="w-full flex flex-col items-center pb-6">
                        <div className="flex flex-col gap-2 w-[80%] mt-6">
                          <label className="poppins">Technologies Used</label>
                          <input
                            type="text"
                            placeholder="Type technology and press Enter"
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            className="
              border border-white bg-transparent backdrop-blur-xl
              px-3 py-1.5 rounded-lg
              placeholder:text-gray-300/60 placeholder:text-sm"
                          />
                        </div>

                        <div className='w-[80%] flex justify-end'>
                          <button
                            type="button"
                            onClick={addTechnology}
                            className="bg-blue-500/80 rounded-md w-40 px-2 py-1.5 mt-4 text-sm"
                          >
                            + Add Technology
                          </button>
                        </div>
                      </div>

                      <ul>
                        {formData.projects[0].technologies.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-4 w-[80%] mx-auto mt-4">
                    <button
                      type="button" onClick={prevStep}
                      className="border border-white w-[50%] px-6 py-2 rounded-lg"
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      className="bg-blue-500/80 rounded-md w-[50%] px-2 py-2"
                    >
                      Submit
                    </button>
                  </div>
                </div>

              </>
            )}
          </form>


        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-8 right-8 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
          toast.type === 'success' 
            ? 'bg-green-600 text-white' 
            : 'bg-red-600 text-white'
        }`}>
          <div className="flex items-center gap-3">
            {toast.type === 'success' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </div >
  )
}

export default OnBoarding








