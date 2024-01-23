import { Router } from "express";
import controllers from "../controllers/Note.js";


const router = Router();


router.get("/notes",controllers.getAllNotes)
router.post("/notes",controllers.createNote)
router.get("/notes/:id",controllers.getNoteById)
router.put("/notes/:id",controllers.updateNoteById)
router.delete("/notes/:id",controllers.deleteNoteById)



export default router
