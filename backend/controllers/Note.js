import Note from "../models/Note.js"

const controllers = {
    getAllNotes: async (req, res) => {
        try {
            const notes = await Note.find().sort({ pinned: -1, updatedAt: -1 });
            res.status(200).json(notes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    createNote:async (req, res) => {
        try {
          const newNote = await Note.create(req.body);
          console.log(req.body)
          res.status(200).json(newNote);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
    getNoteById:async (req, res) => {
        try {
          const note = await Note.findById(req.params.id);
          if (!note) {
            return res.status(404).json({ error: 'Note not found' });
          }
          res.status(200).json(note);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
    updateNoteById:async (req, res) => {
        try {
            const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true, overwrite: true });
            if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
          }
          res.status(200).json(updatedNote);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
    deleteNoteById:async (req, res) => {
        try {
          const deletedNote = await Note.findByIdAndDelete(req.params.id);
          if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found' });
          }
          res.status(200).json(deletedNote);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
}

export default controllers