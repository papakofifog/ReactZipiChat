import React, { useEffect, useState } from "react";
import CustomButton from "./buttons";
import Contact from "../mainBody/chat_components/contacts";
import { SendData } from "../../utility/handleAxiousRequest";
import { showToast } from "../../utility/showToast";
import {mutateZipiUserData, } from "../../hooks/mutateZipiUserData";
import { refreshFetchedZipiUserData } from "../../hooks/useZipiUserData";
import { CircularProgress } from "@mui/material";
import { useQueryClient } from "../../App";

export default function ActionCards(props) {
  const {mutate, isLoading}= mutateZipiUserData("handleNewFriend", handleRequest, handleSuccess, handleFailure);
  const queryClient= useQueryClient();

  async function handleRequest(data){
    try{
      let receivedData = await SendData( data.path,data.data);
      return receivedData;
    }catch(e){
      throw e;
    }
  }

  function handleMutation(expectedPath){
    mutate({
      data:{
        friend: props.friendId
      },
      path:expectedPath
      
    })
  }

  function handleSuccess(data){
    showToast(data?.data?.message, "green", true);
    let dataToInvalidate=[];
    switch (props.buttonsName) {
      case "Accept Request":
        dataToInvalidate.push("UserContacts");
        dataToInvalidate.push("getAllFriendRequest");
        break;
      case "Send Request":
        dataToInvalidate.push("getNonFriends");
        break;
      case "Cancel Request":
        dataToInvalidate.push("getNonFriends");
        break;
    }
    queryClient.invalidateQueries(dataToInvalidate)
    //props.close();
    
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

    handleMutation(path);
  }

  

  return (
    <div className="actionCard">
      
      <Contact
        key={props.count}
        fullName={props.firstname}
        number={props.number}
        userPic={props.userPic}
        displayNotifications={false}
        relation={{ receiver: "" }}
      />

      
    
      <CustomButton
        buttonName={isLoading ? <CircularProgress />: props.buttonsName}
        style={props.buttonClass}
        click={handleButtonClick}
        isdisabled={props.isdisabled}
      />
    </div>
  );
}
