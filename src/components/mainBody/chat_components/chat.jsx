import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Image from "../../utility_components/image";
import LabelText from "../../utility_components/label";
import Icon from "../../utility_components/icons";
import { SendData, sendFormData } from "../../../utility/handleAxiousRequest";
import CustomButton from "../../utility_components/buttons";
import { Emoji, FileUpload } from "../../utility_components/emoji";
import data from "@emoji-mart/data";
import Modal from "../../utility_components/modal";
import { FiPaperclip, FiSend, FiSmile, FiMic } from "react-icons/fi";
import Message from "./message";
import DisplayUploadedFile from "./UploadedFile";
import { RecordMedia } from "./recordAudio/audioRecord";
import convertBlobUrlToFile from "../../../utility/handlingFileConversion";
import { connection } from "../../../context/socket";
import { mutateZipiUserData } from "../../../hooks/mutateZipiUserData";
import { handleUpdloadPictureToCloud } from "../../../appRequests/zipiChatApiMutions";
import { CircularProgress } from "@mui/material";

export default function Chat(props) {

  const [ModalDetails, showModal] = useState({
    show: false,
    title: "",
    content: "",
    action: "",
  });

  const [fileToUpload, setFileToUpload] = useState({
    name: "",
    size: "",
    type: "",
    url: "",
    file: null,
  });

  const [messageToRead, updateMessage] = useState({
    messageString: "",
    fileSent: {
      url: "",
      type: "",
      name: "",
    },
  });

  const containRef = useRef(null);



  function handleScrollToBottom() {
    if (containRef.current) {
      const { scrollHeight, clientHeight } = containRef.current;
      containRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }


  function handleUploadToCloudSucess(data){
    console.log(data?.data?.data);
    let messageToSend = {
        message:{
          messageString: messageToRead.messageString,
          fileSent:{
            url: data?.data?.data.url,
            type: data?.data?.data.fileType,
            name: data?.data?.data.original_filename,
          }
        }
        ,
        senderId: props.activeUser,
        recipientId: props.relation.receiver,
    };

    connection.emit("sendMessage", messageToSend);
    mutateSendingMessage(messageToSend);
  }

  function handleSaveMessageSuccess(data){
    let emptyMessageState={
      messageString: "",
      fileSent: {
        url: "",
        type: "",
        name: "",
      }
    }

    let emptyFileToUploadState={
      name: "",
      size: "",
      type: "",
      url: "",
      file: null,
    }
    updateMessage(emptyMessageState);

    setFileToUpload(emptyFileToUploadState);

    handleSendMessageEvent();
  }

  function handleFailureEvent(error){
    console.error(error)
  }

  async function saveChatMessage(data){
    try{
      let response=await SendData("/convo/addmessage", data);
      return response;
    }catch(e){
      console.error(e)
    }
  }

  


  const {mutate:mutateUploadFileToCloud, isLoading:isFileUploadToCloudLoading, error:fileUploadError}= mutateZipiUserData("uploadConvoFile", handleUpdloadPictureToCloud, handleUploadToCloudSucess,handleFailureEvent );
  const {mutate:mutateSendingMessage, isLoading:isMessageSending}= mutateZipiUserData("sendMessage", saveChatMessage, handleSaveMessageSuccess, handleFailureEvent )
 

  function handleInputFileChangeEvent(event) {
    let { files } = event.target;

    setFileToUpload((prevUploadedFile) => {
      return {
        ...prevUploadedFile,
        name: files[0].name,
        size: files[0].size,
        type: files[0].type,
        url: URL.createObjectURL(files[0]),
        file: files[0],
      };
    });
  }

  async function handleUploadAudioFile(fileUrl) {
    let file = await convertBlobUrlToFile(fileUrl);

    if (file) {
      setFileToUpload({
        name: "recordedAudio",
        size: file.size,
        type: "audio",
        url: fileUrl,
        file: file,
      });
      handleCloseEvent();
    }
  }

  function handleChatButtonClick(id) {
    let curActionElement = "";
    switch (id) {
      case "addEmoji":
        curActionElement = {
          title: "Add and Emoji",
          content: <Emoji emogiData={data} select={handleEmogiSelection} />,
          action: "",
        };
        break;

      case "attatchFile":
        handleInputFileChangeEvent();
        return;

      case "record-audio":
        curActionElement = {
          title: "Record and Audio",
          content: (
            <RecordMedia
              recordType={"audio"}
              uploadAudioFile={handleUploadAudioFile}
            />
          ),
          action: "",
        };
        break;

      case "sendMessage":
        handleSendMessage();
        return;

      default:
        break;
    }

    showModal((prevModalDetails) => {
      return { ...prevModalDetails, show: true, ...curActionElement };
    });
  }

  function handleEmogiSelection(emoji) {
    updateMessage((prevMessage) => {
      return {
        ...prevMessage,
        messageString: prevMessage.messageString + emoji,
      };
    });

    let curActionElement = { title: "", content: "" };
    showModal((prevModalDetails) => {
      return { ...prevModalDetails, show: false, ...curActionElement };
    });
  }

  function handleCloseEvent() {
    showModal((prevModalDetails) => {
      return { ...prevModalDetails, show: false, title: "", content: [] };
    });
  }

  let modal = ModalDetails.show ? (
    <Modal
      close={handleCloseEvent}
      content={ModalDetails.content}
      modalContentStyle="actionModal"
      modalBodyStyle="actionModal"
      actionName={ModalDetails.action}
    />
  ) : (
    ""
  );

  function handleChatMessageChange(event) {
    let { value } = event.target;
    updateMessage((prevMessage) => {
      return { ...prevMessage, messageString: value };
    });
  }

  async function handleSendMessage() {
    if (fileToUpload.file) {
      let formData = new FormData();
      formData.append("file", fileToUpload.file);
      mutateUploadFileToCloud(formData);
    }else{
      mutateSendingMessage({
        message:{
          messageString: messageToRead.messageString,
          fileSent:{
            url: "",
            type: "",
            name: "",
          }
        }
        ,
        senderId: props.activeUser,
        recipientId: props.relation.receiver,
      })
    }
  }

  let messagesList = props.conversations.map((messageloaded, index) => {
    return messageloaded.senderId === props.activeUser ? (
      <Message key={index} class="sender" message={messageloaded.message} />
    ) : (
      <Message key={index} class="receiver" message={messageloaded.message} />
    );
  });
  //console.log(props.conversations);

  function handleCancelUpload(event) {
    setFileToUpload({
      url: "",
      type: "",
      name: "",
      file: null,
    });
  }

  function handleReceivedMessage(data) {
    props.onUpdateConversations({
      receiver:data.senderId
    })
    props.updateNotifications(data.senderId);
  }

  function handleSendMessageEvent() {
    props.onUpdateConversations({
      receiver:props.relation.receiver
    })
    props.updateNotifications(props.activeUser);

  }

  useEffect(() => {
    // Listen for a custom event from the server
    connection.on("receiveMessage", handleReceivedMessage);

    return () => {
      connection.off("receiveMessage", handleReceivedMessage);
    };
  }, []);

  return (
    <div className="chats-view">
      <div className="chat-profile">
        {props.src ? (
          <>
            <Image />
            <LabelText
              class={"chat-profile-text"}
              text={`${props.relation.usersActualName}`}
            />
          </>
        ) : (
          <LabelText
            class={"chat-profile-text"}
            text={`${props.relation.usersActualName}`}
          />
        )}
      </div>
      <ul className="chat-messages" ref={containRef}>
        {!props.disabledStatus && messagesList}
      </ul>
      {modal}

      <div id="form" className="">
        <div className="message-spicer">
          <textarea
            rows={3}
            className="fullwidth"
            id="input"
            autoComplete="off"
            onChange={handleChatMessageChange}
            value={messageToRead.messageString}
            disabled={props.disabledStatus}
          />
          <div className="displayFile">
            <DisplayUploadedFile
              fileType={fileToUpload.type}
              fileName={fileToUpload.name}
              fileUrl={fileToUpload.url}
              close={true}
              cancelUplaod={handleCancelUpload}
              fileIsBeingUploaded={isFileUploadToCloudLoading}
            />
          </div>

          <div className="actions flex ">
            <div className="m-attachments">
              <CustomButton
                className="message-auxilliaries"
                id="addEmoji"
                icon={<Icon icon={<FiSmile className="icon gray" />} />}
                click={handleChatButtonClick}
                isdisabled={props.disabledStatus}
              />
              <FileUpload
                id="attatchFile"
                class="message-auxilliaries"
                icon={<Icon icon={<FiPaperclip className="icon gray" />} />}
                change={handleInputFileChangeEvent}
                isdisabled={props.disabledStatus}
              />
              <CustomButton
                id="record-audio"
                class="message-auxilliaries"
                icon={<Icon icon={<FiMic className="icon gray" />} />}
                click={handleChatButtonClick}
                isdisabled={props.disabledStatus}
              />
            </div>
            <div className="m-send">
              <CustomButton
                id="sendMessage"
                class="message-auxilliaries"
                icon={isFileUploadToCloudLoading || isMessageSending ?<CircularProgress />:<Icon icon={<FiSend className="icon gray" />} />}
                click={handleChatButtonClick}
                isdisabled={(messageToRead.messageString.trim() === "" && fileToUpload.name==="") || isFileUploadToCloudLoading || isMessageSending }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
