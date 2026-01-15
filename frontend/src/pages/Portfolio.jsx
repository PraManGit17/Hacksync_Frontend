import React from 'react'
import Navbar from '../components/Navbar'
import PortfolioHero from '../components/Portfolio Components/PortfolioHero'
import PortfolioGenerator from '../components/Portfolio Components/PortfolioGenerator'

const Portfolio = () => {
  return (
    <div className='relative bg-black'>


      {/* <div className='absolute z-20 w-[50%] h-5 bg-white bottom-0 right-200 '>

      </div> */}


      <Navbar />
      <PortfolioHero />
      <PortfolioGenerator />
    </div>
  )
}

export default Portfolio
