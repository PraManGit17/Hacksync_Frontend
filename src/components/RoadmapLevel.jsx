import RoadmapNode from "./RoadmapNode";

export default function RoadmapLevel({ level, progress, onSelect }) {
  return (
    <div className="relative flex gap-16">
      
      {/* Vertical Spine */}
      <div className="relative w-24 flex justify-center">
        <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/40 via-zinc-700 to-transparent" />
        <div className="relative z-10 w-10 h-10 rounded-xl bg-zinc-950 border border-purple-500/50 flex items-center justify-center font-mono text-xs text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
          L{level.level}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="text-xl font-black tracking-tight text-white uppercase">
            {level.label}
          </h4>
          <p className="text-[10px] text-purple-500 font-mono tracking-[0.4em] uppercase">
            System Layer
          </p>
        </div>

        <div className="flex gap-6 flex-wrap">
          {level.nodes.map(node => (
            <RoadmapNode
              key={node.id}
              node={node}
              status={progress[node.id]}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
