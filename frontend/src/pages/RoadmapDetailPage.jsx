// import Navbar from "../components/Navbar";
import Navbar from "../components/Navbar";
import RoadmapView from "../components/RoadmapView";

export default function RoadmapDetailPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-10 pt-32">
        <h1 className="text-6xl font-black uppercase mb-20">
          Frontend<span className="text-purple-500">.sh</span>
        </h1>
        <RoadmapView />
      </main>
    </div>
  );
}
