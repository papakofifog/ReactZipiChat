import React, { useState,useEffect } from "react";
import { Avatar } from "@mui/material";

export default function Image(props){

    return (
    <>
        {props?.src?<img className={props.style||"images"} src={props.src} />: <Avatar className={props.style||"images"} /> }
        {props.children}
        
    </>);
}