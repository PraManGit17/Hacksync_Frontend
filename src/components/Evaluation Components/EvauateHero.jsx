import { ChevronRight } from 'lucide-react'
import React, { useState } from 'react'


const EvauateHero = ({ onEvaluationComplete }) => {
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)


  const handleEvaluate = async () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description')
      return
    }

    // 1️⃣ Fetch resume data from localStorage
    const storedProfile = localStorage.getItem('resumeFormData') || localStorage.getItem('userProfile')

    if (!storedProfile) {
      alert('Please complete onboarding first to set up your profile')
      return
    }

    const profileData = JSON.parse(storedProfile)

    // 2️⃣ Validate onboarding fields
    const isInvalid =
      !profileData.fullName ||
      !profileData.skills ||
      profileData.skills.length === 0

    if (isInvalid) {
      alert('Please complete onboarding with at least your name and skills')
      return
    }

    // 3️⃣ Make API call
    try {
      setLoading(true)

      const res = await fetch('http://localhost:3000/api/evaluate-readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData: profileData,
          jobDescription,
        }),
      })

      const result = await res.json()

      if (!result.success) {
        throw new Error(result.error || 'Evaluation failed')
      }

      // Pass the evaluation data to parent component
      onEvaluationComplete(result.data)
      
      // Scroll to results
      setTimeout(() => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
      }, 100)

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

        <div className='flex flex-col items-center gap-4 mt-8 poppins w-[50%]'>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder='Paste the job description here...'
            rows={8}
            className='backdrop-blur-sm bg-white/10 w-full border-2 border-white/30 rounded-xl p-5 text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none transition-colors'
          />

          <button
            onClick={handleEvaluate}
            disabled={loading || !jobDescription.trim()}
            className='w-full py-4 px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3'
          >
            {loading ? (
              <>
                <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                Analyzing...
              </>
            ) : (
              <>
                Evaluate My Profile
                <ChevronRight className='w-5 h-5' />
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  )
}

export default EvauateHero
