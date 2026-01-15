import React from 'react'
import Navbar from '../components/Navbar'
import ResumeHero from '../components/Resume Components/ResumeHero'
import Resume from '../components/Resume Components/Resume'


const ResumePage = () => {
  return (
    <div className='relative bg-black'>
      <Navbar />
      <ResumeHero />
      <Resume />
    </div>
  )
}

export default ResumePage
