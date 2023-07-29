import React, { useState, useEffect } from "react";
import Image from "../image";
import "./contacts.css";
import { BellFilled, BellOutlined } from "@ant-design/icons";

export default function Contact(props) {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [isContactActive, updateActiveContactStatus]= useState(false);

  useEffect(() => {
    console.log("Username : ", props.username);
    console.log("Receipient : ", props.receipient);
    if (props.username === props.receipient  && props.username!=props.relation.receiver) {
      setUnreadMessageCount(prevValue=>prevValue+1);
      
    }
    props.updateSelectReceipient();
  }, [props.conversations]);

  return (
    <div
      className="contact-item"
      onClick={() => {
        setUnreadMessageCount(0);
        props.handleMessages(props.username, props.fullName);
      }}
    >
      <Image src={props.userPic} />
      {<div className="unread-messages">
        <span style={{ display: "flex" }}>
          {unreadMessageCount == 0 ? (
            <BellOutlined className="unread-message" />
          ) : (
            <BellFilled
              className="unread-message"
              style={{ color: "red" }}
              value={unreadMessageCount}
            />
          )}
          {unreadMessageCount > 0 ? (
            <div style={{ alignSelf: "top", fontSize: "10px", color: "red" }}>
              {unreadMessageCount}
            </div>
          ) : (
            ""
          )}
        </span>
      </div>}

      <div>
        <div className="contact-name">{props.fullName}</div>
        <div className="contact-email">{props.number}</div>
        <div className="contact-email">{props.lastMessage}</div>
      </div>
    </div>
  );
}
