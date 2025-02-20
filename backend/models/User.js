import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // Pfad zur User-Modell-Datei
import jwt from 'jsonwebtoken';

const router = express.Router();

// Route zum Registrieren eines neuen Benutzers
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Überprüfen, ob der Benutzer bereits existiert
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Benutzername bereits vergeben' });
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    // Neuen Benutzer erstellen
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    // JWT Token generieren
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Benutzer erfolgreich registriert', token });
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Registrieren des Benutzers', error });
  }
});

export default router;
