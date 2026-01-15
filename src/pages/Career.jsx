import React from 'react'
import Navbar from '../components/Navbar'
import CareerHero from '../components/Career Components/CareerHero'
import CareerPath from '../components/Career Components/CareerPath'
import Roadmap from '../components/Roadmap'

const Career = () => {
  return (
    <div className='relative bg-black'>
      <Navbar />
      <CareerHero />
      <CareerPath />
      <Roadmap />
    </div>
  )
}

export default Career
