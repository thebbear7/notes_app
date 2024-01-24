import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors"
import notesRouter from './routes/Note.js';

const app = express();
const port = 3000;

dotenv.config();

app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }))
mongoose.connect("mongodb+srv://safwannazir911:Lexuslfa12345@cluster0.roxmicn.mongodb.net/WazironeDB")
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));


// Use CORS middleware to allow requests from a specific origin (port 3000)
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));



app.use('/api', notesRouter);

app.get('/', (req,res) => {
  res.json("Hello")
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});