import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold tracking-wide">
          SocialScheduler
        </h1>

        <Button
          onClick={() => navigate("/dashboard")}
          className="bg-indigo-600 hover:bg-indigo-500"
        >
          Open Dashboard
        </Button>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-28 px-6">
        <h2 className="text-5xl font-bold leading-tight max-w-4xl">
          Plan, Schedule & Analyze
          <span className="text-indigo-400"> Social Media Campaigns</span>
        </h2>

        <p className="mt-6 text-slate-400 max-w-2xl text-lg">
          A centralized dashboard to manage posts, track engagement,
          collaborate with your team and optimize cross-platform growth.
        </p>

        <div className="mt-10 flex gap-6">
          <Button
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-500"
            onClick={() => navigate("/dashboard")}
          >
            Get Started
          </Button>
          <Button
              size="lg"
              variant="outline"
              className="border-indigo-500 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all duration-300"
              onClick={() => navigate("/posts")}
            >
            Explore Posts
        </Button>
        </div>
      </div>

      {/* Feature Section */}
      <div className="grid md:grid-cols-3 gap-8 px-12 mt-36 pb-24">
        <div className="bg-slate-900 p-8 rounded-xl shadow-lg hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold mb-4">
            Smart Scheduling
          </h3>
          <p className="text-slate-400">
            Schedule posts across multiple platforms with precision timing and automated publishing.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-xl shadow-lg hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold mb-4">
            Analytics Dashboard
          </h3>
          <p className="text-slate-400">
            Monitor likes, comments, shares and compare platform performance in real time.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-xl shadow-lg hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold mb-4">
            Team Collaboration
          </h3>
          <p className="text-slate-400">
            Assign tasks, track deadlines and streamline campaign workflow effortlessly.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-slate-500 py-6 border-t border-slate-800">
        © 2026 SocialScheduler • Built with React, Node & Supabase
      </div>
    </div>
  );
};

export default Landing;