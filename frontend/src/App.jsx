import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import NotFound from './pages/NotFound';
import CareerPath from './pages/CareerPath';
import Resume from './pages/Resume';
import InterviewDashboard from './pages/InterviewDashboard';
import InterviewLobby from './pages/InterviewLobby';
import FeedbackReport from './pages/FeedbackReport';
import Mock from './pages/Mock';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="path" element={<CareerPath />} />
        <Route path='/resume' element={<Resume/>}/>
        <Route path='/interview' element={<InterviewDashboard/>}/>
        <Route path='/interview-lobby' element={<InterviewLobby/>} />
        <Route path='/interview-room' element={<Mock/>}/>
        <Route path='/interview-feedback' element={<FeedbackReport/>} />

      </Routes>
    </>
  )
}

export default App
