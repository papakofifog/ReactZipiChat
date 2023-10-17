import { React, useEffect, useState } from "react";

import "../../assets/css/header.css";
import ZipiLogo from "../../assets/zipiLogo/1024.png";

import Tabs from "./sectionTabs";
import Icon from "../utility_components/icons";
import Image from "../utility_components/image";
import LabelText from "../utility_components/label";
import Modal from "../utility_components/modal";
import ActionCards from "../utility_components/actionCards";
import { EditProfile } from "../mainBody/chat_components/editProfile";

import {MdPersonPin,MdSettings,MdCall,MdPersonAdd} from "react-icons/md";


import {DarkModeOutlined,LightModeOutlined,Logout,} from "@mui/icons-material";
import {  ProfileOutlined } from "@ant-design/icons";
import { fetchZipiUserData, fetchZipiUserDataFromMultipleSources } from "../../hooks/useZipiUserData";

import { generateFriendRequestCardElementsList, generateNewFriendsActionCardElementArray } from "../utility_components/reactArrayElements";
import { handleGetActiveUserPicture, getAllFriendRequest, getAllNonFriends, isLoggedOut } from "./headerRequests";

export default function Header(props) {
  
  let [ModalDetails, showModal] = useState({
    show: false,
    title: "",
    content: [],
    setting: {},
  });

  let [isListDisplayed, setdisplayListStatus] = useState(false);

  const {
    data:nonFriends,
    isLoading:nonFriendsLoading,
    refetch:refetchNonFriends}= fetchZipiUserData("getNonFriends", getAllNonFriends);

  const {
    data:friendRequests,
    isLoading:friendRequetIsLoading,
    refetch:refetchFriendRequest
  }= fetchZipiUserData("getFriendRequest", getAllFriendRequest);

  let nonFriendElements = generateNewFriendsActionCardElementArray(nonFriends?.data?.data);

  let userRequestElements = generateFriendRequestCardElementsList(friendRequests?.data?.data);

  function handleTabClickEvent(id) {
    let curDetails = "";
    switch (id) {
      case "contacts":
        curDetails = {
          title: "Send friend Request",
          content: nonFriendElements,
        };
        break;

      case "requests":
        curDetails = { title: "Accept Requests", content: userRequestElements };
        break;

      case "editProfile":
        curDetails = { title: "Edit Profile", content: [] };
        break;

      default:
        curDetails = { title: "Change your settings", content: [] };
        break;
    }

    showModal({ show: true, ...curDetails });
  }

  async function handleProfileDisplay() {
    let UserPicture = await handleGetActiveUserPicture();
    let curDetails = {
      title: "Edit Profile",
      content: [
        <EditProfile
          key={0}
          activeUserData={props.activeUserData}
          close={handleCloseEvent}
          activeUserPicture={UserPicture}
          rerun={handleActiveUserRefetch}
        />,
      ],
    };
    showModal({ show: true, ...curDetails });
  }

  function handleActiveUserRefetch() {
    props.refetchActiveUser();
  }

  async function handleCloseEvent(actualState) {
    switch (actualState) {
      case "Accept Request":
        await refetchFriendRequest();
        await refetchNonFriends();
        props.rerunMainpage();
        break;
      case "Send Request":
      case "Cancel Request":
        await refetchNonFriends();
        break;
      case "editProfile":
        props.rerunMainpage();
        break;
    }

    showModal((prevModalDetails) => {
      return { ...prevModalDetails, show: false, title: "", content: [] };
    });
  }

  useEffect(() => {
    //getAllNonFriends();
    getAllFriendRequest();
  }, []);

  let modal = ModalDetails.show ? (
    <Modal
      close={handleCloseEvent}
      title={ModalDetails.title}
      content={ModalDetails.content?.map((contact) => contact)}
    />
  ) : (
    ""
  );

  function handleDropDownDisplay() {
    setdisplayListStatus((prevStatus) => !prevStatus);
  }

  async function handleLogOut() {
    let result=await isLoggedOut();
    if(!result?.data){
      alert("Your request to logout of your account, is being processed!");
    }
    window.sessionStorage.setItem("access-token", "");
    setTimeout(() => {
      location.href="/"
    }, 1000);
  }

  return (
    <div className={!props.displayMode ? "headerLightMode" : "headerDarkMode"}>
      <div className="app-brand">
        <Image src={ZipiLogo} />
        <LabelText class={"brand"} text={"ZipiChat"} />
      </div>

      <div className="chatAction-section">
        <Tabs
          id="contacts"
          modal={ModalDetails}
          click={handleTabClickEvent}
          icon={<MdPersonAdd className="icon" />}
          class={"section-name"}
          text={"New Friends"}
        />

        <Tabs
          id="requests"
          modal={ModalDetails}
          click={handleTabClickEvent}
          icon={<MdPersonPin className="icon" />}
          class={"section-name"}
          text={"Requests"}
        />

        <Tabs
          id="settings"
          modal={ModalDetails}
          click={handleTabClickEvent}
          icon={<MdSettings className="icon" />}
          class={"section-name"}
          text={"Settings"}
        />
        {modal}
      </div>
      <div className="simpleActions-section">
        <Icon
          icon={
            props.displayMode ? (
              <LightModeOutlined
                style={{ color: "white" }}
                onClick={() => props.handleDarkMode()}
                className="icon"
              />
            ) : (
              <DarkModeOutlined
                style={{ color: "white" }}
                onClick={() => props.handleDarkMode()}
                className="icon"
              />
            )
          }
        />
        <Icon icon={<MdCall className="icon" id="myCall" />} />
      </div>
      <div className="profile" onClick={handleDropDownDisplay}>
        <div className="details">
          <p style={{ color: "#ccc", fontSize: "1.2rem" }}>
            {props.activeUserData?.firstname}{" "}
          </p>
        </div>
        <Image src={props.activeUserData?.picture} />
        <div className={isListDisplayed ? "dropDownList" : "hideDropdownlist"}>
          <div className="options" role="button" onClick={handleProfileDisplay}>
            <ProfileOutlined className="logOut" />
            Edit Profile
          </div>
          <div className="options" role="button" onClick={handleLogOut}>
            <Logout className="logOut" />
            Log Out
          </div>
        </div>
      </div>
    </div>
  );
}
