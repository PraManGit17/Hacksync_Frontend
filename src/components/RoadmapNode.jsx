import { CheckCircle2, Lock, Zap } from "lucide-react";

export default function RoadmapNode({ node, status, onSelect }) {
  return (
    <button
      onClick={() => onSelect(node)}
      disabled={status === "locked"}
      className={`
        relative group w-[280px] px-8 py-5 rounded-2xl
        backdrop-blur-xl border transition-all duration-300
        ${status === "completed" && "border-emerald-500/60 shadow-[0_0_40px_rgba(16,185,129,0.25)]"}
        ${status === "available" && "border-purple-500/50 hover:border-purple-400 hover:shadow-[0_0_60px_rgba(168,85,247,0.35)]"}
        ${status === "locked" && "border-zinc-800 opacity-40 cursor-not-allowed"}
        bg-gradient-to-br from-zinc-950/80 to-zinc-900/60
      `}
    >
      {/* Glow Layer */}
      <div className="absolute inset-0 rounded-2xl bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-2">
        <h3 className="font-mono text-xs tracking-[0.3em] uppercase text-white">
          {node.title}
        </h3>

        {status === "completed" && <CheckCircle2 size={16} className="text-emerald-400" />}
        {status === "locked" && <Lock size={14} className="text-zinc-500" />}
        {status === "available" && <Zap size={14} className="text-purple-400 animate-pulse" />}
      </div>

      {/* Description */}
      <p className="relative text-[11px] text-zinc-400 leading-relaxed">
        {node.description}
      </p>

      {/* Bottom Scan Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100" />
    </button>
  );
}
