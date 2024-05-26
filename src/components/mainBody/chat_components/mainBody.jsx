import React, { useEffect, useState } from "react";

import "../../../assets/css/main.css";
import { FiSearch } from "react-icons/fi";

import { fetchZipiUserData } from "../../../hooks/useZipiUserData";
import { mutateZipiUserData } from "../../../hooks/mutateZipiUserData";
import {getAllContacts,} from "../../../appRequests/zipiChatApiQuery";
import {getAllConversations } from "../../../appRequests/zipiChatApiMutions";

import Search from "../../utility_components/search";
import Contact from "./contacts";
import Chat from "./chat";


export default function Main(props) {
  const [conversations, setConvesations] = useState({
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

  const [buttonDisabledStatus, updateButtonDisabledStatus] = useState(true);

  async function handleRerender(newState) {
    newState && (await getAllConversations(relationship));
  }

  const {
    data: UserContactList,
    isLoading: userContactListLoading,
    isError,
    Error,
  } = fetchZipiUserData("UserContacts", getAllContacts);

  const {
    mutate: generateUserConversation,
    data: UserConversations,
    isLoading: useConversationsLoading,
  } = mutateZipiUserData("userConversations", getAllConversations);

  async function handleRelationshipUpdate(friendUsername, usersActualName) {
    setRelationship({
      sender: props.activeUser,
      receiver: friendUsername,
      usersActualName: usersActualName,
    });

    await generateUserConversation({
      receiver: friendUsername,
    });

    handleDisableStatusUpdate();
  }

  function handleReceipientValueReset() {
    setSelectedReceipient("");
  }

  function handleDisableStatusUpdate() {
    updateButtonDisabledStatus(false);
  }

  async function handleSearchForFriendByName(event) {
    let { name, value } = event.target;

    updateSearchQuery((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function IncreaseUnreadMessagesCount(receiver) {
    setSelectedReceipient(receiver);
  }

  useEffect(() => {
    //getAllConversations(relationship);
  }, [conversations, searchQuery]);

  const zipiUserContacts = UserContactList?.data?.data || [];

  let friendListElements = searchQuery.searchCode.length
    ? zipiUserContacts.map((friendItem, index) => {
        if (
          (friendItem?.firstname + " " + friendItem?.lastname)
            .toString()
            .toLocaleLowerCase()
            .includes(searchQuery.searchCode.toLowerCase())
        ) {
          return (
            <Contact
              key={index}
              fullName={friendItem.firstname + " " + friendItem.lastname}
              userPic={friendItem.userPic.userPicUrl || ""}
              handleMessages={handleRelationshipUpdate}
              updateDisabledStatus={handleDisableStatusUpdate}
              username={friendItem.username}
              receipient={selectReceipient}
              activeUser={props.activeUser}
              conversations={conversations.data || null}
              updateSelectReceipient={handleReceipientValueReset}
              relation={relationship}
              displayNotifications="true"
            />
          );
        }
      })
    : zipiUserContacts.map((friendItem, index) => {
        return (
          <Contact
            key={index}
            fullName={friendItem.firstname + " " + friendItem.lastname}
            userPic={friendItem.userPic.userPicUrl || ""}
            handleMessages={handleRelationshipUpdate}
            updateDisabledStatus={handleDisableStatusUpdate}
            username={friendItem.username}
            receipient={selectReceipient}
            activeUser={props.activeUser}
            conversations={UserConversations?.data?.data || []}
            updateSelectReceipient={handleReceipientValueReset}
            relation={relationship}
            displayNotifications="true"
          />
        );
      });

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
            {userContactListLoading
              ? "Contacts Loading ..."
              : friendListElements}
          </div>
        </div>

        {
          <Chat
            conversations={UserConversations?.data?.data || []}
            activeUser={props.activeUser}
            relation={relationship}
            update={handleRerender}
            disabledStatus={buttonDisabledStatus}
            onUpdateConversations={generateUserConversation}
            updateNotifications={IncreaseUnreadMessagesCount}
            updateSelectReceipient={setSelectedReceipient}
          />
        }
      </div>
    </main>
  );
}
