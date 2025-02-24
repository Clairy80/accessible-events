import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import Event from './models/Event.js';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Datenbankverbindung erfolgreich');
    app.listen(port, () => {
      console.log(`Server läuft auf Port ${port}`);
    });
  })
  .catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

// Event-Suche API-Route
app.get('/api/events', async (req, res) => {
  try {
    const searchQuery = req.query.search;
    const events = searchQuery
      ? await Event.find({ name: { $regex: searchQuery, $options: 'i' } })
      : await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Events', error });
  }
});
