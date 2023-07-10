import './App.css'
import Header from './components/header/header';
import Main from './components/mainBody/mainBody';
import '@fontsource/roboto/300.css';
import { fetchData, fetchUserDataLocally} from './utility/handleAxiousRequest';
import { useEffect, useState } from 'react';

import { connectToSocket, emitEvent, socket } from './socket';





const SERVER= "http://localhost:3000"

function App() {
 
  const [response, setResponse] = useState({
    success: false,
    userFullname:'',
    userId:'',
    number:''
  });

  const [refresh, setRefresh]= useState(false);

  async function getActiveUser(){
    let Response= await fetchData("http://localhost:3000/users/activeUser");
    
    sessionStorage.setItem('activeUserName', Response.data.username);
    setResponse((prevResponse)=>{
      return {
        ...prevResponse,
        success: Response.success,
        userFullname: Response.data.firstname +' ' +Response.data.lastname,
        userId: Response.data.username
      }
    })
  }
  function ConnectWithChatServer(){
    return emitEvent('setUserId', response.userId)

  } 


  function handleRefresh(){
    
  }

  

  console.log(refresh)
    
 

  useEffect(()=>{
    getActiveUser();
    
  },response)
  


  return (
    <div className='App'>
      <Header fullName={response.userFullname} number={response.number} />
      <Main activeUser={response.userId} /> 
    </div>
     
  )
}

export default App
