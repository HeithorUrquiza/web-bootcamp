import React from "react";
import Dict from "./Dict";
import emojipedia from "../emojipedia";


function createDict(emoji){
  return (
    <Dict 
      key={emoji.id}
      emoji={emoji.emoji}
      name={emoji.name}
      meaning={emoji.meaning}
  />
  )
}


function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {emojipedia.map(createDict)}
      </dl>
    </div>
  );
}

export default App;
