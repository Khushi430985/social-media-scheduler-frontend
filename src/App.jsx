import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import Campaigns from "./pages/Campaigns";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/posts" element={<Layout><Posts /></Layout>} />
        <Route path="/campaigns" element={<Layout><Campaigns /></Layout>} />
        <Route path="/tasks" element={<Layout><Tasks /></Layout>} />
        <Route path="/analytics" element={<Layout><Analytics /></Layout>} />

      </Routes>
    </Router>
  );
}

export default App;