import React, { useEffect, useState, useReducer } from "react";
import "./main.css";
import Search from "../search";
import Contact from "./contacts";
import { SendData, fetchData } from "../../utility/handleAxiousRequest";
import { FiSearch } from "react-icons/fi";
import Chat from "./chat";

export default function Main(props) {
  const [response, setResponse] = useState({
    success: false,
    data: [],
  });

  const [conversations, setConvesations] = useState({
    success: false,
    data: [],
  });

  const [searchedContacts, setSearchedContacts] = useState({
    success: false,
    data: [],
  });

  const [relationship, setRelationship] = useState({
    sender: props.activeUser,
    receiver: "",
    usersActualName: "",
  });

  const [searchQuery, updateSearchQuery] = useState({
    searchCode: "",
  });

  const [selectReceipient, setSelectedReceipient] = useState("");

  const [buttonDisabledStatus, updateButtonDisabledStatus]= useState(true);

  async function handleRerender(newState) {
    newState && (await getAllConversations(relationship));
  }

  async function handleRelationshipUpdate(friendUsername, usersActualName) {
    setRelationship({
      sender: props.activeUser,
      receiver: friendUsername,
      usersActualName: usersActualName,
    });

    await getAllConversations({
      sender: props.activeUser,
      receiver: friendUsername,
    });

    handleDisableStatusUpdate();
  }

  function handleReceipientValueReset(){
    setSelectedReceipient('');
  }

  function handleDisableStatusUpdate(){
    updateButtonDisabledStatus(false);
  }

  async function getAllConversations(data) {
    let Response = await SendData(
      "http://localhost:3000/convo/readAllConvo",
      data
    );

    setConvesations((prevConversation) => {
      return {
        ...prevConversation,
        success: Response.data.success,
        data: Response.data.data,
      };
    });
  }

  async function handleSearchForFriendByName(event) {
    let { name, value } = event.target;

    updateSearchQuery((prevValue) => {
      return { ...prevValue, [name]: value };
    });

    returnSearchResults();
  }

  async function returnSearchResults() {
    try {
      let Response = await SendData(
        "http://localhost:3000/friend/searchUserFriendByName",
        { firstName: searchQuery.searchCode }
      );

      setSearchedContacts((prevResponse) => {
        return {
          ...prevResponse,
          success: Response.data.success,
          data: Response.data.data,
        };
      });
    } catch (e) {
      console.error(e);
    }
  }

  function IncreaseUnreadMessagesCount(receiver) {
    console.log("receiver: ", receiver)
    setSelectedReceipient(receiver);
  }

  useEffect(() => {
    getAllConversations(relationship);
  }, []);
  let friendListElements = searchQuery.searchCode
    ? searchedContacts.data.map((friendItem, index) => {
        return (
          <Contact
            key={index}
            fullName={friendItem.firstname + " " + friendItem.lastname}
            userPic={friendItem.userPic.userPicUrl}
            lastMessage="Are you home"
            lastMessageDate="Friday 2023"
            handleMessages={handleRelationshipUpdate}
            username={friendItem.username}
            activeUser={props.activeUser}
          />
        );
      })
    : response.data.map((friendItem, index) => {
        return (
          <Contact
            key={index}
            fullName={friendItem.firstname + " " + friendItem.lastname}
            userPic={friendItem.userPic.userPicUrl}
            lastMessage="Are you home"
            lastMessageDate="Friday 2023"
            handleMessages={handleRelationshipUpdate}
            updateDisabledStatus= {handleDisableStatusUpdate}
            username={friendItem.username}
            receipient={selectReceipient}
            activeUser={props.activeUser}
            conversations={conversations.data || null}
            updateSelectReceipient={handleReceipientValueReset}
            relation={relationship}
          />
        );
      });

  async function getAllContacts() {
    let Response = await fetchData(
      "http://localhost:3000/friend/getUsersFriends"
    );
    setResponse((prevResponse) => {
      return {
        ...prevResponse,
        success: Response.success,
        data: Response.data,
      };
    });
  }
  useEffect(() => {
    getAllContacts();
  }, [props.count]);

  return (
    <main>
      <div className="chat-content">
        <div className="contacts">
          <Search
            icon={<FiSearch className="icon white-color" />}
            searchQuery={searchQuery.searchCode}
            change={handleSearchForFriendByName}
          />

          <div className="contacts-container contact-list">
            {friendListElements.length ? friendListElements : ""}
          </div>
        </div>

        {conversations.success && (
          <Chat
            conversations={conversations.data || []}
            activeUser={props.activeUser}
            relation={relationship}
            update={handleRerender}
            disabledStatus={buttonDisabledStatus}
            onUpdateConversations={setConvesations}
            updateNotifications={IncreaseUnreadMessagesCount}
            updateSelectReceipient={setSelectedReceipient}
          />
        )}
      </div>
    </main>
  );
}
