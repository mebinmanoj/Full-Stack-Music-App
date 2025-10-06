const db = require("../db");

// Get all albums
exports.getAlbums = (req, res) => {
  db.query("SELECT * FROM Albums", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Create a new album
exports.createAlbum = (req, res) => {
  const { name, artist_id, release_year, listens } = req.body;

  db.query(
    "INSERT INTO Albums (name, artist_id, release_year, listens) VALUES (?, ?, ?, ?)",
    [name, artist_id, release_year, listens],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Album added!", albumId: result.insertId });
    }
  );
};

// Update an album
exports.updateAlbum = (req, res) => {
  const { id } = req.params;
  const { name, artist_id, release_year, listens } = req.body;

  db.query(
    "UPDATE Albums SET name = ?, artist_id = ?, release_year = ?, listens = ? WHERE id = ?",
    [name, artist_id, release_year, listens, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Album updated successfully!" });
    }
  );
};

// Delete an album
exports.deleteAlbum = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM Albums WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Album deleted successfully!" });
  });
};
