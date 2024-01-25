import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tagline: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    pinned: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

export default Note;
