import { useEffect, useState } from "react";
import api from "../services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#6366f1");

  const fetchCampaigns = async () => {
    const res = await api.get("/api/campaigns");
    setCampaigns(res.data);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreate = async () => {
    if (!name) return;

    await api.post("/api/campaigns", {
      user_id: "11111111-1111-1111-1111-111111111111",
      name,
      color,
    });

    setName("");
    fetchCampaigns();
  };

  const handleDelete = async (id) => {
  await api.delete(`/api/campaigns/${id}`);
  fetchCampaigns();
};
  

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Campaigns</h2>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Campaign name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-12 h-10 rounded-md border border-slate-700 bg-slate-900"
        />

        <Button onClick={handleCreate}>Create</Button>
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="bg-slate-900 text-white">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{campaign.name}</p>
              </div>

              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: campaign.color }}
              />

              <Button
                variant="destructive"
                onClick={() => handleDelete(campaign.id)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;