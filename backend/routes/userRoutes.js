import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const app = express();
app.use(express.json()); // JSON parsing middleware

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Verbindungsaufbau zur MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Datenbankverbindung erfolgreich');
    app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
  })
  .catch(err => console.log(err));

// Beispiel einer POST-Route für die Registrierung eines neuen Users
app.post('/api/register', async (req, res) => {
  const { username, password, role } = req.body;

  // Überprüfen, ob Benutzername bereits existiert
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Benutzername bereits vergeben' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword,
    role: role || 'user', // Falls keine Rolle angegeben, wird 'user' als Standard festgelegt
  });

  try {
    await user.save(); // Speichern des Users in der DB
    res.status(201).json({ message: 'Benutzer erfolgreich erstellt' });
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Erstellen des Users', error });
  }
});

// Beispiel einer POST-Route für die Login-Authentifizierung
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Benutzer nicht gefunden' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Falsches Passwort' });
    }

    res.status(200).json({ message: 'Erfolgreich eingeloggt' });
  } catch (error) {
    res.status(500).json({ message: 'Fehler bei der Authentifizierung' });
  }
});
