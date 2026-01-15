import { ExternalLink, CheckCircle2 } from "lucide-react";

export default function RoadmapPanel({ topic, onComplete }) {
  if (!topic) return null;

  return (
    <aside className="fixed right-8 top-24 w-[420px] z-50">
      <div className="relative bg-[#0a0a0c]/90 border border-purple-500/40 rounded-[2.5rem] p-10 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* HUD Accents */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

        <div className="mb-6">
          <span className="text-purple-500 font-mono text-[10px] tracking-[0.5em] uppercase">
            Knowledge Module
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight mt-2">
            {topic.title}
          </h2>
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed mb-8">
          {topic.description}
        </p>

        <div className="space-y-3 mb-8">
          {topic.resources.map((r, idx) => (
            <a
              key={r.url || idx}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-5 py-3 bg-zinc-900/60 border border-zinc-800 rounded-xl text-sm hover:border-purple-500/50 hover:bg-zinc-800/80 transition-all group"
            >
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-white font-medium group-hover:text-purple-400 transition-colors">
                  {r.title || r.label || 'Resource'}
                </span>
                {r.type && (
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">
                    {r.type}
                  </span>
                )}
              </div>
              <ExternalLink size={16} className="text-purple-400 flex-shrink-0 ml-3" />
            </a>
          ))}
        </div>

        <button
          onClick={() => onComplete(topic.id)}
          className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(168,85,247,0.4)]"
        >
          <CheckCircle2 size={14} />
          Confirm Mastery
        </button>
      </div>
    </aside>
  );
}
