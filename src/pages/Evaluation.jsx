import React, { useState } from 'react'
import EvauateHero from '../components/Evaluation Components/EvauateHero'
import Navbar from '../components/Navbar'
import EvaluationResult from '../components/Evaluation Components/EvaluationResult'

const Evaluation = () => {
  const [evaluationData, setEvaluationData] = useState(null)

  return (
    <div className='relative bg-black'>
      <Navbar />
      <EvauateHero onEvaluationComplete={setEvaluationData} />
      {evaluationData && <EvaluationResult data={evaluationData} />}
    </div>
  )
}

export default Evaluation
