import { useState, useEffect } from "react";
import axios from "axios";

function Artist() {
  const [name, setName] = useState("");
  const [monthlyListeners, setMonthlyListeners] = useState("");
  const [genre, setGenre] = useState("");
  const [artists, setArtists] = useState([]);

  // Fetch Artists
  useEffect(() => {
    axios.get("http://localhost:5000/artists")
      .then(response => setArtists(response.data))
      .catch(error => console.error("Error fetching artists:", error));
  }, []);

  // Add Artist
  const addArtist = () => {
    if (!name.trim() || !monthlyListeners.trim() || !genre.trim()) {
      alert("All fields are required!");
      return;
    }

    axios.post("http://localhost:5000/artists", { name, monthly_listeners: monthlyListeners, genre })
      .then(response => {
        setArtists([...artists, { id: response.data.artistId, name, genre, monthly_listeners: monthlyListeners }]);
        setName(""); 
        setMonthlyListeners("");
        setGenre("");
      })
      .catch(error => console.error("Error adding artist:", error));
  };

  return (
    <div>
      <h2>Artists</h2>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Monthly Listeners" value={monthlyListeners} onChange={e => setMonthlyListeners(e.target.value)} />
      <input type="text" placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} />
      <button onClick={addArtist}>Add Artist</button>

      <h3>Artist List</h3>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name} - {artist.genre} ({artist.monthly_listeners} listeners)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Artist;
