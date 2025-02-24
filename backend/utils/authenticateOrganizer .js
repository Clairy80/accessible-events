import express from 'express';
import Event from '../models/Event.js';
import { authenticateOrganizer } from '../utils/authMiddleware.js';  // Importiere die Middleware

const router = express.Router();

// Route zum Erstellen eines neuen Events
router.post('/create-event', authenticateOrganizer, async (req, res) => {
  const {
    title,
    description,
    date,
    location,
    lat,
    lon,
    accessibilityOptions,
    publicTransportProximity,
    wcAccessible,
    elevatorAccessible,
    languageOptions,
    ratings,
  } = req.body;

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      lat,
      lon,
      accessibilityOptions,
      publicTransportProximity,
      wcAccessible,
      elevatorAccessible,
      languageOptions,
      ratings,
      organizer: req.organizerId,  // Das Event dem authentifizierten Organisator zuweisen
    });

    await newEvent.save();
    res.status(201).json({ msg: 'Event erfolgreich erstellt' });
  } catch (error) {
    res.status(500).json({ msg: 'Fehler beim Erstellen des Events', error });
  }
});

export default router;
