import mongoose, { mongo } from "mongoose";


const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            reequired: true,
            ref: "User",
        },
        title: {
            type: String,   
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;