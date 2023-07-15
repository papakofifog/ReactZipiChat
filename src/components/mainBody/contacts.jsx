import React from "react";
import Image from "../image";
import LabelText from "../label";
import './contacts.css';

export default function Contact(props){
    let number=1;
    return (
        /*{<div className="contact-message" onClick={()=>props.handleMessages(props.username, props.fullName)}>
             <div>
                <Image src={"hey"} /> 
                { number? <div className="unread-messages">
                    {number}
                </div> : '' }
            </div>
            

            <div className="user-details">
                <p>{props.fullName}</p>
                <p>{props.number}</p>
                <p>{props.lastMessage}</p>
               

            </div>
            <div className="date">
                <LabelText class={"profile-text"} text={props.lastMessageDate} />
            </div>
        </div>}*/

        <div class="contact-item"onClick={()=>props.handleMessages(props.username, props.fullName)}>
                    <Image src={"hey"} />
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