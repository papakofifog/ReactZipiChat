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
        //console.log(isConnected);
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

 // console.log(isConnected);





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
        url:'',
        file: null
    })

    let [messageToRead, updateMessage]= useState({
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

        try{
            let formData= new FormData();
            formData.append('file', value);
            let uploadedFileData= await sendFormData("http://localhost:3000/users/upload", formData);
            let CloudinaryFileData=uploadedFileData.data;
            if(CloudinaryFileData.success){
                let { url, original_filename, fileType} = CloudinaryFileData.data;
                //console.log()
                return {url, original_filename, fileType}
    
            } 
            return null;
        }catch(e){
            console.error(e)
        }
        
        
    }

    

    //console.log(fileToUpload)


    function handleInputFileChangeEvent(event){
        let { files }= event.target;

        //console.log(files);
        
        

        setFileToUpload((prevUploadedFile)=> {
            return { ...prevUploadedFile,name:files[0].name, size: files[0].size, type: files[0].type,url: URL.createObjectURL(files[0]), file:files[0]}
        });
        
        
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
                //console.log("we are here")
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

        //console.log(message);
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

   

    async function handleSendMessage(){

        let uploadedFile;
        let message;

        if(fileToUpload.file){
            let data=await uploadFunctionCloudinary(fileToUpload.file);

            uploadedFile={
                url: data.url,
                type:data.fileType,
                name:data.original_filename
            }

            message= {
                messageString: messageToRead.messageString,
                fileSent: uploadedFile
            }
        }else{
            message= messageToRead;
        }
        
        let messageToSend= {message,
             senderId:props.activeUser,
            recipientId: props.relation.receiver}


        await SendData("http://localhost:3000/convo/addmessage",messageToSend);
        //emitEvent("sendMessage",messageToSend);
        //socket.emit('sendMessage', { message: messageToSend });

        //console.log(message)
        updateMessage({
            messageString:"",
            fileSent: {
                url: "",
                type:"",
                name:""
            }
        });

        setFileToUpload({
            name:'',
            size:'',
            type:'',
            url:'',
            file: null
        })

        props.update(true);

    }
   

    let messagesList= props.conversations.data.map((messageloaded,index)=>{
       return messageloaded.senderId == props.activeUser ?<Message 
       key={index}
       class="sender"
       message={messageloaded.message}
       />:<Message 
       key={index}
       class="receiver"
       message={messageloaded.message}
       />
       
    })

    function handleCancelUpload(event){
        setFileToUpload({
            url: "",
            type:"",
            name:"",
            file:null
        })
    }

    //console.log(fileToUpload)
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
                            <textarea 
                            rows={3}
                            className="fullwidth" 
                            id="input" 
                            autocomplete="off"
                            onChange={handleChatMessageChange} 
                            value={messageToRead.messageString}
                            />
                            <div className="displayFile">
                                
                                
                                <DisplayUploadedFile fileType={fileToUpload.type}  fileName={fileToUpload.name} fileUrl={fileToUpload.url} close={true} cancelUplaod={handleCancelUpload}/>

                            </div>
                            
                            <div className="actions flex ">
                                <div  className="m-attachments">
                                    <CustomButton 
                                    className="message-auxilliaries" 
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