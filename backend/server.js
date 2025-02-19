import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

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

