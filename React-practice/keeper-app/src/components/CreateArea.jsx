import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [checked, setChecked] = useState(false)
  const [note, setNote] = useState({
    title: "",
    content: ""
  })

  function handleChange(event){
    const {name, value} = event.target
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      }
    })
  }

  function submitNote(event){
    props.onClicked(note)
    setNote({
      title: "",
      content: ""
    })
    event.preventDefault()
  }

  function handleClick(){
    setChecked((prev) => !prev)
  }

  return (
    <div>
      <form className="create-note">
        {checked && <input 
          onChange={handleChange} 
          name="title" 
          placeholder="Title" 
          value={note.title}/>
        }
        <textarea 
          onChange={handleChange} 
          onClick={handleClick}
          name="content" 
          placeholder="Take a note..." 
          rows={checked ? "3" : "1"} 
          value={note.content}/>
        <Zoom in={checked}>
          <Fab onClick={submitNote}>
            <AddIcon/>
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;