import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 p-6">
        <h2 className="text-2xl font-bold text-indigo-400 mb-8">
          SocialScheduler
        </h2>

        <nav className="space-y-4">
          <Link
            to="/dashboard"
            className="block hover:text-indigo-400"
          >
            Dashboard
          </Link>

          <Link
            to="/posts"
            className="block hover:text-indigo-400"
          >
            Posts
          </Link>

          <Link
            to="/campaigns"
            className="block hover:text-indigo-400"
          >
            Campaigns
          </Link>

          <Link
            to="/tasks"
            className="block hover:text-indigo-400"
          >
            Tasks
          </Link>

          <Link
            to="/analytics"
            className="block hover:text-indigo-400"
          >
            Analytics
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        {children}
      </div>

    </div>
  );
};

export default Layout;