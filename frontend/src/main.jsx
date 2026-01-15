import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { InterviewProvider } from './context/InterviewContext';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,


  <BrowserRouter>
    <InterviewProvider>
      <App />
    </InterviewProvider>
  </BrowserRouter>

)
