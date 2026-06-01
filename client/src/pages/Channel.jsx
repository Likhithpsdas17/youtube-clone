import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
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

      <h1>
        {channel.channelName}
      </h1>

      <p>
        {channel.description}
      </p>

      <p>
        Subscribers: {channel.subscribers || 0}
      </p>
      <p>
        Videos: {videos.length}
      </p>
      <h2>My Videos</h2>

      {videos.length === 0 ? (
        <h3>No Videos Uploaded Yet</h3>
      ) : (
        <div className="channel-videos">

          {videos.map((video) => (
            <div
              key={video._id}
              className="channel-video-card"
              onClick={() =>
                navigate(`/video/${video._id}`)
              }
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
              />

              <h4>{video.title}</h4>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Channel;