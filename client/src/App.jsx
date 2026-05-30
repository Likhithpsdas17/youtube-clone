import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import VideoPlayer from "./pages/VideoPlayer/VideoPlayer";
import Channel from "./pages/Channel/Channel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/video/:id"
          element={<VideoPlayer />}
        />

        <Route
          path="/channel"
          element={<Channel />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;