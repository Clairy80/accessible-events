import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Datenbank verbunden');
  } catch (error) {
    console.error('Fehler bei der Datenbankverbindung:', error);
    process.exit(1);
  }
};

export default connectDB;
