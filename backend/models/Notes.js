import mongoose, { mongo } from "mongoose";


const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            reequired: true,
            ref: "User",
        },
        title: {
            type: string,
            required: true,
        },
        content: {
            type: string,
            required: true,
        },
    },
    { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;