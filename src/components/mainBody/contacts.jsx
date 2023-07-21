import React from "react";
import Image from "../image";
import LabelText from "../label";
import './contacts.css';

export default function Contact(props){
    let number=1;
    return (
        <div className="contact-item"onClick={()=>props.handleMessages(props.username, props.fullName)}>
                    <Image src={props.userPic} />
                    { number? <div className="unread-messages">
                        {number}
                    </div> : '' }
                    <div>
                        <div className="contact-name">{props.fullName}</div>
                        <div className="contact-email">{props.number}</div>
                        <div className="contact-email">{props.lastMessage}</div>
                        
                    </div>
        </div>
    );
}