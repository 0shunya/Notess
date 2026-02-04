import { useState } from "react";
import api from "../services/api";

const NoteItem = ({ note, fetchNotes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const updateHandler = async () => {
    try {
      await api.put(`/api/notes/${note._id}`, {
        title,
        content,
      });

      setIsEditing(false);
      fetchNotes();
    } catch (error) {
      alert("Update failed");
    }
  };

  const deleteHandler = async () => {
    if (!confirm("Delete this note?")) return;

    try {
      await api.delete(`/api/notes/${note._id}`);
      fetchNotes();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <br />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <br />

          <button onClick={updateHandler}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{note.title}</h4>
          <p>{note.content}</p>

          <button onClick={() => setIsEditing(true)}>Edit ✏️</button>
          <button onClick={deleteHandler}>Delete 🗑️</button>
        </>
      )}
    </div>
  );
};

export default NoteItem;
