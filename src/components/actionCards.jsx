import React, { useState } from "react";
import CustomButton from "./buttons";
import Contact from "./mainBody/contacts";
import { SendData } from "../utility/handleAxiousRequest";
import { showToast } from "../utility/showToast";

export default function ActionCards(props){

    let [AddFriendResponse, updateAddFriendResponse]= useState(null);
    let [acceptFriendResponse, updateAcceptFriendRequest]= useState(null);


    async function handleAddfriend(){

        let receivedData=await SendData("http://localhost:3000/friend/addFriend", {"friend":props.friendId});
        updateAddFriendResponse(receivedData);
        console.log(AddFriendResponse);
        if(AddFriendResponse.success){
            showToast(AddFriendResponse.message,"green", true)
            props.close();
            
        }else{
            showToast(AddFriendResponse.message,"red", false)
            
        }
        return;
    }

    async function handleSendRequest(){
        let friend= {"friend":props.friendId};
        console.log(friend)
        let receivedData= await SendData("http://localhost:3000/friend/sendFriendRequest", friend );
        updateAcceptFriendRequest(receivedData.data);
        console.log(acceptFriendResponse)
        if(acceptFriendResponse.success){
            showToast(acceptFriendResponse.message,"green", true)
            props.close();
            return 
        }else{
            showToast(acceptFriendResponse.message,"red", false)
            return
        }
    }


    async function handleButtonClick(){
        console.log(props.buttonsName)
        switch(props.buttonsName){
            case "Accept Request":
                console.log("hello we are here baby")
                await handleAddfriend();
                break;
            case "Send Request":
                await handleSendRequest();
                break;
        }

    }

    //console.log(props.buttonName)
    return (
        <div className="actionCard">
            <Contact 
            key={props.count}  
            fullName={props.firstname} 
            number={props.number} 
            
            />
            <CustomButton 
            
            buttonName={props.buttonsName}
            style={props.buttonClass}
            click={handleButtonClick}
            isdisabled={props.isdisabled}
            
            />
        </div>
    );
}