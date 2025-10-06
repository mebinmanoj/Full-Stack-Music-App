const db = require("../db");

// Get All Artists
exports.getArtists = (req, res) => {
  db.query("SELECT * FROM Artists", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get Artist by ID
exports.getArtistById = (req, res) => {
  db.query("SELECT * FROM Artists WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};

// Create Artist
exports.createArtist = (req, res) => {
  console.log("Received request body:", req.body); // Debugging
  const { name, monthly_listeners, genre } = req.body;

  if (!name || !monthly_listeners || !genre) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "INSERT INTO Artists (name, monthly_listeners, genre) VALUES (?, ?, ?)",
    [name, monthly_listeners, genre],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      console.log("Artist added:", result.insertId); // Debugging
      res.status(201).json({ message: "Artist added!", artistId: result.insertId });
    }
  );
};

// Update Artist
exports.updateArtist = (req, res) => {
  const { name, monthly_listeners, genre } = req.body;
  db.query("UPDATE Artists SET name = ?, monthly_listeners = ?, genre = ? WHERE id = ?",
    [name, monthly_listeners, genre, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Artist updated!" });
    }
  );
};

// Delete Artist
exports.deleteArtist = (req, res) => {
  db.query("DELETE FROM Artists WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Artist deleted!" });
  });
};
