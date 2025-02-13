import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import { protect } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Hier die spezifische Domain für dein Frontend setzen
}));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB-Verbindung
mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
  })
  .catch(err => {
    console.error('Datenbankverbindung fehlgeschlagen:', err);
    process.exit(1); // Falls die Verbindung fehlschlägt, den Server stoppen
  });

// Benutzer-Registrierung
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validierung der Eingabedaten
  if (!username || !password) {
    return res.status(400).json({ message: 'Benutzername und Passwort sind erforderlich' });
  }

  try {
    // Überprüfen, ob der Benutzer bereits existiert
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Benutzername bereits vergeben' });
    }

    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Benutzer registriert' });
  } catch (error) {
    console.error('Fehler bei der Benutzerregistrierung:', error);
    res.status(500).json({ message: 'Fehler bei der Registrierung' });
  }
});

// Benutzer-Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Benutzername und Passwort sind erforderlich' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Ungültige Anmeldedaten' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Fehler beim Login:', error);
    res.status(500).json({ message: 'Fehler beim Login' });
  }
});

// Geschützte Route
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'Geschützte Route, nur zugänglich für authentifizierte Benutzer!' });
});

// Standardroute
app.get('/', (req, res) => {
  res.send('Hello World');
});
