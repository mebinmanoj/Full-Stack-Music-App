const db = require("../.env/db");

exports.getSongs = (req, res) => {
  db.query("SELECT * FROM Songs", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.createSong = (req, res) => {
  const { name, release_year, album_id } = req.body;
  db.query("INSERT INTO Songs (name, release_year, album_id) VALUES (?, ?, ?)",
    [name, release_year, album_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Song added!", songId: result.insertId });
    }
  );
};

exports.updateSong = (req, res) => {
  const { id } = req.params;
  const { name, release_year, album_id } = req.body;

  db.query("UPDATE Songs SET name = ?, release_year = ?, album_id = ? WHERE id = ?",
    [name, release_year, album_id, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Song updated successfully!" });
    }
  );
};


exports.deleteSong = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM Songs WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Song deleted successfully!" });
  });
};

