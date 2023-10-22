import "@fontsource/roboto/300.css";
import { useEffect, useState} from "react";

import { connection } from "../../context/socket";
import { fetchZipiUserData } from "../../hooks/useZipiUserData";
import {fetchActiveUserBasicData} from "../../appRequests/zipiChatApiQuery"

import Header from "../header/header";
import Main from "../mainBody/chat_components/mainBody";

export default function Homepage() {
  let [displayMode, setDisplayMode] = useState(false);
  function handleDisplaySwitch() {
    setDisplayMode((prevValue) => !prevValue);
  }
  const {data,isLoading,isError,error,isFetching,refetch}= fetchZipiUserData("getActiveUserData", fetchActiveUserBasicData)
  useEffect(()=>{
    if( isError){
      console.log(error)
    }else if(isLoading){
      console.log("Content Loading")
    }else{
      console.log("hello papa")
      connection.emit("setUserId", data?.data.data?.username);
      sessionStorage.setItem("activeUserName", data?.data.data.username);
    }
  }, [data?.data.data?.username])
  return (
    <div className="App">
      {isError && <p>{error.message}</p>}

      {isLoading || isFetching && <p>Loading ...</p>}
      <Header
        refetchActiveUser={refetch}
        activeUserData={data?.data.data}
        displayMode={displayMode}
        handleDarkMode={handleDisplaySwitch}
      /> 
      <Main 
      activeUser={data?.data.data.username} 
      count={0} 
      />
    </div>
  );
}
