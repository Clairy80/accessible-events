// src/server.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js'; // Import der Event-Routen

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI)  // Use the environment variable for MONGO_URI
  .then(() => {
    console.log('Datenbankverbindung erfolgreich');
    app.listen(port, () => {
      console.log(`Server läuft auf Port ${port}`);
    });
  })
  .catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);  // Neue Event-Route hinzufügen
