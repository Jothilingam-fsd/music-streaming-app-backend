// File: routes/music.js
// routes/music.js
import { authenticate } from '../middleware/auth.js';
import express from 'express';

import Music from '../models/Music.js'; 
const router = express.Router();

// Get all music
router.get('/', async (req, res) => {
  const music = await Music.find();
  res.json(music);
});

// Search music
router.get('/search', async (req, res) => {
  const { query } = req.query;
  const music = await Music.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { artist: { $regex: query, $options: 'i' } },
      { album: { $regex: query, $options: 'i' } },
    ],
  });
  res.json(music);
});

// Get music by ID
router.post('/:id/like', authenticate, async (req, res) => {
    const music = await Music.findById(req.params.id);
    if (!music.likes.includes(req.user.id)) {
      music.likes.push(req.user.id);
      await music.save();
    }
    res.json(music);
  });
  
  router.post('/:id/comment', authenticate, async (req, res) => {
    const { text } = req.body;
    const music = await Music.findById(req.params.id);
    music.comments.push({ user: req.user.id, text, date: new Date() });
    await music.save();
    res.json(music);
  });

export default router;