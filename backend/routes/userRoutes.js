import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'Benutzername bereits vergeben' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role: role || 'user' });
        
        await user.save();
        res.status(201).json({ message: 'Benutzer erfolgreich erstellt' });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Erstellen des Users', error });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Benutzer nicht gefunden' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Falsches Passwort' });

        res.status(200).json({ message: 'Erfolgreich eingeloggt' });
    } catch (error) {
        res.status(500).json({ message: 'Fehler bei der Authentifizierung' });
    }
});

export default router;
