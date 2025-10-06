import React, { useState, useEffect } from "react";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState({ name: "", artist_id: "", release_year: "", listens: "" });
  const [editAlbum, setEditAlbum] = useState(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  // Fetch albums from backend
  const fetchAlbums = () => {
    fetch("http://localhost:5000/api/albums")
      .then((response) => response.json())
      .then((data) => setAlbums(data))
      .catch((error) => console.error("Error fetching albums:", error));
  };

  // Handle input changes
  const handleChange = (e) => {
    setNewAlbum({ ...newAlbum, [e.target.name]: e.target.value });
  };

  // Add new album
  const addAlbum = () => {
    fetch("http://localhost:5000/api/albums", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAlbum),
    })
      .then(() => {
        fetchAlbums();
        setNewAlbum({ name: "", artist_id: "", release_year: "", listens: "" }); // Reset form
      })
      .catch((error) => console.error("Error adding album:", error));
  };

  // Delete an album
  const deleteAlbum = (id) => {
    fetch(`http://localhost:5000/api/albums/${id}`, { method: "DELETE" })
      .then(() => fetchAlbums())
      .catch((error) => console.error("Error deleting album:", error));
  };

  // Set album for editing
  const startEdit = (album) => {
    setEditAlbum(album);
  };

  // Handle editing input changes
  const handleEditChange = (e) => {
    setEditAlbum({ ...editAlbum, [e.target.name]: e.target.value });
  };

  // Update album
  const updateAlbum = () => {
    fetch(`http://localhost:5000/api/albums/${editAlbum.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editAlbum),
    })
      .then(() => {
        fetchAlbums();
        setEditAlbum(null); // Reset edit mode
      })
      .catch((error) => console.error("Error updating album:", error));
  };

  return (
    <div>
      <h2>Albums</h2>

      {/* Form to Add a New Album */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Album Name"
          value={newAlbum.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="artist_id"
          placeholder="Artist ID"
          value={newAlbum.artist_id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="release_year"
          placeholder="Release Year"
          value={newAlbum.release_year}
          onChange={handleChange}
        />
        <input
          type="text"
          name="listens"
          placeholder="Listens"
          value={newAlbum.listens}
          onChange={handleChange}
        />
        <button onClick={addAlbum}>Add Album</button>
      </div>

      {/* Editing Album Form */}
      {editAlbum && (
        <div>
          <h3>Edit Album</h3>
          <input
            type="text"
            name="name"
            value={editAlbum.name}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="artist_id"
            value={editAlbum.artist_id}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="release_year"
            value={editAlbum.release_year}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="listens"
            value={editAlbum.listens}
            onChange={handleEditChange}
          />
          <button onClick={updateAlbum}>Save Changes</button>
          <button onClick={() => setEditAlbum(null)}>Cancel</button>
        </div>
      )}

      {/* Album List with Edit & Delete Buttons */}
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            {album.name} ({album.release_year}) - {album.listens} listens
            <button onClick={() => startEdit(album)}>Edit</button>
            <button onClick={() => deleteAlbum(album.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Albums;
