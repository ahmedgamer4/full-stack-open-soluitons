import Note from "./components/note";

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note note={note} id={note.id} />
        )}
      </ul>
    </div>
  )
}

export default App;
