import React, {useState, useEffect} from "react";
import DisplayUploadedFile from "./UploadedFile";
import { EditAttributes, EditNote, EditNoteOutlined } from "@mui/icons-material";
import { DeleteColumnOutlined } from "@ant-design/icons";
import { IoIosTrash } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import Modal from "../modal/modal";
import { DeleteData, SendData } from "../../utility/handleAxiousRequest";
import { showToast } from "../../utility/showToast";
import CustomButton from "../buttons";


function Message(props){
    
    return(
        
        <div className={props.class} id={props.id}>
            <div style={{ position:"relative", cursor: "pointer", display:"flex" ,flexDirection:"row",justifyContent:"space-evenly" , alignItems:"center" }}>
                <EditNoteOutlined />
                <FiTrash2 onClick={()=>props.deleteMessage(props.id)}/>
            </div>
            <div >
                 
                { props.message.fileSent.url && <DisplayUploadedFile className="chatImage"  fileUrl={props.message.fileSent.url} fileName={props.message.fileSent.name} fileType={props.message.fileSent.type} close={false}/> }

                <h4>{props.message.messageString}</h4> 
            </div>
            
        </div>
        
        
    );
}


function DeleteMessage(props){

    async function handleDeleteMessage(){
        let messageId= props.messageId
        let response= await DeleteData(`http://localhost:3000/convo/deleteMessage/${messageId}`);

        console.log(response)
        if(response.data.success){
            showToast(response.data.message, "green", true)
            props.close();
        }else{
            showToast(response.data.message, "red", false)
        }
    }

    
    return(
        <div style={{display:"flex" ,flexDirection:"column"}}>
            <p>Are you sure you want to delete this messgae</p>
            <CustomButton 
                click={handleDeleteMessage} 
                style="action"
                isdisabled={false}
                buttonName="Yes" />
        </div>
    );
}

export {Message, DeleteMessage}



