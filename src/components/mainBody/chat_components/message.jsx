import React from "react";
import DisplayUploadedFile from "./UploadedFile";

export default function Message(props) {
  return (
    <div className={props.class}>
      <div>
        {props.message.fileSent.url && (
          <DisplayUploadedFile
            className="chatImage"
            fileUrl={props.message.fileSent.url}
            fileName={props.message.fileSent.name}
            fileType={props.message.fileSent.type}
            close={false}
          />
        )}

        <h4>{props.message.messageString}</h4>
      </div>
    </div>
  );
}
