import React, { useState } from 'react';
import ResumeEditor from '../components/ResumeEditor';
import ResumePreview from '../components/ResumePreview';

const Resume = () => {
  const [formData, setFormData] = useState({
    fullName: "PARTH KHANDELWAL",
    role: "FULL-STACK DEVELOPER & COMPUTER ENGINEER",
    email: "Parthkhandelwal489@gmail.com",
    website: "linkedin.com/in/parth",
    summary: "Computer Engineering student with a strong academic background (GPA: 9.545/10) and hands-on experience in full-stack web development using React, Node.js, and JavaScript.",
    experience: "Lead Developer @ HireX Platform",
    expDetail: "Designed and developed a scalable MERN application with real-time video conferencing and collaborative coding.",
    // ADD THESE TO PREVENT THE MAP ERROR
    projects: [
      { title: "HIREX – MOCK CODING INTERVIEW PLATFORM", desc: "Full-Stack Web App using MERN Stack with real-time video and collaborative coding." }
    ],
    achievements: [
      { title: "WINNER 1ST PLACE – TECHNEXT HACKATHON 2025", desc: "Built a Local Experience & Tourism Guide Platform." }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.toUpperCase() }));
  };

  // HANDLER: Add new empty entry to a specific list
  const addEntry = (field, template) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], template] }));
  };

  // HANDLER: Remove an entry by index
  const removeEntry = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // HANDLER: Update a specific field within a list item
  const updateList = (field, index, value, key) => {
    const newList = [...formData[field]];
    newList[index][key] = value.toUpperCase();
    setFormData(prev => ({ ...prev, [field]: newList }));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans selection:bg-purple-500/30">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-[1600px] mx-auto">
        {/* Pass all dynamic handlers to the Editor */}
        <ResumeEditor 
          formData={formData} 
          handleChange={handleChange} 
          addEntry={addEntry}
          removeEntry={removeEntry}
          updateList={updateList}
        />
        <ResumePreview formData={formData} />
      </div>
    </div>
  );
};

export default Resume;