const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artistController");

router.get("/", artistController.getArtists);       // Get all artists
router.post("/", artistController.createArtist);    // Create an artist
router.put("/:id", artistController.updateArtist);  // Update an artist
router.delete("/:id", artistController.deleteArtist); // Delete an artist

module.exports = router;