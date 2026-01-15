import React, { useState, useEffect } from "react";
import { Layout, Plus, Clock, CheckCircle2, AlertCircle, Trash2, X, Search, Settings2 } from "lucide-react";
import Navbar from "../components/Navbar";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("skillSphereTasks");
    return saved ? JSON.parse(saved) : [
      { id: "1", title: "Refactor Authentication Middleware", status: "todo", priority: "high", date: "Jan 18" },
      { id: "2", title: "Cloud Infrastructure Migration", status: "in-progress", priority: "medium", date: "Jan 20" }
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", priority: "medium" });

  useEffect(() => {
    localStorage.setItem("skillSphereTasks", JSON.stringify(tasks));
  }, [tasks]);

  const columns = [
    { id: "todo", title: "Proposed", icon: <AlertCircle size={16} />, accent: "bg-blue-500" },
    { id: "in-progress", title: "In Development", icon: <Clock size={16} />, accent: "bg-purple-500" },
    { id: "done", title: "Completed", icon: <CheckCircle2 size={16} />, accent: "bg-emerald-500" },
  ];

  const onDragStart = (e, id) => e.dataTransfer.setData("taskId", id);
  const onDragOver = (e) => e.preventDefault();
  const onDrop = (e, status) => {
    const id = e.dataTransfer.getData("taskId");
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    const taskObj = {
      id: Date.now().toString(),
      title: newTask.title,
      priority: newTask.priority,
      status: "todo",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
    setTasks([...tasks, taskObj]);
    setNewTask({ title: "", priority: "medium" });
    setIsModalOpen(false);
  };

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-200 font-sans tracking-tight">
      <Navbar />
      
      {/* Added pt-32 to clear the Fixed Navbar */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-32 pb-20">
        
        {/* TOP INTERFACE BAR */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-8 border-b border-zinc-800/60 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-purple-500 shadow-xl">
              <Layout size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight leading-none">Project Management</h1>
              <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest font-mono">Workspace / Engineering_Sprint</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
              <input 
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg pl-9 pr-4 py-2.5 text-[11px] font-mono outline-none focus:border-purple-500 transition-colors" 
                placeholder="SEARCH_TASK_ID..." 
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 bg-white text-black hover:bg-purple-600 hover:text-white rounded-lg flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest transition-all active:scale-95"
            >
              <Plus size={16} strokeWidth={3} /> Create Task
            </button>
          </div>
        </header>

        {/* BOARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map((col) => (
            <div 
              key={col.id}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, col.id)}
              className="flex flex-col rounded-2xl bg-zinc-900/10 border border-zinc-800/40 p-5 h-full min-h-[700px] backdrop-blur-sm"
            >
              {/* Column Meta */}
              <div className="flex justify-between items-center mb-6 px-1">
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${col.accent} shadow-[0_0_10px_rgba(168,85,247,0.5)]`} />
                  <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{col.title}</h2>
                  <span className="text-[10px] font-black bg-zinc-800 px-2 py-0.5 rounded text-zinc-500">
                    {tasks.filter(t => t.status === col.id).length}
                  </span>
                </div>
                <Settings2 size={14} className="text-zinc-700 hover:text-zinc-400 cursor-pointer" />
              </div>

              {/* Task List */}
              <div className="flex-1 space-y-4">
                {tasks.filter((t) => t.status === col.id).map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, task.id)}
                    className="group bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-5 cursor-grab active:cursor-grabbing hover:border-purple-500/40 hover:bg-zinc-900/80 transition-all shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-[9px] font-black px-2 py-1 rounded border uppercase tracking-tighter ${
                        task.priority === 'high' ? 'text-red-400 border-red-400/20 bg-red-400/5' : 
                        task.priority === 'medium' ? 'text-amber-400 border-amber-400/20 bg-amber-400/5' : 'text-blue-400 border-blue-400/20 bg-blue-400/5'
                      }`}>
                        {task.priority}
                      </span>
                      <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 p-1 text-zinc-700 hover:text-red-500 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <h3 className="text-[15px] font-bold text-zinc-100 leading-snug mb-6">{task.title}</h3>
                    <div className="flex justify-between items-center pt-4 border-t border-zinc-800/40 text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                      <div className="flex items-center gap-2"><Clock size={12} className="text-purple-500" /> {task.date}</div>
                      <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[8px] font-black">AI</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL REMAINING THE SAME WITH PROFESSIONAL FIXES */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-purple-600" />
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">Initialize Task</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-zinc-500 hover:text-white transition-colors"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddTask} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Protocol Title</label>
                <input 
                  autoFocus
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-4 text-sm focus:border-purple-600 outline-none transition-colors"
                  placeholder="Summarize objective..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Priority Index</label>
                <div className="grid grid-cols-3 gap-3">
                  {['low', 'medium', 'high'].map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setNewTask({...newTask, priority: p})}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                        newTask.priority === p ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/40' : 'bg-black border-zinc-800 text-zinc-500'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-white text-black rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-purple-600 hover:text-white transition-all transform active:scale-95 shadow-2xl">
                Confirm Execution
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;