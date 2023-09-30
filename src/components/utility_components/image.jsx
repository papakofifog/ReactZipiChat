import React, { useState,useEffect } from "react";

export default function Image(props){

    return (
    <>
        <img className={props.style||"images"} src={props.src} />
        {props.children}
        
    </>);
}