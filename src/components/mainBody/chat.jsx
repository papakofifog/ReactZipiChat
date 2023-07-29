import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Image from "../image";
import LabelText from "../label";
import Icon from "../icons";
import { SendData, sendFormData } from "../../utility/handleAxiousRequest";
import CustomButton from "../buttons";
import { Emoji, FileUpload } from "../emoji";
import data from "@emoji-mart/data";
import Modal from "../modal/modal";
import { FiPaperclip, FiSend, FiSmile, FiMic } from "react-icons/fi";
import Message from "./message";
import DisplayUploadedFile from "./UploadedFile";
import { RecordMedia } from "./recordAudio/audioRecord";
import convertBlobUrlToFile from "../../utility/handlingFileConversion";
import { connection } from "../../context/socket";

export default function Chat(props) {
  //const [messageSent, sendMessage] = useState(false);

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

  async function uploadFunctionCloudinary(value) {
    try {
      let formData = new FormData();
      formData.append("file", value);
      let uploadedFileData = await sendFormData(
        "http://localhost:3000/users/upload",
        formData
      );
      let CloudinaryFileData = uploadedFileData.data;
      if (CloudinaryFileData.success) {
        let { url, original_filename, fileType } = CloudinaryFileData.data;

        return { url, original_filename, fileType };
      }
      return null;
    } catch (e) {
      console.error(e);
    }
  }

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
    let uploadedFile;
    let message;

    if (fileToUpload.file) {
      let data = await uploadFunctionCloudinary(fileToUpload.file);

      uploadedFile = {
        url: data.url,
        type: data.fileType,
        name: data.original_filename,
      };

      message = {
        messageString: messageToRead.messageString,
        fileSent: uploadedFile,
      };
    } else {
      message = messageToRead;
    }

    let messageToSend = {
      message,
      senderId: props.activeUser,
      recipientId: props.relation.receiver,
    };

    await SendData("http://localhost:3000/convo/addmessage", messageToSend);

    connection.emit("sendMessage", messageToSend);

    updateMessage({
      messageString: "",
      fileSent: {
        url: "",
        type: "",
        name: "",
      },
    });

    setFileToUpload({
      name: "",
      size: "",
      type: "",
      url: "",
      file: null,
    });

    handleSendMessageEvent(messageToSend);
  }

  let messagesList = props.conversations.map((messageloaded, index) => {
    return messageloaded.senderId == props.activeUser ? (
      <Message 
      key={index} 
      class="sender" 
      message={messageloaded.message} 
      />
    ) : (
      <Message 
      key={index} 
      class="receiver" 
      message={messageloaded.message} 
      />
    );
  });

  function handleCancelUpload(event) {
    setFileToUpload({
      url: "",
      type: "",
      name: "",
      file: null,
    });
  }

  function handleReceivedMessage(data) {
    props.onUpdateConversations((prevConversations) => {
      return {
        ...prevConversations,
        data: [...prevConversations.data, data],
      };
    });
    props.updateNotifications(data.senderId);
  }

  function handleSendMessageEvent(data) {
    props.onUpdateConversations((prevConversations) => {
      //console.log(prevConversations)
      return {
        ...prevConversations,
        data: [...prevConversations.data, data],
      };
    });
  }

  useEffect(() => {
    // Listen for a custom event from the server
    connection.on("receiveMessage", handleReceivedMessage);

    return () => {
      connection.off("receiveMessage", handleReceivedMessage);
    };
  }, [props.conversations.data]);

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
                icon={<Icon icon={<FiSend className="icon gray" />} />}
                click={handleChatButtonClick}
                isdisabled={messageToRead.messageString.trim()===""}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
