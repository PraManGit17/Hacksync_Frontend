import React from 'react';
import { Terminal, Plus, Trash2, Sparkles, Briefcase, Award } from 'lucide-react';

const ResumeEditor = ({ formData, handleChange, addEntry, removeEntry, updateList }) => {
  return (
    <div className="lg:col-span-4 space-y-6 max-h-[90vh] overflow-y-auto pr-4 custom-scrollbar">
      <div className="sticky top-0 z-10 bg-black pb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Terminal className="text-purple-500" size={24} /> 
          CV <span className="text-zinc-500">ENGINE</span>
        </h2>
      </div>

      <div className="space-y-6 p-6 rounded-[2rem] border border-zinc-800 bg-zinc-900/10 backdrop-blur-xl">
        {/* --- IDENTITY SECTION --- */}
        <section className="space-y-4">
          <label className="text-[10px] uppercase tracking-[0.2em] text-purple-500 font-black">Identity Matrix</label>
          <input 
            name="fullName" 
            placeholder="FULL NAME"
            onChange={handleChange} 
            value={formData.fullName} 
            className="w-full bg-black/50 border border-zinc-800 rounded-xl p-3 focus:border-purple-500 outline-none transition-all" 
          />
          <input 
            name="role" 
            placeholder="PROFESSIONAL ROLE"
            onChange={handleChange} 
            value={formData.role} 
            className="w-full bg-black/50 border border-zinc-800 rounded-xl p-3 focus:border-purple-500 outline-none transition-all" 
          />
        </section>

        {/* --- DYNAMIC PROJECTS SECTION --- */}
        <section className="space-y-4 pt-4 border-t border-zinc-900">
          <div className="flex justify-between items-center">
            <label className="text-[10px] uppercase tracking-[0.2em] text-purple-500 font-black flex items-center gap-2">
              <Briefcase size={14} /> Project Deployments
            </label>
            <button 
              onClick={() => addEntry('projects', { title: '', desc: '' })}
              className="p-1.5 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          {formData.projects.map((proj, index) => (
            <div key={index} className="relative p-4 rounded-xl border border-zinc-800 bg-black/30 group">
              <button 
                onClick={() => removeEntry('projects', index)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-500 transition-all"
              >
                <Trash2 size={14} />
              </button>
              <input 
                placeholder="PROJECT TITLE"
                value={proj.title}
                onChange={(e) => updateList('projects', index, e.target.value, 'title')}
                className="w-full bg-transparent border-b border-zinc-800 mb-3 pb-1 text-sm font-bold focus:border-purple-500 outline-none" 
              />
              <textarea 
                placeholder="SYSTEM DESCRIPTION"
                value={proj.desc}
                onChange={(e) => updateList('projects', index, e.target.value, 'desc')}
                rows="2"
                className="w-full bg-transparent text-xs text-zinc-400 outline-none resize-none" 
              />
            </div>
          ))}
        </section>

        {/* --- DYNAMIC ACHIEVEMENTS SECTION --- */}
        <section className="space-y-4 pt-4 border-t border-zinc-900">
          <div className="flex justify-between items-center">
            <label className="text-[10px] uppercase tracking-[0.2em] text-purple-500 font-black flex items-center gap-2">
              <Award size={14} /> Achievements
            </label>
            <button 
              onClick={() => addEntry('achievements', { title: '', desc: '' })}
              className="p-1.5 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          {formData.achievements.map((ach, index) => (
            <div key={index} className="relative p-4 rounded-xl border border-zinc-800 bg-black/30 group">
              <button 
                onClick={() => removeEntry('achievements', index)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-500 transition-all"
              >
                <Trash2 size={14} />
              </button>
              <input 
                placeholder="ACHIEVEMENT TITLE"
                value={ach.title}
                onChange={(e) => updateList('achievements', index, e.target.value, 'title')}
                className="w-full bg-transparent border-b border-zinc-800 mb-2 pb-1 text-sm font-bold focus:border-purple-500 outline-none" 
              />
              <input 
                placeholder="INSTITUTION / DETAILS"
                value={ach.desc}
                onChange={(e) => updateList('achievements', index, e.target.value, 'desc')}
                className="w-full bg-transparent text-[10px] text-zinc-500 outline-none" 
              />
            </div>
          ))}
        </section>

        <button className="w-full py-4 mt-6 bg-purple-600 hover:bg-purple-500 rounded-2xl font-bold transition-all shadow-[0_0_30px_rgba(147,51,234,0.3)] flex items-center justify-center gap-2">
          <Sparkles size={18} /> AI OPTIMIZE CONTENT
        </button>
      </div>
    </div>
  );
};

export default ResumeEditor;