import React from "react";

function Title(props){
    return (
        <dt>
            <span className="emoji" role="img" aria-label="Tense Biceps">
              {props.emoji}
            </span>
            <span>{props.name}</span>
        </dt>
    )
}

export default Title