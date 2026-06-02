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
import NotFound from "./pages/NotFound";

function App() {

  const [sidebarOpen, setSidebarOpen] =
  useState(window.innerWidth > 768);

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
              ? "200px"
              : "0px",

          marginTop: "100px",

          padding:
            window.innerWidth <= 768
              ? "10px"
              : "20px",

          transition: "all 0.3s ease",
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

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;