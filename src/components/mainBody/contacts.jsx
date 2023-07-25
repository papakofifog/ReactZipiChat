import React, {useState,useEffect} from "react";
import Image from "../image";
import './contacts.css';
import { connection } from "../../context/socket";
import { BellFilled, BellOutlined } from "@ant-design/icons";

export default function Contact(props){
    let [unreadMessageCount, setUnreadMessageCount]= useState(0);

    console.log(props.username,props.receipient)

    useEffect(()=>{
        
        if(props.username=== props.receipient){
            setUnreadMessageCount((prevValue)=>prevValue+1)
        }
        

    }, [props.receipient])


    console.log("the notification count is "+unreadMessageCount)
    return (

        <div className="contact-item"onClick={()=>{
            setUnreadMessageCount(()=>{return 0});
            props.handleMessages(props.username, props.fullName)}}>
                    <Image src={props.userPic} />
                    <div className="unread-messages">
                        <span style={{display:"flex"}} >{unreadMessageCount==0?<BellOutlined className="unread-message" value={unreadMessageCount} /> :<BellFilled className="unread-message" style={{color:"red"}} value={unreadMessageCount} /> }
                        {unreadMessageCount>0?<div style={{alignSelf:"top", fontSize:"10px", color:"red"}}>{unreadMessageCount}</div>: ''}</span>
                    </div>
                
                    <div>
                        <div className="contact-name">{props.fullName}</div>
                        <div className="contact-email">{props.number}</div>
                        <div className="contact-email">{props.lastMessage}</div>
                        
                    </div>
        </div>
    );
}