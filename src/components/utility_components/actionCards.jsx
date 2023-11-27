import React from "react";
import CustomButton from "./buttons";
import Contact from "../mainBody/chat_components/contacts";
import { SendData, fetchData } from "../../utility/handleAxiousRequest";
import { showToast } from "../../utility/showToast";
import {mutateZipiUserData } from "../../hooks/mutateZipiUserData";
import { CircularProgress } from "@mui/material";
import { useQueryClient } from "../../App";
import { connection } from "../../context/socket";

export default function ActionCards(props) {
  const {mutate, isLoading}= mutateZipiUserData("handleNewFriend", handleRequest, handleSuccess, handleFailure);
  const {mutate:declineRequestMutation, isLoading:declineRequestIsLoading}= mutateZipiUserData('handleDecliningRequest', handleRequest, handleDeclineRequestSuccess, handleFailure);


  const queryClient= useQueryClient();

  async function handleRequest(data){
    try{
      let receivedData = await SendData( data.path,data.data);
      return receivedData;
    }catch(e){
      throw e;
    }
  }

  async function getUserLoginStatus(){
    try{
      let receivedData = await fetchData(`/users/getUsersLoginStatus/${props.friendId}`);
      return receivedData;
    }catch(e){
      throw e;
    }
  }

  function handleMutation(expectedPath,mutationCallBack){
    mutationCallBack({
      data:{
        friend: props.friendId
      },
      path:expectedPath
      
    })
  }

  async function sendFriendRealTimeNotification(action){
    
    let activeUserName=sessionStorage.getItem("activeUserName");
    let dataToSend={sender: activeUserName ,recipient:props.friendId, actionPerformed: action}
    console.log(dataToSend)
    connection.emit("notifyFriend", dataToSend )
    
  }

  

  async function handleSuccess(data){
    let dataToInvalidate=[];
    
    switch (props.buttonsName) {
      case "Send Request":
        dataToInvalidate.push("getNonFriends");
        break;
      case "Cancel Request":
        dataToInvalidate.push("getNonFriends");
        break;
      case "Accept Request":
        dataToInvalidate.push("getFriendRequest");
        dataToInvalidate.push("UserContacts");
        break;

      default:
        dataToInvalidate.push("getFriendRequest");
        break;
    }

    await sendFriendRealTimeNotification(props.buttonsName);
    
    dataToInvalidate.forEach((secreteKey)=>{
      queryClient.invalidateQueries([secreteKey])
    })

    
    showToast(data?.data?.message, "green", true);
    
  }

  async function handleDeclineRequestSuccess(data){
    let dataToInvalidate=[];
    dataToInvalidate.push("getFriendRequest");
    dataToInvalidate.forEach((secreteKey)=>{
      queryClient.invalidateQueries([secreteKey])
    })
    sendFriendRealTimeNotification("Decline Request");
    showToast(data?.data?.message, "green", true);
  }


  function handleFailure(data){
    showToast(data?.response?.data?.message, "red", false);
  }

  function handleButtonClick() {
    let path="";

    switch(props.buttonsName){
      case "Send Request":
        path= "/friend/sendFriendRequest";
        break;
      
      case "Cancel Request":
        path= "/friend/cancelFriendRequest";
        break;
        
      default:
        path= "/friend/addFriend";
        break;
    }

    handleMutation(path,mutate);
  }

  function handleDeclineRequestButton(){
    let path= "/friend/declineRequest";
    handleMutation(path, declineRequestMutation);
    
  }

  

  return (
    <div className="actionCard">

      <div>
        <Contact
          key={props.count}
          fullName={props.firstname}
          number={props.number}
          userPic={props.userPic}
          displayNotifications={false}
          relation={{ receiver: "" }}
        />
        {props.buttonsName!="Accept Request" && <p>Pending</p>}
      </div>
      
      

      
    
      <CustomButton
        buttonName={isLoading ? <CircularProgress />: props.buttonsName}
        style={props.buttonClass}
        click={handleButtonClick}
        isdisabled={props.isdisabled}
      />

      {
        props.buttonsName==="Accept Request" &&

        <CustomButton
        buttonName={declineRequestIsLoading ? <CircularProgress />: "Decline"}
        style="cancelRequest"
        click={handleDeclineRequestButton}
        isdisabled={props.isdisabled}
      />

        
      }
    </div>
  );
}
