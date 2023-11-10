import React, {useState} from "react";
import Search from "./search";
import { generateNewFriendsActionCardElementArray, generateFriendRequestCardElementsList } from "./reactArrayElements";
import {getAllFriendRequest, getAllNonFriends } from "../../appRequests/zipiChatApiQuery";
import { fetchZipiUserData } from "../../hooks/useZipiUserData";
import { FiSearch } from "react-icons/fi";
import { CircularProgress } from "@mui/material";

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
      } = fetchZipiUserData(props.type==="nonFriend"?"getNonFriends":"getFriendRequest",props.type==="nonFriend"? getAllNonFriends:getAllFriendRequest);
    
      let usersNewFriends=searchQuery.searchCode.length?nonFriends?.data?.data.filter((friend)=> (friend?.firstname + " " + friend?.lastname).toString().toLowerCase().includes(searchQuery.searchCode.toLowerCase())): nonFriends?.data?.data;
      let nonFriendElements = props.type==="nonFriend"?generateNewFriendsActionCardElementArray(usersNewFriends): generateFriendRequestCardElementsList(usersNewFriends);
    
    return (
        <>
            <Search 
            icon={<FiSearch />} 
             searchQuery={searchQuery.searchCode}
             change={handleChange} 
             />
             <div className="listContainer">
    
             {nonFriendsLoading?<CircularProgress />:nonFriendElements}
            
             </div>
            
        </>
      
    )
}
