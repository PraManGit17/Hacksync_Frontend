
import { ChevronRight } from 'lucide-react'
import React, { useState } from 'react'


const EvauateHero = () => {
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)


  const handleEvaluate = async () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description')
      return
    }

    // 1️⃣ Fetch resume data from localStorage
    const storedProfile = localStorage.getItem('resumeFormData')

    if (!storedProfile) {
      alert('Complete onboarding first')
      return
    }

    const profileData = JSON.parse(storedProfile)

    // 2️⃣ Validate onboarding fields
    const isInvalid =
      !profileData.fullName ||
      !profileData.skills ||
      profileData.skills.length === 0 ||
      !profileData.projects ||
      profileData.projects.length === 0

    if (isInvalid) {
      alert('Complete onboarding first')
      return
    }

    // 3️⃣ Make API call
    try {
      setLoading(true)

      const res = await fetch('http://localhost:3000/api/evaluate-readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: profileData,
          jobDescription,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || 'Evaluation failed')
      }

      alert('Evaluation completed 🚀')
      console.log('Evaluation Result:', result)



    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='relative z-10 black_bg h-screen w-full flex justify-center items-center overflow-hidden'>
      <div className='absolute z-0 w-[50%] h-full '> <div className='absolute z-0 rotate-45 h-200 w-20 bg-[#360ba1] -bottom-50 -left-75 opacity-75 '></div> <div className='absolute z-0 rotate-45 h-100 w-20 bg-[#360ba1] -top-20 -left-50 opacity-75 '></div> <div className='absolute z-0 rotate-45 h-150 w-20 bg-[#360ba1] bottom-25 right-110 opacity-75'></div> <div className='absolute z-0 rotate-45 h-200 w-20 bg-[#360ba1] -top-70 -right-50 opacity-75'></div> 
      <div className='absolute z-0 rotate-45 h-140 w-20 bg-[#360ba1] -bottom-40 -right-45 opacity-75'></div> </div>
      <div className='relative z-10 text-white w-full h-screen flex flex-col items-center justify-center gap-2'>

        <div className='text-5xl poppins-bold leading-relaxed'>
          <div>Know Where You Stand.</div>
          <div>Know What to Improve.</div>
        </div>

        <div className='mt-3 text-xl poppins max-w-2xl text-center'>
          SKILLSPHERE analyzes your profile against real job descriptions
        </div>

        <div className='relative flex items-center gap-10 mt-8 poppins w-[40%]'>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder='Enter Job Description'
            rows={5}
            className='backdrop-blur-sm bg-white/0 w-full border-2 border-white rounded-xl p-5 bg-transparent text-white placeholder:text-gray-400'
          />

          <button
            onClick={handleEvaluate}
            disabled={loading}
            className='absolute bottom-4 right-2 disabled:opacity-50'
          >
            <ChevronRight className='w-6 h-6 text-white' />
          </button>

        </div>
      </div>
    </div>
  )
}

export default EvauateHero
