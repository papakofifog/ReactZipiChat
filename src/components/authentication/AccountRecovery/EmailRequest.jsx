import React ,{useEffect, useState} from "react";
import CustomButton from "../../buttons";
import { showToast } from "../../../utility/showToast";
import {SendData} from "../../../utility/handleAxiousRequest";

export default function EmailRequest(){
    const [emailValue, updateEmailValue]= useState('');
    const [readyForSubmit, setSubmitStatus]= useState(false);
    const [errors, setError]= useState({
        status:false,
        message:""
    });
    const validEmailRegex= RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    function handleInputChange(event){
        let {value}= event.target;
        updateEmailValue(value);

        verifyEmail(value);
    }

    function verifyEmail(email){
        let message="";
        if(email.length==0){
            message= "Email field required.";
        }
        if(!validEmailRegex.test(email)){
            message ="Invalid Email provided";
        }
        setError((prevValue)=>{
            return {...prevValue, message: message}
        })
        
    }

    async function handleSendEmailVerification(){

        let response = await SendData("http://localhost:3000/email/sendEmail", {"email": emailValue} );

        if(response.data.success){
            showToast(response.data.message, "green", true);
        }else{
            showToast(response.data.message, "red", false);
            setSubmitStatus(false);
        }
    }

    useEffect(()=>{
        if(readyForSubmit && !errors.message){
            handleSendEmailVerification();
        }else{
            setSubmitStatus(false);
        }
    })

    return (
        <div className="container">
            <h2>Verify Your Identity </h2>
            <div className="formInputs">
                <label htmlFor="email">Enter your Email</label>
                <input 
                type="email" 
                id="email" 
                name="email" 
                onChange={handleInputChange}
                value={emailValue}
                required={true}
                />
                {errors.message!="" && <p style={{color:"red"}}>{errors.message}</p>}
            </div>
            <div style={{
                display:"flex",
                justifyContent: "space-evenly"

            }}>
                <CustomButton 
                buttonName="Submit"
                style="submit"
                click={()=>{setSubmitStatus(true)}}
                />

                <CustomButton 
                buttonName="Cancel"
                style="submit"
                click={()=>{window.location.href="/"}}
                />
            </div>
        </div>
    );
}

