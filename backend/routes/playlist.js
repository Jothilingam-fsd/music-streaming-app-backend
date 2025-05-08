// backend/routes/playlists.js
import express from 'express';
import Playlist from '../models/Playlist.js'; 

import authenticate from '../middleware/auth.js'; 

const router = express.Router();

// Create playlist
router.post('/', authenticate, async (req, res) => {
  const { name, songs } = req.body;
  const playlist = new Playlist({ name, user: req.user.id, songs });
  await playlist.save();
  res.status(201).json(playlist);
});

// Get user playlists
router.get('/', authenticate, async (req, res) => {
  const playlists = await Playlist.find({ user: req.user.id }).populate('songs');
  res.json(playlists);
});

// Add more routes for updating/deleting playlists
export default router;