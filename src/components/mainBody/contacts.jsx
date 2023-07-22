import React from "react";
import Image from "../image";
import LabelText from "../label";
import './contacts.css';

export default function Contact(props){
    console.log(props.number);
    //let number=1;
    return (
        <div className="contact-item"onClick={()=>props.handleMessages(props.username, props.fullName)}>
                    <Image src={props.userPic} />
                    { props.number? <div className="unread-messages">
                        {props.number}
                    </div> : '' }
                    <div>
                        <div className="contact-name">{props.fullName}</div>
                        <div className="contact-email">{props.number}</div>
                        <div className="contact-email">{props.lastMessage}</div>
                        
                    </div>
        </div>
    );
}