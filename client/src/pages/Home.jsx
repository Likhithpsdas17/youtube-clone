import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import API from "../services/api";
import VideoCard from "../components/VideoCard";
import Filters from "../components/Filters";
import "./Home.css";

function Home() {
  const [videos, setVideos] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchVideos();
  }, [search, selectedCategory]);

  const fetchVideos = async () => {
    try {
      const response = await API.get(
        `/videos?search=${search || ""}&category=${selectedCategory}`
      );

      setVideos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <>
    <Filters
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />

    {videos.length === 0 ? (
      <h2>No Videos Found</h2>
    ) : (
      <div className="home">
        {videos.map((video) => (
          <VideoCard
            key={video._id}
            video={video}
          />
        ))}
      </div>
    )}
  </>
  );
}

export default Home;