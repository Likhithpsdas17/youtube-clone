import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Channel.css";

function Channel() {

  const [videos, setVideos] = useState([]);
  const [channel, setChannel] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchChannel();
  }, []);

  const fetchChannel = async () => {
    try {

      const token =
        localStorage.getItem("token");

      const response =
        await API.get(
          "/channels/my-channel",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setChannel(response.data);

      const videoResponse =
        await API.get(
          `/videos/channel/${response.data._id}`
        );

      setVideos(videoResponse.data);

    } catch (error) {
      console.log(error);
    }
  };

  const deleteVideo = async (id) => {
    try {

      const token =
        localStorage.getItem("token");

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this video?"
        );

      if (!confirmDelete) return;

      await API.delete(
        `/videos/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchChannel();

    } catch (error) {
      console.log(error);
    }
  };

  if (!channel) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="channel-page">

      <img
        src={channel.banner}
        alt="banner"
        className="channel-banner"
      />

      <div className="channel-details">

        <h1>
          {channel.channelName}
        </h1>

        <p>
          {channel.description}
        </p>

        <p>
          Subscribers:
          {" "}
          {channel.subscribers || 0}
        </p>

        <p>
          Videos:
          {" "}
          {videos.length}
        </p>

      </div>

      <h2>My Videos</h2>

      {videos.length === 0 ? (
        <h3>No Videos Uploaded Yet</h3>
      ) : (
        <div className="channel-videos">

          {videos.map((video) => (
            <div
              key={video._id}
              className="channel-video-card"
            >

              <img
                src={video.thumbnailUrl}
                alt={video.title}
                onClick={() =>
                  navigate(`/video/${video._id}`)
                }
              />

              <h4>{video.title}</h4>

              <div className="video-actions">

                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(`/edit-video/${video._id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteVideo(video._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Channel;