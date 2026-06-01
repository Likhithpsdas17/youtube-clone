import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "./VideoPlayer.css";

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState("");
  useEffect(() => {
    fetchVideo();
    fetchComments();
  }, []);

  const fetchVideo = async () => {
    try {

      await API.put(
        `/videos/${id}/view`
      );

      const response =
        await API.get(
          `/videos/${id}`
        );

      setVideo(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
  try {
    const response = await API.get(
      `/comments/${id}`
    );

    setComments(response.data);
  } catch (error) {
    console.log(error);
  }
  };

  if (!text.trim()) {
    alert("Comment cannot be empty");
    return;
  }

  const addComment = async () => {

    if (!text.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    try {

      const token =
        localStorage.getItem("token");

      await API.post(
        "/comments",
        {
          text,
          videoId: id,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setText("");

      fetchComments();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (commentId) => {
  try {

    const token =
      localStorage.getItem("token");

    const confirmDelete =
      window.confirm(
        "Delete this comment?"
      );

    if (!confirmDelete) return;

    await API.delete(
      `/comments/${commentId}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    fetchComments();

  } catch (error) {
    console.log(error);
  }
};

    const updateComment = async (commentId) => {
    try {

      const token =
        localStorage.getItem("token");

      await API.put(
        `/comments/${commentId}`,
        {
          text: editText,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setEditingComment(null);
      setEditText("");

      fetchComments();

    } catch (error) {
      console.log(error);
    }
  };
  const handleLike = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const response =
      await API.put(
        `/videos/${id}/like`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    setVideo(response.data);
  } catch (error) {
    console.log(error);
  }
  };

  const handleDislike = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const response =
      await API.put(
        `/videos/${id}/dislike`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    setVideo(response.data);
  } catch (error) {
    console.log(error);
  }
  };


  if (!video) {
    return <h2>Loading...</h2>;
  }
  let videoId = "";

  if (video.videoUrl.includes("v=")) {
    videoId = video.videoUrl.split("v=")[1].split("&")[0];
  }
  return (
    <div className="video-player">

      <iframe
        className="video-thumbnail"
        src={`https://www.youtube.com/embed/${
          video.videoUrl.split("v=")[1]
        }`}
        title={video.title}
        allowFullScreen
      ></iframe>

      <div className="video-details">

        <h2>{video.title}</h2>

        <p>{video.description}</p>

        <div className="video-actions">

          <button onClick={handleLike}>
            👍 {video.likes}
          </button>

          <button onClick={handleDislike}>
            👎 {video.dislikes}
          </button>

        </div>

      </div>

      <div className="channel-info">

        <h3>
          {video.channel?.channelName}
        </h3>

        <p>
          {video.channel?.description}
        </p>

      </div>

      <div className="comments-section">

        <h2>Comments</h2>

        <div className="comment-form">

          <input
            type="text"
            placeholder="Add a comment"
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
          />

          <button onClick={addComment}>
            Add Comment
          </button>

        </div>

        {comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="comment-card"
            >

              <h4>
                {comment.user?.username}
              </h4>

              {editingComment === comment._id ? (
                <>

                  <input
                    type="text"
                    value={editText}
                    onChange={(e) =>
                      setEditText(
                        e.target.value
                      )
                    }
                  />

                  <button
                    onClick={() =>
                      updateComment(
                        comment._id
                      )
                    }
                  >
                    Save
                  </button>

                  <button
                    onClick={() =>
                      setEditingComment(
                        null
                      )
                    }
                  >
                    Cancel
                  </button>

                </>
              ) : (
                <>
                  <p>{comment.text}</p>

                  <button
                    onClick={() => {
                      setEditingComment(
                        comment._id
                      );

                      setEditText(
                        comment.text
                      );
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-comment-btn"
                    onClick={() =>
                      deleteComment(
                        comment._id
                      )
                    }
                  >
                    Delete
                  </button>
                </>
              )}

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default VideoPlayer;