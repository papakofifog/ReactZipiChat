import React from "react";
import './sectionTab.css';
import Icon from "../icons";
import LabelText from "../label";


export default function Tabs(props){
    console.log(props.modal)
   

    return (
        <div id={props.id} className="section-tab" onClick={()=>props.click(props.id)}>
            <Icon icon={props.icon} />
            <LabelText class={props.class} text={props.text} />
        </div>
    );
}