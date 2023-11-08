import { useState } from "react";
import ActionCards from "./actionCards";
import Search from "./search";

import { FiSearch } from "react-icons/fi";


export function generateNewFriendsActionCardElementArray(data, handleCloseEvent){
   const [searchQuery, setSearchQuery]= useState({
    searchCode:""
   })

   function handleChange(event){
      let {name,value}=event.target;
      setSearchQuery((prevValue)=>{
        return {...prevValue, [name]:value}
      })
   }
   let nonFriends=data?.map((nonFriend, index) => {
        <ActionCards
          key={index}
          firstname={nonFriend.firstname}
          number="+233552661939"
          buttonsName={
            nonFriend.isRequestSent ? "Cancel Request" : "Send Request"
          }
          friendId={nonFriend.username}
          requestSent={nonFriend.isRequestSent}
          close={handleCloseEvent}
          buttonClass={nonFriend.isRequestSent ? "cancelRequest" : "sendRequest"}
          //userPic={nonFriend.userPic.userPicUrl}
          
        />
      
  }); 
  let resultatArray=[];
  resultatArray.push(<Search
    icon={<FiSearch className="icon white-color" />}
    searchQuery={searchQuery.searchCode}
    change={handleChange}
  />)
  resultatArray.push(nonFriends)
  return (
    {resultatArray}
  )
}

export function generateFriendRequestCardElementsList(data){
    return data?.map(
        (friendRequest, index) => {
          return (
            <ActionCards
              key={index}
              firstname={friendRequest.firstname}
              number="+233552661939"
              buttonsName="Accept Request"
              //close={handleCloseEvent}
              friendId={friendRequest.username}
              buttonClass="acceptRequest"
              userPic={friendRequest.userPic.userPicUrl}
              
            />
          );
        }
      );
}


