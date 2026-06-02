import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoPlayer from "./pages/VideoPlayer";
import Channel from "./pages/Channel";
import UploadVideo from "./pages/UploadVideo";
import EditVideo from "./pages/EditVideo";
import Footer from "./components/Footer";

function App() {

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  return (
    <BrowserRouter>

      <Header
        setSidebarOpen={
          setSidebarOpen
        }
      />

      <Sidebar
        sidebarOpen={
          sidebarOpen
        }
      />

      <div
        style={{
          marginLeft:
            sidebarOpen
              ? "220px"
              : "20px",
          marginTop: "100px",
          padding: "20px",
          transition: "0.3s",
        }}
      >

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/video/:id"
            element={
              <VideoPlayer />
            }
          />

          <Route
            path="/channel"
            element={
              <ProtectedRoute>
                <Channel />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadVideo />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-video/:id"
            element={
              <ProtectedRoute>
                <EditVideo />
              </ProtectedRoute>
            }
          />

        </Routes>

        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;