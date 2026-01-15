import React from 'react';
import { Mail, Globe, Linkedin, Github, Download } from 'lucide-react';

const ResumePreview = ({ formData }) => {
  // Function to handle PDF Download via Browser Print
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="lg:col-span-8 flex flex-col items-center">
      {/* Container for the Resume Page. 
          Uses 'aspect-[1/1.414]' to mimic A4 paper dimensions. 
          The 'print-container' class is used to target this area for printing.
      */}
      <div id="printable-resume" className="bg-white text-black w-full max-w-[800px] shadow-2xl p-12 min-h-[1050px] font-serif transition-all print:shadow-none print:p-0">
        
        {/* HEADER SECTION: Centered Name & Contact */}
        <header className="text-center border-b-2 border-black pb-8 mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4 uppercase">
            {formData.fullName || "YOUR NAME"}
          </h1>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <span className="flex items-center gap-1"><Mail size={14}/> {formData.email || "email@example.com"}</span>
            <span className="flex items-center gap-1"><Globe size={14}/> {formData.website || "portfolio.com"}</span>
            <span className="flex items-center gap-1"><Linkedin size={14}/> LinkedIn</span>
            <span className="flex items-center gap-1"><Github size={14}/> GitHub</span>
          </div>
        </header>

        {/* SUMMARY SECTION */}
        <section className="mb-10 text-left">
          <h2 className="text-lg font-bold border-b border-zinc-300 uppercase tracking-widest mb-4">Professional Profile</h2>
          <p className="text-sm leading-relaxed italic text-zinc-700">
            {formData.summary || "Highly motivated professional..."}
          </p>
        </section>

        {/* TWO-COLUMN CONTENT GRID */}
        <div className="grid grid-cols-12 gap-10">
          
          {/* Left Column: Skills & Accolades */}
          <div className="col-span-4 space-y-10 text-left border-r border-zinc-200 pr-6">
            <section>
              <h3 className="text-sm font-bold uppercase mb-4 text-purple-700">Expertise</h3>
              <ul className="space-y-2">
                {['React.js', 'Node.js', 'MongoDB', 'Python', 'C++', 'Tailwind'].map(skill => (
                  <li key={skill} className="text-xs font-medium border-l-2 border-zinc-200 pl-2">{skill}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-sm font-bold uppercase mb-4 text-purple-700">Achievements</h3>
              <div className="space-y-4">
                {formData.achievements.map((ach, index) => (
                  <div key={index} className="pb-2 border-b border-zinc-100 last:border-0">
                    <p className="text-xs font-bold uppercase">{ach.title || "Achievement Name"}</p>
                    <p className="text-[10px] text-zinc-500 mt-1 uppercase leading-tight">{ach.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Projects & Experience */}
          <div className="col-span-8 space-y-10 text-left">
            <section>
              <h3 className="text-sm font-bold uppercase mb-6 text-purple-700">Major Deployments</h3>
              <div className="space-y-8">
                {formData.projects.map((proj, index) => (
                  <div key={index} className="relative group">
                    <h4 className="text-sm font-bold text-black uppercase mb-1">{proj.title || "Project Title"}</h4>
                    <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                      {proj.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold uppercase mb-6 text-purple-700">Work Experience</h3>
              <div className="relative pl-4 border-l border-zinc-300">
                <h4 className="text-sm font-bold text-black uppercase">{formData.experience || "Role Name"}</h4>
                <p className="text-xs text-purple-600 font-bold mt-1 uppercase italic tracking-wide">Primary Lead Position</p>
                <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
                  {formData.expDetail}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* DOWNLOAD BUTTON: Floating Action */}
      <button 
        onClick={handleDownload}
        className="mt-8 flex items-center gap-3 bg-purple-600 text-white px-10 py-4 rounded-full font-bold hover:bg-purple-500 hover:scale-105 transition-all shadow-xl active:scale-95 print:hidden"
      >
        <Download size={20} strokeWidth={3} /> 
        DOWNLOAD PDF
      </button>

      {/* INLINE PRINT CSS: Hides everything except the resume when printing */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
              background: white !important;
            }
            #printable-resume, #printable-resume * {
              visibility: visible;
            }
            #printable-resume {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0;
              padding: 20px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResumePreview;