import './App.css'
import Header from './components/header/header';
import Main from './components/mainBody/mainBody';
import '@fontsource/roboto/300.css';
import { fetchData, fetchUserDataLocally} from './utility/handleAxiousRequest';
import { useEffect, useState, useContext } from 'react';
import { SocketContext,connection  } from './context/socket';
let client_id= import.meta.env.CLIENTID;




function App() {

  const [response, setResponse] = useState({
    success: false,
    userFullname:'',
    userId:'',
    number:'',
    firstname: '',
    lastname: '',
    Dob: '',
    pictures: ''
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
        firstname: Response.data.firstname,
        lastname:Response.data.lastname,
        userId: Response.data.username,
        number: Response.data.friendCount,
        Dob: Response.data.Dob,
        pictures: Response.data.pictures
      }
    })
  }

  function reRender(){
    updateCount((prevCount)=>prevCount+1);
  }
 

  useEffect(()=>{
    
    getActiveUser();

  },[count])

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: "+ response.credential)
  }


  

  
  return (
    <div className='App'>

      <SocketContext.Provider value={connection} >
        <Header fullName={response.userFullname} number={response.number} rerunMainpage={reRender} activeUserData={response}/>
        <Main activeUser={response.userId} count={count} /> 
      </SocketContext.Provider>
      
    </div>
     
  )
}

export default App
