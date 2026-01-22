import ProjectTable from "../components/ProjectTable";
import DelayChart from "../components/DelayChart";
import ProjectMap from "../components/ProjectMap";
import projects from "../data/projects.json";

export default function Home() {
  return (
    <main className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">
        PAIMANA Infrastructure Project Tracker
      </h1>

      {/* TABLE */}
      <section className="bg-white p-4 border rounded">
        <ProjectTable data={projects} />
      </section>

      {/* CHART + MAP */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 border rounded">
          <DelayChart data={projects} />
        </div>

        <div className="bg-white p-4 border rounded">
          <ProjectMap data={projects} />
        </div>
      </section>
    </main>
  );
}
