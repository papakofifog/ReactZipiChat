import * as React from "react";
import '../../assets/css/authentication.css';

import {SignInWithGoogle } from "../authorization/continueWithGoogle";
import { SendData } from "../../utility/handleAxiousRequest";

import {mutateZipiUserData} from "../../hooks/mutateZipiUserData";
import { showToast } from "../../utility/showToast";
import CircularStatic from "../utility_components/circulatProgress";
import CustomButton from "../utility_components/buttons";

import { EmailOutlined,PasswordOutlined } from "@mui/icons-material";

export default function SignIn() {

  const [userCredentials, setUserCredentials] = React.useState({
    email:"",
    password:""
  });

  const [isSubmitting, setSubmitStatus]= React.useState(false);
  
  
  
  function handleInput(event){
      let {name, value} = event.target;
      setUserCredentials((prevValue)=>{
        return {...prevValue,[name]:value}})
  }

  async function handleSignInRequest(){
      let result= await SendData("/api/login", userCredentials);
      return result;
  }

  function handleSuccessEvent(data){
    try{
      showToast(data?.data.message,"green", true)
      sessionStorage.setItem("access-token", data?.data.token);
      setTimeout(history.pushState("/home"),4000);
    }catch(e){
      console.error(e)
    }
    
  }

  function handleFailedEvent(data){
    //console.log(data?.response.data.message)
    showToast(data?.response.data.message, "red", false);
    setSubmitStatus(false);
   
  }

  function handleMutation(mutateFunction){
    mutateFunction(
      {
        "email": userCredentials.email,
        "password": userCredentials.password
      }
    )

    
  }

  function handleFormReset(){
    setUserCredentials((prevValue)=>{
      return {...prevValue, email:"", password:""}
    })
  }

  

  const {mutate, isLoading }= mutateZipiUserData("signIn", handleSignInRequest, handleSuccessEvent, handleFailedEvent);

  React.useEffect(()=>{
    if(isSubmitting){
      handleMutation(mutate);
    }
    setSubmitStatus(false);
  }, [isSubmitting])

  return (
    

    <form className="formContainer">

      <div className="formInput">
        <label htmlFor="email">Email/Username</label>
        <span >
          <EmailOutlined className="authIcons" />
          <input 
          name="email" 
          type="email"
          onChange={handleInput}
          />
        </span>
        
      </div>

      <div className="formInput">
        <label htmlFor="password">Password</label>
        <span>
          <PasswordOutlined className="authIcons"/>
            <input 
          name="password" 
          type="password" 
          onChange={handleInput}
          />
        </span>
        
      </div>

      <div className="authActions">
        <CustomButton 
        style="button"
        buttonName={isLoading?<CircularStatic /> : "Sign In"}
        click={()=>{
          setSubmitStatus(true);
        }}
        isdisabled={isLoading}
        />

        <CustomButton 
        style="button"
        buttonName="forgot Password"
        click={()=>{
          window.location.href=""
        }}
        isdisabled={isLoading}
      />

        {/*<SignInWithGoogle className="googleButton" />*/}
      </div>

      

      

    </form>
  );
}
