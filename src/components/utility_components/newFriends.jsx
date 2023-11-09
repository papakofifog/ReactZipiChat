import React, {useState} from "react";
import Search from "./search";
import { generateNewFriendsActionCardElementArray, generateFriendRequestCardElementsList } from "./reactArrayElements";
import {
    getAllFriendRequest,
    getAllNonFriends,
  } from "../../appRequests/zipiChatApiQuery";
import { fetchZipiUserData } from "../../hooks/useZipiUserData";
import { FiSearch } from "react-icons/fi";

export default function NewFriends(props){
    const [searchQuery, setSearchQuery]= useState({
        searchCode:""
       })

       function handleChange(event){
        let {name,value}=event.target;
        setSearchQuery((prevValue)=>{
          return {...prevValue, [name]:value}
        })
     }

       const {
        data: nonFriends,
        isLoading: nonFriendsLoading,
        refetch: refetchNonFriends,
      } = fetchZipiUserData("getNonFriends", getAllNonFriends);

      const {
        data: friendRequests,
        isLoading: friendRequetIsLoading,
        refetch: refetchFriendRequest,
      } = fetchZipiUserData("getFriendRequest", getAllFriendRequest);
    
    let usersNewFriends=searchQuery.searchCode.length?nonFriends?.data?.data.filter((friend)=> (friend?.firstname + " " + friend?.lastname).toString().toLowerCase().includes(searchQuery.searchCode)): nonFriends?.data?.data;
    let usersFriendRequests=searchQuery.searchCode.length?friendRequests?.data?.data.filter((friendRequest)=> (friendRequest?.firstname + " " + friendRequest?.lastname).toString().toLowerCase().includes(searchQuery.searchCode)): nonFriends?.data?.data;
    
    
    let nonFriendElements = generateNewFriendsActionCardElementArray(usersNewFriends);
    let userRequestElements = generateFriendRequestCardElementsList(usersFriendRequests);

    
    return (
        <>
            <Search 
            icon={<FiSearch />} 
             searchQuery={searchQuery.searchCode}
             change={handleChange} 
             />
             <div className="newFriendContainer">
             {props.type=== "nonFriend"?nonFriendElements:userRequestElements}
             </div>
            
        </>
        

    )
}
