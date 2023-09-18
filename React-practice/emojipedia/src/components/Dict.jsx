import React from "react";
import Title from "./Title";
import Describe from "./Describe";

function Dict(props){
    return (
        <div className="term">
          <Title emoji={props.emoji} name={props.name}/>
          <Describe meaning={props.meaning}/>
        </div>
    )
}

export default Dict