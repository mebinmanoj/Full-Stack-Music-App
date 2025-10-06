import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Artist from "./components/Artist.jsx";
import Songs from "./components/Songs.jsx";
import Albums from "./components/Albums.jsx";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/artists">Artists</Link></li>
          <li><Link to="/songs">Songs</Link></li>
          <li><Link to="/albums">Albums</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome to the Music App</h1>} />
        <Route path="/artists" element={<Artist />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/albums" element={<Albums />} />
      </Routes>
    </Router>
  );
}

export default App;

