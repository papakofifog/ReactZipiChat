import "@fontsource/roboto/300.css";
import { useEffect, useState} from "react";
import {fetchData} from "../../utility/handleAxiousRequest";
import { connection } from "../../context/socket";
import { fetchZipiUserData } from "../../hooks/useZipiUserData";

import Header from "../header/header";
import Main from "../mainBody/chat_components/mainBody";


export default function Homepage() {
  
  let [displayMode, setDisplayMode] = useState(false);

  function handleDisplaySwitch() {
    setDisplayMode((prevValue) => !prevValue);
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

      
   
  function saveActiveUsername() {
    if( isError){
      console.log(error)
    }else if(isLoading){
      console.log("Content Loading")
    }else{
      sessionStorage.setItem("activeUserName", data?.data.data.username);
      connection.emit("setUserId", data?.data.data.username);
    }

    
  }

  useEffect(()=>{
    saveActiveUsername();
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
