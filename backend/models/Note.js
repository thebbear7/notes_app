import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: String,
    tagline: String,
    body: String,
    pinned: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

export default Note;
