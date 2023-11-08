import React, {useState} from "react";
import DisplayUploadedFile from "./UploadedFile";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { EditNoteOutlined, DeleteOutline } from "@mui/icons-material";
import { TextBox } from "./textBox";
import { deleteRecentlySentMessage, editRecentlySentMessage } from "../../../appRequests/zipiChatApiMutions";
import { mutateZipiUserData } from "../../../hooks/mutateZipiUserData";
import { showToast } from "../../../utility/showToast";
import { connection } from "../../../context/socket";


export default function Message(props) {
  const [show, updateShowStatus]= useState(false);
  const [cannotEditMessage, updateMessageCanBeEditedStatus]= useState(true);
  const [newMessage, setMessage]= useState(
    {
      message:{
        messageString: props.message.messageString,
        fileSent:{
          url: props.message.fileSent.url,
          type: props.message.fileSent.type,
          name: props.message.fileSent.name,
        }
      }
    })

  function handleEditMessageSuccess(){
    connection.emit("messageHasBeenEdited", {sender: props.senderId,recipient:props.recipientId })
    showToast("Message edited","green", true);
    props.refetchData();
  }

  function handleEditMessageFailure(){
    showToast("Edit message failed","red", false);
  }

  function handleDeleteMessageSuccess(){
    connection.emit("messageHasBeenDeleted", {sender: props.senderId,recipient:props.recipientId })
    showToast("Message deleted","green", true);
    props.refetchData();
  }

  function handleDeleteMessageFailure(){
    showToast("Delete message failed","red", false);
  }

  

  const {mutate: updateMessage, isLoading:updateMessageLoading }= mutateZipiUserData("updatesenderMessage", editRecentlySentMessage, handleEditMessageSuccess, handleEditMessageFailure )
  const {mutate: deleteMessage, isLoading:deleteMessageLoading}= mutateZipiUserData("deleteMessage", deleteRecentlySentMessage, handleDeleteMessageSuccess, handleDeleteMessageFailure )



  function handleUpdateMessageMutation(){
    updateMessage({
      "message":newMessage.message,
      "messageId": props.messageId
    }) 
  }

  function handleDeleteMessageMutation(){
    deleteMessage({
      "messageId": props.messageId
    }) 
  }


  
  
  function handleActionsMenuDisplay(event){
    if(props.sender && Date.parse(props.createdAt)>= Date.now()-50000){
      updateShowStatus(true);
    }
    
  }

  function handleHideActionMenu(){
    updateShowStatus(false);
  }

  function handleEditMessage(){
    updateMessageCanBeEditedStatus(false);
  }

  function handleCancelEditMessageAction(){
    updateMessageCanBeEditedStatus(true);
  }

  function handleChange(event){
        let {name, value} = event.target;
        console.log(event)
        setMessage(prevValue=> {
          return {...prevValue,
            message:{
            messageString: value,
            fileSent:{
              url: props.message.fileSent.url,
              type: props.message.fileSent.type,
              name: props.message.fileSent.name,
            }
          }}
        } )
  }





  return (
    <div className={props.class} onMouseOver={handleActionsMenuDisplay} onMouseLeave={handleHideActionMenu}>
      
      
      <div>
        {show && <div className="actionMenu">
          <div className="actionMenuOptions"><EditNoteOutlined onClick={handleEditMessage}/> <DeleteOutline onClick={handleDeleteMessageMutation} /></div>
        </div>}
        {props.message.fileSent.url && (
          <DisplayUploadedFile
            className="chatImage"
            fileUrl={props.message.fileSent.url}
            fileName={props.message.fileSent.name}
            fileType={props.message.fileSent.type}
            close={false}
          />
        )}

        {cannotEditMessage?<h4>{props.message.messageString}</h4>: <TextBox message={newMessage.message.messageString} click={handleUpdateMessageMutation} cancel={handleCancelEditMessageAction} change={handleChange}/>}
      </div>
    </div>
  );
}
