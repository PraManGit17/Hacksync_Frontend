import React from 'react'
import HeroSection from '../components/Home Components/HeroSection'
import Navbar from '../components/Navbar'
import OnBoarding from '../components/Home Components/OnBoarding'

const Home = () => {
  return (
    <div className='relative '>
        <Navbar />
        <HeroSection />
        <OnBoarding />
    </div>
  )
}

export default Home


