import { useEffect, useState } from "react";
import api from "../services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [deadline, setDeadline] = useState("");

  const fetchTasks = async () => {
    const res = await api.get("/api/tasks");
    setTasks(res.data);
  };

  const fetchPosts = async () => {
    const res = await api.get("/api/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchPosts();
  }, []);

  const handleCreate = async () => {
    if (!postId || !assignedTo || !deadline) return;

    await api.post("/api/tasks", {
      post_id: postId,
      assigned_to: assignedTo,
      deadline,
    });

    setAssignedTo("");
    setDeadline("");
    setPostId("");
    fetchTasks();
  };

  const handleUpdateStatus = async (id, status) => {
    await api.put(`/api/tasks/${id}`, { status });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  // 🔥 Clean Date Formatter (DD-MM-YYYY)
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${day}-${month}-${year}, ${hours}:${minutes} ${ampm}`;
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Tasks</h2>

      {/* Create Task Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="bg-slate-900 text-white px-4 py-2 rounded-md"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
        >
          <option value="">Select Post</option>
          {posts.map((post) => (
            <option key={post.id} value={post.id}>
              {post.content.substring(0, 20)} - {post.platform}
            </option>
          ))}
        </select>

        <Input
          placeholder="Assign to"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />

        <input
          type="datetime-local"
          className="bg-slate-900 text-white px-4 py-2 rounded-md"
          min={new Date().toISOString().slice(0, 16)}
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <Button onClick={handleCreate}>Create Task</Button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => {
          const relatedPost = posts.find(
            (post) => post.id === task.post_id
          );

          return (
            <Card key={task.id} className="bg-slate-900 text-white">
              <CardContent className="p-6">
                <p>
                  <strong>Post:</strong>{" "}
                  {relatedPost
                    ? `${relatedPost.content.substring(0, 30)} - ${relatedPost.platform}`
                    : "Post not found"}
                </p>

                <p>
                  <strong>Assigned To:</strong> {task.assigned_to}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      task.status === "completed"
                        ? "text-green-400 font-semibold"
                        : "text-yellow-400"
                    }
                  >
                    {task.status}
                  </span>
                </p>

                <p>
                  <strong>Deadline:</strong>{" "}
                  {formatDate(task.deadline)}
                </p>

                <div className="flex gap-4 mt-4">
                  <Button
                    onClick={() =>
                      handleUpdateStatus(
                        task.id,
                        task.status === "completed"
                          ? "pending"
                          : "completed"
                      )
                    }
                  >
                    {task.status === "completed"
                      ? "Mark Pending"
                      : "Mark Completed"}
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;