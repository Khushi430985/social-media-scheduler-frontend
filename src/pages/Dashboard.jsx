import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/api/dashboard");
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {[1,2,3].map((i) => (
        <div
          key={i}
          className="bg-slate-900 p-6 rounded-lg animate-pulse"
        >
          <div className="h-4 bg-slate-700 mb-4 rounded"></div>
          <div className="h-8 bg-slate-700 rounded"></div>
        </div>
      ))}
    </div>
  );
}

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
          <div className="bg-slate-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-indigo-500">
          <p className="text-slate-400">Total Posts</p>
          <h2 className="text-2xl font-bold">{data.totalPosts}</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-indigo-500">
          <p className="text-slate-400">Total Campaigns</p>
          <h2 className="text-2xl font-bold">{data.totalCampaigns}</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-indigo-500">
          <p className="text-slate-400">Total Likes</p>
          <h2 className="text-2xl font-bold">{data.totalLikes}</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;