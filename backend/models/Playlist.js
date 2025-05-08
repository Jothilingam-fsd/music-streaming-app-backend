// backend/models/Playlist.js
import mongoose from 'mongoose';


const playlistSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }],
});

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;