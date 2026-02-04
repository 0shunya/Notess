import { useEffect, useState } from "react";
import api from "../services/api";
import NoteItem from "../components/NoteItem";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const { data } = await api.get("/api/notes");
      setNotes(data);
    } catch (error) {
      alert("Not authorized. Please login.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create note
  const createNoteHandler = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Title and content required");
      return;
    }

    try {
      await api.post("/api/notes", { title, content });

      // Clear form
      setTitle("");
      setContent("");

      // Refresh notes
      fetchNotes();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div>
      <h2>Your Notes</h2>
      <button onClick={logoutHandler}>Logout</button>

      <hr />

      {/* CREATE NOTE FORM */}
      <form onSubmit={createNoteHandler}>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />

        <textarea
          placeholder="Note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br />

        <button type="submit">Add Note ➕</button>
      </form>

      <hr />

      {/* NOTES LIST */}
      {notes.length === 0 && <p>No notes yet</p>}

{notes.map((note) => (
  <NoteItem
    key={note._id}
    note={note}
    fetchNotes={fetchNotes}
  />
))}

    </div>
  );
};

export default Notes;
