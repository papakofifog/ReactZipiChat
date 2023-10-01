import React, { useState,useEffect } from "react";
import userProfileOutline from "../../assets/svg/userProfileOutlined.svg";

export default function Image(props){

    return (
    <>
        <img className={props.style||"images"} src={props.src || userProfileOutline} />
        {props.children}
        
    </>);
}