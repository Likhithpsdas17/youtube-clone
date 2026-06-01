import "./Header.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Header({ setSidebarOpen }) {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      if (!token) return;

      const response = await API.get(
        "/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    navigate(`/?search=${search}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");

    window.location.reload();
  };

  return (
    <header className="header">

      <div className="header-left">
        <span
          className="menu-icon"
          onClick={() =>
            setSidebarOpen(prev => !prev)
          }
        >
          ☰
        </span>

        <img
          className="youtube-logo"
          src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
          alt="youtube"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="header-center">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button onClick={handleSearch}>
          🔍
        </button>
      </div>

      <div className="header-right">

        {user && (
          <span>
            👤 {user.username}
          </span>
        )}

        {token && (
          <button
            onClick={() =>
              navigate("/channel")
            }
          >
            My Channel
          </button>
        )}

        {token && (
          <button
            onClick={() =>
              navigate("/upload")
            }
          >
            Upload
          </button>
        )}

        {token ? (
          <button
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() =>
              navigate("/login")
            }
          >
            Sign In
          </button>
        )}

      </div>
    </header>
  );
}

export default Header;