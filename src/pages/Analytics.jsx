import { useEffect, useState } from "react";
import api from "../services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [posts, setPosts] = useState([]);
  const [platformData, setPlatformData] = useState({});
  const [editedData, setEditedData] = useState({});

  // Fetch all data
  const fetchAnalytics = async () => {
    const res = await api.get("/api/analytics");
    setAnalytics(res.data);
  };

  const fetchPosts = async () => {
    const res = await api.get("/api/posts");
    setPosts(res.data);
  };

  const fetchPlatformInsights = async () => {
    const res = await api.get("/api/analytics/platform-insights");
    setPlatformData(res.data);
  };

  useEffect(() => {
    fetchAnalytics();
    fetchPosts();
    fetchPlatformInsights();
  }, []);

  // Handle input change
  const handleChange = (id, field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: parseInt(value) || 0,
      },
    }));
  };

  // Update engagement
  const handleUpdate = async (id) => {
    const data = editedData[id];
    if (!data) return;

    await api.put(`/api/analytics/${id}`, {
      likes: data.likes,
      comments: data.comments,
      shares: data.shares,
    });

    fetchAnalytics();
    fetchPlatformInsights();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Analytics</h2>

      {/* Engagement Cards */}
      <div className="space-y-6">
        {analytics.map((item) => {
          const relatedPost = posts.find(
            (post) => post.id === item.post_id
          );

          return (
            <Card key={item.id} className="bg-slate-900 text-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300"> 
              <CardContent className="p-6">

                <p className="mb-4">
                  <strong>Post:</strong>{" "}
                  {relatedPost
                    ? `${relatedPost.content.substring(0, 40)} - ${relatedPost.platform}`
                    : "Post not found"}
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label>Likes</label>
                    <Input
                      type="number"
                      defaultValue={item.likes}
                      onChange={(e) =>
                        handleChange(item.id, "likes", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label>Comments</label>
                    <Input
                      type="number"
                      defaultValue={item.comments}
                      onChange={(e) =>
                        handleChange(item.id, "comments", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label>Shares</label>
                    <Input
                      type="number"
                      defaultValue={item.shares}
                      onChange={(e) =>
                        handleChange(item.id, "shares", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Button onClick={() => handleUpdate(item.id)}>
                    Update Engagement
                  </Button>
                </div>

              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Platform Insights Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Platform Insights</h2>

        <div className="grid grid-cols-3 gap-6">
          {Object.keys(platformData).length === 0 ? (
            <p className="text-slate-400">No platform data available</p>
          ) : (
            Object.keys(platformData).map((platform) => (
              <Card key={platform} className="bg-slate-900 text-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-indigo-500">
                <CardContent className="p-6">
                  <p className="text-slate-400">{platform}</p>
                  <h2 className="text-2xl font-bold">
                    {platformData[platform]} Likes
                  </h2>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default Analytics;