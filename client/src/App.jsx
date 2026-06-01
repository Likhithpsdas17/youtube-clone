import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoPlayer from "./pages/VideoPlayer";
import Channel from "./pages/Channel";
import UploadVideo from "./pages/UploadVideo";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>

      <Header setSidebarOpen={setSidebarOpen} />

      <Sidebar sidebarOpen={sidebarOpen} />

      <div
        style={{
          marginLeft: sidebarOpen ? "220px" : "20px",
          marginTop: "100px",
          padding: "20px",
          transition: "0.3s"
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path="/channel" element={<Channel />} />
          <Route path="/upload" element={<UploadVideo />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;