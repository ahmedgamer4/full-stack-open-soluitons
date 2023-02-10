import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import noteService from "../services/notes";

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(({ notes, filter }) => {
    if (filter === "ALL") {
      return notes;
    }
    return filter === "IMPORTANT"
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important);
  });

  const updateNote = async (note, id) => {
    const obj = { ...note, important: !note.important }
    const updatedNote = await noteService.update(obj, id)
    console.log(updatedNote)
    dispatch(toggleImportanceOf(updatedNote.id))
  } 

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => updateNote(note, note.id)}
        />
      ))}
    </ul>
  );
};

export default Notes;
