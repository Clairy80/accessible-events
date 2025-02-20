import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Route zum Registrieren eines neuen Benutzers
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        // Überprüfen, ob der Benutzername bereits existiert
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'Benutzername bereits vergeben' });

        // Passwort hashen
        const hashedPassword = await bcrypt.hash(password, 10);

        // Neuen Benutzer erstellen
        const user = new User({ username, password: hashedPassword, role: role || 'user' });
        
        // Benutzer speichern
        await user.save();

        // JWT Token generieren
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'Benutzer erfolgreich erstellt', token });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Erstellen des Users', error });
    }
});

// Route zum Login eines Benutzers
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Benutzer finden
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Benutzer nicht gefunden' });

        // Passwort vergleichen
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Falsches Passwort' });

        // JWT Token generieren
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Erfolgreich eingeloggt', token });
    } catch (error) {
        res.status(500).json({ message: 'Fehler bei der Authentifizierung', error });
    }
});

export default router;
