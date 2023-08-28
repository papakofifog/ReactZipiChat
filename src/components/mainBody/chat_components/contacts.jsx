import React, { useState, useEffect } from "react";
import Image from "../../utility_components/image";
import { BellFilled, BellOutlined } from "@ant-design/icons";

export default function Contact(props) {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  useEffect(() => {
    if (
      props.username === props.receipient &&
      props.username != props.relation.receiver
    ) {
      setUnreadMessageCount((prevValue) => prevValue + 1);
    }
    if (props.receipient) props.updateSelectReceipient();
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
      {props.displayNotifications && (
        <div className="unread-messages">
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
        </div>
      )}

      <div>
        <div className="contact-name">{props.fullName}</div>
        <div className="contact-email">{props.number}</div>
        <div className="contact-email">{props.lastMessage}</div>
      </div>
    </div>
  );
}
