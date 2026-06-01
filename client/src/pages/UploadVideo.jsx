import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./UploadVideo.css";

function UploadVideo() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await API.post(
        "/videos",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert("Video Uploaded");

      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="upload-page">
      <h2>Upload Video</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <input
          type="text"
          name="videoUrl"
          placeholder="Video URL"
          onChange={handleChange}
        />

        <input
          type="text"
          name="thumbnailUrl"
          placeholder="Thumbnail URL"
          onChange={handleChange}
        />

        <select
          name="category"
          onChange={handleChange}
        >
          <option value="">
            Select Category
          </option>

          <option value="React">
            React
          </option>

          <option value="Travel">
            Travel
          </option>

          <option value="Movies">
            Movies
          </option>

          <option value="Trading">
            Trading
          </option>

          <option value="Bikes">
            Bikes
          </option>

          <option value="Communication">
            Communication
          </option>
        </select>

        <button type="submit">
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadVideo;