import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema({
    title: String,
    artist: String,
    album: String,
    genre: String,
    audioUrl: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ user: String, text: String, date: Date }],
  });

const Music = mongoose.model('Music', musicSchema);
export default Music;