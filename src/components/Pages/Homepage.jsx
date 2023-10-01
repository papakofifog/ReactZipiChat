import "@fontsource/roboto/300.css";
import { useEffect, useState} from "react";
import {fetchData} from "../../utility/handleAxiousRequest";
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
    try{
      let actualData=data?.data.data;
      return {
        success: actualData.success,
        userFullname: actualData.firstname + " " + actualData.lastname,
        firstname: actualData.firstname,
        lastname: actualData.lastname,
        userId: actualData.username,
        number: actualData.friendCount,
        Dob: actualData.Dob,
        picture: actualData.picture
      }
    }catch(e){
      console.error(e)
    }
    
  }

  

    const fetchActiveUserBasicData = async ()=>{
      try{
        let data=await fetchData("/users/activeUser");
        return data;
      }catch(e){
        console.error(e)
      }
      

    }
    const {
      data,
      isLoading,
      isError,
      error,
      isFetching,
      refetch}= fetchZipiUserData("getActiveUserData", fetchActiveUserBasicData)

      
   
  function getActiveUser() {
    if( isError){
      console.log(error)
    }else if(isLoading){
      console.log("Content Loading")
    }else{
      console.log(data?.data.data);
      sessionStorage.setItem("activeUserName", data?.data.data.username);
      connection.emit("setUserId", data?.data.data.username);
    }

    
  }

  

  useEffect(()=>{
    getActiveUser();
  }, [])

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
      {/*<Main 

      activeUser={data?.data.userId} 
      count={count} 
      /> */}
      
    </div>
  );
}
