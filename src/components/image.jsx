import React, { useState,useEffect } from "react";

export default function Image(props){

    return (<div className="retlative">
        <img className={props.style||"images"} src={props.src} />
        {props.children}
    </div>);
}