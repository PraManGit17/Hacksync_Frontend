// import React from 'react'
// import { Routes, Route } from "react-router-dom";
// import Home from './pages/Home'
// import NotFound from './pages/NotFound';

// const App = () => {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </>
//   )
// }

// export default App

import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import NotFound from './pages/NotFound';
import ResumePage from './pages/ResumePage';
import InterviewDashboard from './pages/InterviewDashboard';
import InterviewLobby from './pages/InterviewLobby';
import FeedbackReport from './pages/FeedbackReport';
import Mock from './pages/Mock';
import Career from './pages/Career';
import FlashCards from './pages/FlashCards';
import FlashCardsTopics from './pages/FlashCardsTopics';
import KanbanBoard from './pages/KanbanBoard';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="path" element={<Career />} />
        <Route path='/resume' element={<ResumePage />}/>
        <Route path='/interview' element={<InterviewDashboard/>}/>
        <Route path='/interview-lobby' element={<InterviewLobby/>} />
        <Route path='/interview-room' element={<Mock/>}/>
        <Route path='/interview-feedback' element={<FeedbackReport/>} />
        <Route path='/flash-cards/:topic' element={<FlashCards/>} />
        <Route path='/flashcards-topics' element={<FlashCardsTopics/>} />
        <Route path="/kanban" element={<KanbanBoard />} />


      </Routes>
    </>
  )
}

export default App