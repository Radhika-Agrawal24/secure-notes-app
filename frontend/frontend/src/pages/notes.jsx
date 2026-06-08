import { useState } from "react";
import { createNote, deleteNote ,getNote,updateNote} from "../services/noteApi";
import "./notes.css"
function Notes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
const[edit,setEdit]=useState(null);
const handleEdit=(note)=>{
  setEdit(note._id);
  setTitle(note.title);
  setContent(note.content);
}
  const submit = async () => {
    try {
      if(edit){
             const res = await updateNote(edit, {
        title,
        content,
      });
        const updatedList = notes.map((note) =>
        note._id === edit ? res.data : note
      );
      setNotes(updatedList);
setEdit(null);
      }else{
      const res = await createNote({
        title,
        content,
      });

      setNotes([...notes, res.data]);
    }
      setTitle("");
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };
const handleDelete=async (id)=>{
  try{
const res= await deleteNote(id);
setNotes(notes.filter(note=>note._id!==id))

  }
  catch(error){
console.log(err);
  }
 
}
  return (
    <div className="note-page">
        <div className="note-form">
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={submit}>
        Create Note
      </button>

      {notes.map((note) => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={()=>handleDelete(note._id)
            
          }>Delete</button>
          <button onClick={()=>handleEdit(note)}>update</button>
        </div>
      ))}
    </div>  </div>
  );
}

export default Notes;