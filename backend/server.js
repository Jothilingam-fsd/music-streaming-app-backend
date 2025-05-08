import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';


import authRoutes from './routes/auth.js'; 
import musicRoutes from './routes/music.js'; 
import playlistRoutes from './routes/playlist.js'; 

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace with MongoDB Atlas URI for production)
mongoose.connect('mongodb://localhost:27017/musicapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use('/auth', authRoutes);

app.use('/music', musicRoutes);

app.use('/playlists', playlistRoutes);

// Serve static files for audio streaming
app.use('/audio', express.static('public/audio'));

// Define routes
app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));