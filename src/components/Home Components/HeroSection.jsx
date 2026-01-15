import React from 'react'

const HeroSection = () => {
  return (
    <div className='relative z-10 black_bg h-screen w-full flex justify-center items-center overflow-hidden '>

      {/* <div className='absolute z-0 w-[50%] h-full scale-220 rounded-full -top-135 
      bg-[radial-gradient(circle_at_center,_#000000_0%,_#16081f_40%,_#4b1f6f_70%,_#6b2fa8_100%)]'></div>
 */}

      <div className='absolute z-0 w-[50%] h-full scale-220 rounded-full -top-135 
          bg-[radial-gradient(circle_at_center,_#000_0%,_#1a1a1a_45%,_#2f2f8f_70%,_#5151BE_100%,_transparent_200%)]'></div>


      <div className="relative z-10 text-white w-full h-screen flex flex-col items-center justify-center gap-2">

        <div className='flex items-center gap-2 border border-white rounded-2xl px-4 py-1.5 poppins'>
          <div className='bg-green-500 w-2 h-2 rounded-2xl' />
          Begin A Carieer Anew
        </div>

        <div className='text-5xl poppins-bold leading-relaxed'>
          <div>From confusion to clarity </div>
          <div>From learning to landing</div>
        </div>

        <div className='mt-5 text-xl poppins max-w-2xl text-center'>
          Discover the right career path, build job-ready skills, and prepare for real interviews —
          all with <span className='font-bold'>Skillsphere</span> platform.
        </div>

        <div className='flex items-center gap-10 mt-8 poppins'>
          <button className='bg-[#360ba1] rounded-md w-35 px-2 py-2'>On-Boarding</button>
          <button className='border border-white w-30 px-6 py-2 rounded-lg'>Explore</button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
