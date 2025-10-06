const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");

router.get("/", songController.getSongs);       // Get all songs
router.post("/", songController.createSong);    // Create a song
router.put("/:id", songController.updateSong);  // Update a song
router.delete("/:id", songController.deleteSong); // Delete a song

module.exports = router;
