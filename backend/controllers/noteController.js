import Note from "../models/Notes.js";

//@desc create a note
//@route POST/API/notes
//@acess private

export const createNote = async(req, res) => {

    const{ title, content } = req.body;

    if(!title || !content) {
        return res.status(400).json({ message: "Title and content required" });
    }

    const note = await Note.create({
        user: req.user._id, //from middleware
        title,
        content,
    });

    res.status(201).json(note);
}

export const getNote = async (req, res) => {
    const notes = await Note.find({ user: req.user._id }).sort("-createdAt");
    res.json(notes);
};