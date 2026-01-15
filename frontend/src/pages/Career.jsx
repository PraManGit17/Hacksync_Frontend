import React from 'react'
import Navbar from '../components/Navbar'
import CareerHero from '../components/Career Components/CareerHero'
import CareerPath from '../components/Career Components/CareerPath'

const Career = () => {
  return (
    <div className='relative '>
      <Navbar />
      <CareerHero />
      <CareerPath />
    </div>
  )
}

export default Career
