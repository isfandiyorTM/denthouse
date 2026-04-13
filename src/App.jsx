import { useState } from "react";
import Navbar  from "./components/Navbar";
import Footer  from "./components/Footer";
import Home    from "./pages/Home";
import Admin   from "./pages/Admin";
import { useVideos } from "./hooks/useVideos";
import { useAdmin  } from "./hooks/useAdmin";
import "./styles/global.css";

export default function App() {
  const [view, setView] = useState("home"); // "home" | "admin"

  const { videos, addVideo, updateVideo, deleteVideo } = useVideos();
  const { loggedIn, error, login, logout }             = useAdmin();

  function handleLogout() {
    logout();
    setView("home");
  }

  return (
    <div>
      <Navbar
        view={view}
        onViewChange={setView}
        adminLoggedIn={loggedIn}
        onLogout={handleLogout}
      />

      {view === "home" ? (
        <Home videos={videos} />
      ) : (
        <Admin
          loggedIn={loggedIn}
          loginError={error}
          onLogin={login}
          onLogout={handleLogout}
          videos={videos}
          onAdd={addVideo}
          onUpdate={updateVideo}
          onDelete={deleteVideo}
        />
      )}

      <Footer adminMode={view === "admin"} />
    </div>
  );
}
