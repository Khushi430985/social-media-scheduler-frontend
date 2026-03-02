import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 p-6">
        <h1 className="text-xl font-bold mb-8">Social Scheduler</h1>

        <nav className="space-y-4">
          <Link to="/dashboard" className="block hover:text-slate-300">Dashboard</Link>
          <Link to="/posts" className="block hover:text-slate-300">Posts</Link>
          <Link to="/campaigns" className="block hover:text-slate-300">Campaigns</Link>
          <Link to="/tasks" className="block hover:text-slate-300">Tasks</Link>
          <Link to="/analytics" className="block hover:text-slate-300">Analytics</Link>
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 p-8">
        {children}
      </div>

    </div>
  );
};

export default Layout;