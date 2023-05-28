import React from "react";
import Image from "../image";
import LabelText from "../label";
import './contacts.css';

export default function Contact(props){
    let number=1;
    return (
        <div className="contact-message" onClick={()=>props.handleMessages(props.username)}>
            <div>
                <Image src={"hey"} /> 
                { number? <div className="unread-messages">
                    {number}
                </div> : '' }
            </div>
            

            <div className="user-details">
                <LabelText class={"profile-text"} text={props.fullName} />
                <LabelText class={"profile-text"} text={props.number} />
                <LabelText class={"profile-text"} text={props.lastMessage} />

            </div>
            <div className="date">
                <LabelText class={"profile-text"} text={props.lastMessageDate} />
            </div>

            

        </div>
    );
}