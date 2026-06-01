import "./Sidebar.css";

function Sidebar({ sidebarOpen }) {

  return (
    <div
      className={`sidebar ${
        sidebarOpen ? "open" : "closed"
      }`}
    >

      <div>🏠 Home</div>

      <div>🎬 Shorts</div>

      <div>📺 Subscriptions</div>

      <div>🕘 History</div>

    </div>
  );
}

export default Sidebar;