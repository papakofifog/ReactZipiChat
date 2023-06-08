import React, { useState, useEffect } from "react";

import Image from "../image";
import LabelText from "../label";
import Icon from "../icons";
import { SendData, sendFormData } from "../../utility/handleAxiousRequest";
import CustomButton from "../buttons";
import {Emoji, FileUpload, RecordAudio} from "../emoji";
import data from '@emoji-mart/data';
import Modal from "../modal/modal";
import {FiPaperclip, FiSend, FiSmile, FiMicOff, FiMic } from "react-icons/fi"
import Message from "./message";
import {showFileAsToast } from '../../utility/showToast'
import DisplayUploadedFile from "./UploadedFile";
import { socket, emitEvent, isSocketConneted, listenToSocket } from "../../socket";



export default function Chat(props){
    const [isConnected, setIsConnected] = useState(isSocketConneted);
     const[socketEvent, setSocketEvents] = useState([]);

    useEffect(()=>{
    function onConnect(){
        console.log(isConnected);
        setIsConnected(true);
    }

    function onDisconnect(){
      setIsConnected(false);
    }

    function onReceivedMessage(value){
      setSocketEvents(previous => [...previous,value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receiveMessage',onReceivedMessage);
  })

  console.log(isConnected);





    let [ModalDetails, showModal ] = useState({
        show: false,
        title: "",
        content: '',
        action: ''
    });


    let [fileToUpload,setFileToUpload] = useState({
        name:'',
        size:'',
        type:'',
        url:''
    })

    let [message, updateMessage]= useState({
        messageString:"",
        fileSent: {
            url: "",
            type:"",
            name:""
        }
    });

    let [file,setFile] = useState(null);

    let [content, manageContent] = useState(null);

    async function uploadFunctionCloudinary(value){
        
        let formData= new FormData();
        formData.append('file', value);
        let uploadedFileData= await sendFormData("http://localhost:3000/users/upload", formData);
        let CloudinaryFileData=uploadedFileData.data;
        if(CloudinaryFileData.success){
            let { url, original_filename, fileType} = CloudinaryFileData.data;
            setUploadedFile((prevMessage)=>{
                return {...prevMessage,
                    fileSent :{
                        url:url,
                        name:original_filename,
                        type:fileType
                    }
                }
            })
            
             
        } 
        
        
    
    }


    function handleInputFileChangeEvent(event){
        let { files }= event.target;
        
        //await uploadFunctionCloudinary(files[0]);

        if(files[0]){
            const reader = new FileReader();
            //set a file reader onload event
            

            reader.onload = function (e){
                console.log(e.target.result)
                setFileToUpload(()=>{
                    return {name:files[0].name, size: files[0].size, type: files[0].type,url: e.target.result}
                });
            }

            reader.readAsDataURL(files[0]);
            
        }




       
       
    }



    function ManageContent(context){

        manageContent((prevContent)=>{
            return {... prevContent, }
        })

    }




    

    function handleChatButtonClick(id) {
        
        let curActionElement="";
        switch(id){
            case "addEmoji":
                curActionElement= {
                    title:"Add and Emoji",
                    content:<Emoji emogiData={data} select={handleEmogiSelection} />,
                    action:''
                }
                break;

            case "attatchFile":
                handleInputFileChangeEvent()
                
                return;
                

            case "record-audio":
                curActionElement= {
                    title:"Record and Audio",
                    content:<RecordAudio />,
                    action:"Stop"
                }
                break; 

            case "sendMessage":
                handleSendMessage();
                return;


            


            default:
                console.log("we are here")
                break;
                
            
        }

        showModal((prevModalDetails)=>{
            return {... prevModalDetails, show: true, ...curActionElement}      
        });
        
    }


    function handleEmogiSelection(emoji){
        updateMessage((prevMessage)=>{
            return {...prevMessage, 
                messageString: prevMessage.messageString+emoji}
        }
            )

        console.log(message);
        let curActionElement={title:'', content:''}
        showModal((prevModalDetails)=>{
                return {... prevModalDetails, show: false, ... curActionElement}      
        });
        
    }

    function handleCloseEvent(){

        showModal((prevModalDetails)=>{
            return {... prevModalDetails, show: false, title:"", content:[]} 
        });

    }

    let modal=ModalDetails.show ?
    <Modal 
    close={handleCloseEvent}
    content={ModalDetails.content} 
    modalContentStyle="actionModal"
    modalBodyStyle="actionModal"
    actionName={ModalDetails.action}

    /> : "";

    function handleChatMessageChange(event){
        let {value} = event.target; 
        updateMessage((prevMessage)=>{
            return {...prevMessage, messageString:value}
        })
        
    }

    console.log(message)

    async function handleSendMessage(){
        let messageToSend= {message,
             senderId:props.activeUser,
            recipientId: props.relation.receiver}
        await SendData("http://localhost:3000/convo/addmessage",messageToSend);
        //emitEvent("sendMessage",messageToSend);
        socket.emit('sendMessage', { message: messageToSend });
        updateMessage({
            messageString:"",
            fileSent: {
                url: "",
                type:"",
                name:""
            }
        });

        props.update(true);

    }
   

    let messagesList= props.conversations.data.map((message,index)=>{
       return message.senderId == props.activeUser ?<Message 
       key={index}
       class="sender"
       message={message.message}
       />:<Message 
       key={index}
       class="receiver"
       message={message.message}
       />
       
    })

    
    return(
        <div className="chats-view">
                    <div className="chat-profile">
                        <Image  />
                        <LabelText class={"chat-profile-text"} text={`Conversation with ${props.relation.receiver}`} />
                    </div>
                    <ul className="chat-messages">
                        {messagesList}
                        
                    </ul>
                    {modal}

                    <div id="form" class="">
                        <div class="message-spicer">
                            <input 
                            className="fullwidth" 
                            id="input" 
                            autocomplete="off"
                            onChange={handleChatMessageChange} 
                            value={message.messageString}
                            />
                            <div className="displayFile">
                                
                                <DisplayUploadedFile fileType={fileToUpload.type}  fileName={fileToUpload.name} fileUrl={fileToUpload.url}/>

                            </div>
                            
                            <div class="actions flex ">
                                <div  class="m-attachments">
                                    <CustomButton 
                                    class="message-auxilliaries" 
                                    id="addEmoji" 
                                    icon={<Icon icon={<FiSmile className="icon gray" /> } />} 
                                    click={handleChatButtonClick}
                                    />
                                    
                                    <FileUpload 
                                    id="attatchFile" 
                                    class="message-auxilliaries" 
                                    icon={<Icon icon={<FiPaperclip className="icon gray"/>} />} 
                                    change={handleInputFileChangeEvent}
                                    />

                                    <CustomButton 
                                    id="record-audio" 
                                    class="message-auxilliaries" 
                                    icon={<Icon icon={<FiMic className="icon gray"/>} />} 
                                    click={handleChatButtonClick}
                                    />
                                </div>
                                <div class="m-send">
                                    <CustomButton 
                                    id="sendMessage" 
                                    class="message-auxilliaries" 
                                    icon={<Icon icon={<FiSend className="icon gray"/>}/>}  
                                    click={handleChatButtonClick}/>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>


    );
}