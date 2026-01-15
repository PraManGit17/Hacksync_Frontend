import { useState, useEffect } from "react";
import { frontendRoadmap } from "../data/frontendRoadmap";
import RoadmapLevel from "./RoadmapLevel";
import RoadmapPanel from "./RoadmapPanel";

export default function RoadmapView() {
  const allNodes = frontendRoadmap.levels.flatMap(l => l.nodes);

  const [progress, setProgress] = useState({});
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const state = {};
    allNodes.forEach(node => {
      state[node.id] = node.prerequisites.length === 0 ? "available" : "locked";
    });
    setProgress(state);
  }, []);

  const markCompleted = (id) => {
    setProgress(prev => {
      const next = { ...prev, [id]: "completed" };

      allNodes.forEach(n => {
        if (
          n.prerequisites.includes(id) &&
          n.prerequisites.every(p => next[p] === "completed")
        ) {
          next[n.id] = "available";
        }
      });

      return next;
    });
  };

  return (
    <div className="relative flex gap-20">
      <div className="flex flex-col gap-32">
        {frontendRoadmap.levels.map(level => (
          <RoadmapLevel
            key={level.level}
            level={level}
            progress={progress}
            onSelect={setSelected}
          />
        ))}
      </div>

      <RoadmapPanel topic={selected} onComplete={markCompleted} />
    </div>
  );
}
