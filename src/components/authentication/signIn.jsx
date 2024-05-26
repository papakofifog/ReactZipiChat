import * as React from "react";
import '../../assets/css/authentication.css';

import {SignInWithGoogle } from "../authorization/continueWithGoogle";
import { SendData } from "../../utility/handleAxiousRequest";

import {mutateZipiUserData} from "../../hooks/mutateZipiUserData";
import { showToast } from "../../utility/showToast";
import CircularStatic from "../utility_components/circulatProgress";
import CustomButton from "../utility_components/buttons";

import { EmailOutlined,PasswordOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import {zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../../utility/schemas";



export default function SignIn() {

  const userCredentials={
    email:"",
    password:""
  }
  
  const {register, handleSubmit, control, formState}= useForm({defaultValues:userCredentials, resolver:zodResolver(signInSchema)});
  const {mutate, isLoading }= mutateZipiUserData("signIn", handleSignInRequest, handleSuccessEvent, handleFailedEvent);
  
  const {errors} = formState;
  
  async function handleSignInRequest(data){
      let result= await SendData("/api/login", data );
      return result;
  }

  function handleSuccessEvent(data){
    try{
      showToast(data?.data.message,"green", true)
      sessionStorage.setItem("access-token", data?.data.token);
      setTimeout(location.href="/home",4000);
    }catch(e){
      console.error(e)
    }
    
  }

  function handleFailedEvent(data){
    showToast(data?.response.data.message, "red", false);
  }

  function handleSendForm(formValues){
    mutate(
      {
        ...formValues
      }
    )
  }

  return (
    

    <form onSubmit={handleSubmit(handleSendForm)} className="formContainer">

      <div className="formInput">
        <label htmlFor="email">Email/Username</label>
        <div style={{display:"flex", flexDirection:"column"}}>
          <span style={{display:"flex", flexDirection:"row"}} >
            <EmailOutlined className="authIcons" />
            <input 
            name="email" 
            type="email"
            //onChange={handleInput}
            {...register("email")}
            />
            
          </span>
          <div style={{color:"red"} }>{errors.email?.message}</div>
        </div>  
      </div>
    
      <div className="formInput">
        <label htmlFor="password">Password</label>
        <div style={{display:"flex", flexDirection:"column"}}>
          <span style={{display:"flex", flexDirection:"row"}}>
            <PasswordOutlined className="authIcons"/>
              <input 
            name="password" 
            type="password" 
            //onChange={handleInput}
            {...register("password")}
            />
            
          </span>
          <div style={{color:"red"}}>{errors.password?.message}</div>
        </div>
        
      </div>
      
      <div className="authActions">
      
        <input 
        className="button"
        type="submit" 
        name={isLoading?<CircularStatic /> : "Sign In"}
        disabled={isLoading}
        />
        
        <CustomButton 
        style="button"
        buttonName="forgot Password"
        click={()=>{
          window.location.href=""
        }}
        />

        {/*<SignInWithGoogle className="googleButton" />*/}
      </div>

    </form>
  );
}
