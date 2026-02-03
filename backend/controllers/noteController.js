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

// @desc Update a note
// @route PUT /api/notes/:id
// @access Private

export const updateNote = async (req, res) => {

    const { title, content } = req.body;

    const note = await Note.findById(req.params.id);

    //ownership check
    if(note.user.toString() !==  req.user._id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    const updateNote = await note.save();
    res.json(updateNote);
}


// @desc Delete a note
// @route DELETE /api/notes/:id
// @access Private

export const deleteNote = async (req, res) => {
    const note = await Note.findById(req.params.id);

    if(!note) {
        return res.status(404).json({ message: "Note not found"});
    }

    //Ownership check
    if(note.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not authorized" })
    }

    await  note.deleteOne();
    res.json({message: "Not Deleted"});
}