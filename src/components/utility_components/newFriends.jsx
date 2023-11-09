import React, {useState} from "react";
import Search from "./search";
import { generateNewFriendsActionCardElementArray } from "./reactArrayElements";
import {
    getAllFriendRequest,
    getAllNonFriends,
  } from "../../appRequests/zipiChatApiQuery";
import { fetchZipiUserData } from "../../hooks/useZipiUserData";
import { FiSearch } from "react-icons/fi";

export function NonFriends(props){
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
    
    let usersNewFriends=searchQuery.searchCode.length?nonFriends?.data?.data.filter((friend)=> (friend?.firstname + " " + friend?.lastname).toString().toLowerCase().includes(searchQuery.searchCode)): nonFriends?.data?.data;
    
    let nonFriendElements = generateNewFriendsActionCardElementArray(usersNewFriends);

    //console.log(nonFriendElements)
    return (
        <>
            <Search 
            icon={<FiSearch />} 
             searchQuery={searchQuery.searchCode}
             change={handleChange} 
             />
             <div className="newFriendContainer">
             {nonFriendElements}
             </div>
            
        </>
        

    )
}

export function FriendRequest(){
    const {
        data: friendRequests,
        isLoading: friendRequetIsLoading,
        refetch: refetchFriendRequest,
      } = fetchZipiUserData("getFriendRequest", getAllFriendRequest);
    
      
    
      let userRequestElements = generateFriendRequestCardElementsList(
        friendRequests?.data?.data
      );

      return (
        <>
            <Search />
            {userRequestElements}
        </>
      )
}