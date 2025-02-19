import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

router.post('/add', async (req, res) => {
  const { title, description, date, location } = req.body;

  try {
    const event = new Event({ title, description, date, location });
    await event.save();
    res.status(201).json({ message: 'Event erstellt', event });
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Erstellen des Events', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Events', error });
  }
});

export default router;