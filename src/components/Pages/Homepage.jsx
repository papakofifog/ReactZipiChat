import "@fontsource/roboto/300.css";
import { useEffect, useState} from "react";
import {fetchData,} from "../../utility/handleAxiousRequest";
import { connection } from "../../context/socket";
import { fetchZipiUserData } from "../../hooks/useZipiUserData";

import Header from "../header/header";
import Main from "../mainBody/chat_components/mainBody";


export default function Homepage() {
  const [response, setResponse] = useState({
    success: false,
    userFullname: "",
    userId: "",
    number: "",
    firstname: "",
    lastname: "",
    Dob: "",
    pictures: "",
  });

  const [count, updateCount] = useState(0);
  let [displayMode, setDisplayMode] = useState(false);

  function handleDisplaySwitch(event) {
    setDisplayMode((prevValue) => !prevValue);
  }

  const fetchActiveUser = async (data) =>{
    return await fetchData("/users/activeUser", data);
  }

  

  function handleActiveDataTransformation(data){
    return {
      success: data?.data.success,
      userFullname: data?.data.firstname + " " + data?.data.lastname,
      firstname: data?.data.firstname,
      lastname: data?.data.lastname,
      userId: data?.data.username,
      number: data?.data.friendCount,
      Dob: data?.data.Dob,
      picture: data?.data.picture
    }
  }

  

    const fetchActiveUseBasicData = async ()=>{
      return await fetchData("/users/activeUser");
    }

    

    const {
      data,
      isLoading,
      isError,
      error,
      isFetching,
      refetch}= fetchZipiUserData("getActiveUserData", fetchActiveUseBasicData, handleActiveDataTransformation)

      
   
  async function getActiveUser() {
    if( isError){
      console.log(error)
    }else if(isLoading){
      console.log("Content Loading")
    }else{
      sessionStorage.setItem("activeUserName", data?.data.username);
      connection.emit("setUserId", data?.data.username);
    }

    
  }

  getActiveUser();

  return (
    <div className="App">
      {isError && <p>{error.message}</p>}

      {isLoading || isFetching && <p>Loading ...</p>}

      {/* <Header

        firstName={data?.data.firstname}
        number={data?.data.number}
        rerunMainpage={refetch}
        activeUserData={data || ''}
        displayMode={displayMode}
        handleDarkMode={handleDisplaySwitch}
      /> */}
      {/* <Main activeUser={data?.data.userId} count={count} /> */}
      
    </div>
  );
}
