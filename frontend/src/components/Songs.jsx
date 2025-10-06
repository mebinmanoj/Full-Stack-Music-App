import React, { useState, useEffect } from "react";

function Songs() {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({ name: "", release_year: "", album_id: "" });

  useEffect(() => {
    fetchSongs();
  }, []);

  // Fetch songs from backend
  const fetchSongs = () => {
    fetch("http://localhost:5000/api/songs")
      .then((response) => response.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error("Error fetching songs:", error));
  };

  // Handle input changes
  const handleChange = (e) => {
    setNewSong({ ...newSong, [e.target.name]: e.target.value });
  };

  // Add new song
  const addSong = () => {
    fetch("http://localhost:5000/api/songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSong),
    })
      .then(() => {
        fetchSongs();
        setNewSong({ name: "", release_year: "", album_id: "" }); // Reset form
      })
      .catch((error) => console.error("Error adding song:", error));
  };

  // Delete a song
  const deleteSong = (id) => {
    fetch(`http://localhost:5000/api/songs/${id}`, { method: "DELETE" })
      .then(() => fetchSongs())
      .catch((error) => console.error("Error deleting song:", error));
  };

  return (
    <div>
      <h2>Songs</h2>
      
      {/* Form to Add a New Song */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Song Name"
          value={newSong.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="release_year"
          placeholder="Release Year"
          value={newSong.release_year}
          onChange={handleChange}
        />
        <input
          type="text"
          name="album_id"
          placeholder="Album ID"
          value={newSong.album_id}
          onChange={handleChange}
        />
        <button onClick={addSong}>Add Song</button>
      </div>

      {/* Song List with Delete Button */}
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.name} ({song.release_year})
            <button onClick={() => deleteSong(song.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Songs;
