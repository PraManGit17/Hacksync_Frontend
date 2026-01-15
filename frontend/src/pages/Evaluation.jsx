import React from 'react'
import EvauateHero from '../components/Evaluation Components/EvauateHero'
import Navbar from '../components/Navbar'
import EvaluationResult from '../components/Evaluation Components/EvaluationResult'

const Evaluation = () => {
  return (
    <div className='relative bg-black'>
      <Navbar />
      <EvauateHero />
      <EvaluationResult />
    </div>
  )
}

export default Evaluation
