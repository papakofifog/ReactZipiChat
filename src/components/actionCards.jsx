import React, { useState } from "react";
import CustomButton from "./buttons";
import Contact from "./mainBody/contacts";
import { SendData } from "../utility/handleAxiousRequest";

export default function ActionCards(props){

    let [addFriendResponse, updateAddFriendResponse]= useState(null)

    async function sendAddfriendRequest(userId){

        let receivedData=await SendData("http://localhost:3000/friend/addFriend", {"friend":userId});
        updateAddFriendResponse(receivedData.data);

        if(addFriendResponse.status){
            showToast(addFriendResponse.message,"green", true)
            props.close();
            return 
        }else{
            showToast(addFriendResponse.message,"red", false)
            return
        }
    }


    async function handleButtonClick(){
        console.log(props.buttonsName)
        switch(props.buttonsName){
            case "Accept Request":
                console.log("hello we are here baby")
                await sendAddfriendRequest(props.friendId);
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