import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
    title: String,
    tagline: String,
    body: String,
    pinned: Boolean,
},{timestamps:true});

const Note = mongoose.model('Note', noteSchema);

export default Note