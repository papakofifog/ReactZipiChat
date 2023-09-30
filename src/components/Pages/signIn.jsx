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

  function handleSignInRequest(){
    try{
      let result= SendData("/api/login");
      return result;
    }catch(e){
      console.error(e)
      return e;
    }
  }

  function handSuccessEvent(data){
    showToast(data?.message, 'green', true);
    //setTimeout(window.location.href="/home",3000);
  }

  function handleFailedEvent(data){
    showToast(data?.message);
  }

  function handleMutation(mutateFunction){
    mutateFunction(
      {
        "email": userCredentials.email,
        "password": userCredentials.password
      }
    )
  }

  console.log(userCredentials)

  function handleFormReset(){
    setUserCredentials({
      email:'',
      password:''
    })
  }

  

  const {mutate, isLoading, }= mutateZipiUserData("signIn", handleSignInRequest, handSuccessEvent, handleFailedEvent);

  React.useEffect(()=>{
    if(isSubmitting){
      handleMutation(mutate);
    }
    setSubmitStatus(false);
  }, [isSubmitting, mutate])

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
        buttonName={isLoading?<CircularStatic /> : "forgot Password"}
        click={()=>{
          setSubmitStatus(true);
        }}
        isdisabled={isLoading}
        />

        {/*<SignInWithGoogle className="googleButton" />*/}
      </div>

      

      

    </form>
  );
}
