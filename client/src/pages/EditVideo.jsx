import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "./UploadVideo.css";

function EditVideo() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    category: "",
  });

  useEffect(() => {
    fetchVideo();
  }, []);

  const fetchVideo = async () => {
    try {

      const response =
        await API.get(`/videos/${id}`);

      setFormData({
        title: response.data.title,
        description: response.data.description,
        videoUrl: response.data.videoUrl,
        thumbnailUrl: response.data.thumbnailUrl,
        category: response.data.category,
      });

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await API.put(
        `/videos/${id}`,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert("Video Updated");

      navigate("/channel");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="upload-page">

      <h2>Edit Video</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
        />

        <input
          type="text"
          name="thumbnailUrl"
          value={formData.thumbnailUrl}
          onChange={handleChange}
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
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
          Update Video
        </button>

      </form>

    </div>
  );
}

export default EditVideo;