import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
}).catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World");
});
