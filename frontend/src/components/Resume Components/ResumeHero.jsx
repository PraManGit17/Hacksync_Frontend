import React from 'react'

const ResumeHero = () => {
  return (
    <div className='relative z-10 black_bg h-screen w-full flex justify-center items-center overflow-hidden '>

      {/* <div className='absolute z-0 w-[50%] h-full scale-220 rounded-full -top-135 
      bg-[radial-gradient(circle_at_center,_#000000_0%,_#16081f_40%,_#4b1f6f_70%,_#6b2fa8_100%)]'></div>
 */}

      <div className='absolute z-0 w-[50%] h-full scale-250 rounded-full -top-105 right-0
          bg-[radial-gradient(circle_at_center,_#000_0%,_#1a1a1a_45%,_#2f2f8f_70%,_#5151BE_100%,_transparent_200%)]'></div>


      <div className="relative z-10 text-white w-full h-screen flex flex-col items-center justify-center gap-2">
        <div className='text-5xl poppins-bold'>
          <div className='max-w-2xl text-center'>Build a Resume That Gets You Hired</div>
        </div>

        <div className='mt-5 text-xl poppins max-w-3xl text-center'>
          Build and optimize your resume for ATS systems and recruiters, so that your resume doesn't just look good, it performs.   </div>

        <div className='flex items-center gap-10 mt-8 poppins'>
          <button className='border border-white w-40 px-6 py-2 rounded-lg hover:bg-gradient-r hover:from-blue-500 hover:to-white/0'>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default ResumeHero
