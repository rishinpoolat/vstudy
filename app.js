import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Notes from "./models/notesModel.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

//create
app.post('/notes', async(req, res) => {
  try {
    const note = await Notes.create(req.body);
    res.status(200).json(note);
  }
   catch (error) {
    console.log(error.message);
    res.status(500).json(error);  
  }
});

//get all
app.get('/notes', async(req, res) => {
  try {
    const notes = await Notes.find({});
    res.status(200).json(notes);
  }
  catch (error) {
    console.log(error.message);
    res.status(500).json(error);  
  }
});

//get one
app.get('/notes/:id', async(req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    res.status(200).json(note);
  }
  catch (error) {
    console.log(error.message);
    res.status(500).json(error);  
  }
});

//update
app.put('/notes/:id', async(req, res) => {
  try {
    const note = await Notes.findByIdAndUpdate(req.params.id, req.body);
    if(!note){
      return res.status(404).json(error);
    }
    const updatedNote = await Notes.findById(req.params.id)
    res.status(200).json(updatedNote);
  }
  catch (error) {
    console.log(error.message);
    res.status(500).json(error);  
  }
});

//delete
app.delete('/notes/:id', async(req, res) => {
  try {
    const note = await Notes.findByIdAndDelete(req.params.id, req.body);
    if(!note){
      return res.status(404).json(error);
    }
    res.status(200).json(note);
  }
  catch (error) {
    console.log(error.message);
    res.status(500).json(error);  
  }
});


mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => 
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
