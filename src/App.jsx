import './App.css'
import Header from './components/header/header';
import Main from './components/mainBody/mainBody';
import '@fontsource/roboto/300.css';
import { fetchData, fetchUserDataLocally} from './utility/handleAxiousRequest';
import { useEffect, useState } from 'react';
import { SocketContext, socket } from './context/socket';
let client_id= import.meta.env.CLIENTID;




function App() {
 
  const [response, setResponse] = useState({
    success: false,
    userFullname:'',
    userId:'',
    number:''
  });

  const[count, updateCount]=useState(0);


  

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

  function reRender(){
    updateCount((prevCount)=>prevCount+1);
  }
 

  useEffect(()=>{
    getActiveUser();
    
  },response)

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: "+ response.credential)
  }


 /* useEffect(()=>{
    /*global google
    google.accounts.id.initialize({
      client_id:client_id,
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme:"outline", size: "large"}
    )
  },[]);*/



  return (
    <div className='App'>

      <SocketContext.Provider value={socket} >
        <Header fullName={response.userFullname} number={response.number} rerunMainpage={reRender}/>
        <Main activeUser={response.userId} count={count} /> 
      </SocketContext.Provider>
      
    </div>
     
  )
}

export default App
