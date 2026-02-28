import { useEffect, useState } from "react";
import api from "../services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [campaignId, setCampaignId] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const fetchPosts = async () => {
    const res = await api.get("/api/posts");
    setPosts(res.data);
  };

  const fetchCampaigns = async () => {
    const res = await api.get("/api/campaigns");
    setCampaigns(res.data);
  };

  useEffect(() => {
    fetchPosts();
    fetchCampaigns();
  }, []);

  const handleCreate = async () => {
    if (!content) return;

    await api.post("/api/posts", {
      user_id: "11111111-1111-1111-1111-111111111111",
      campaign_id: campaignId || null,
      platform,
      content,
      scheduled_time: scheduledTime || new Date().toISOString(),
      status: "scheduled",
    });

    setContent("");
    setScheduledTime("");
    setCampaignId("");
    fetchPosts();
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/posts/${id}`);
    fetchPosts();
  };

  const handleReshare = async (id) => {
    await api.post(`/api/reshare/${id}`);
    fetchPosts();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Posts</h2>

      {/* Create Post Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Input
          placeholder="Enter post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select
          className="bg-slate-900 text-white px-4 py-2 rounded-md"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option>Instagram</option>
          <option>Facebook</option>
          <option>Twitter</option>
          <option>LinkedIn</option>
          <option>Pinterest</option>
        </select>

        <select
          className="bg-slate-900 text-white px-4 py-2 rounded-md"
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
        >
          <option value="">No Campaign</option>
          {campaigns.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          className="bg-slate-900 text-white px-4 py-2 rounded-md"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
        />

        <Button onClick={handleCreate}>Create</Button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.length === 0 && (
          <p className="text-slate-400">No posts created yet.</p>
        )}

        {posts.map((post) => (
          <Card
            key={post.id}
            className="bg-slate-900 text-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
          >
            <CardContent className="p-6">
              <p className="mb-2 font-medium">{post.content}</p>

              <p className="text-sm text-slate-400">
                Platform: {post.platform}
              </p>

              <p className="text-sm text-slate-400">
                Campaign:{" "}
                {campaigns.find((c) => c.id === post.campaign_id)?.name ||
                  "None"}
              </p>

              <p className="text-sm text-slate-400">
                Scheduled:{" "}
                {post.scheduled_time
                  ? new Date(post.scheduled_time).toLocaleString()
                  : "Not Set"}
              </p>

              <p className="mt-2">
                <span
                  className={
                    post.status === "published"
                      ? "text-green-400 font-semibold"
                      : "text-yellow-400 font-semibold"
                  }
                >
                  {post.status === "published"
                    ? "Published Successfully"
                    : "Scheduled"}
                </span>
              </p>

              <div className="flex gap-4 mt-4">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>

                <Button onClick={() => handleReshare(post.id)}>
                  Reshare
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Posts;