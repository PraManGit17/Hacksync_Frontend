// import Navbar from "../components/Navbar";
import Navbar from "../components/Navbar";
import RoadmapViewDynamic from "../components/RoadmapViewDynamic";

export default function RoadmapDetailPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-10 pt-32">
        <RoadmapViewDynamic />
      </main>
    </div>
  );
}
