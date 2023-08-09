import React ,{useEffect, useState} from "react";
import CustomButton from "../../buttons";
import { UpdateData } from "../../../utility/handleAxiousRequest";
import { showToast } from "../../../utility/showToast";

export default function PasswordReset(props){
    
    const [password, updatePassword]= useState({
        newPassword: "",
        confirmPassword: ""
    });

    

    

    function handleInputChange(event){
        let {name,value}= event.target;
        updatePassword(prevPassword=> {
            return {...prevPassword, [name]: value }
        })
    }

    async function handleUpdatePassword(){
        window.sessionStorage.setItem("access-token", props.user);
        let response= await UpdateData("http://localhost:3000/users/updateUsersPassword", {"password":password.newPassword});
        if(response.data.success){
            showToast("Your password has been reset succefully","green", true)
            window.sessionStorage.setItem("access-token", "");
            setTimeout(()=>{location.href="/"}, 2000);
        }else{
            showToast(response.data.message,"red", false)
        }
    
    }

    useEffect(()=>{
        
    }, [])

    return (
        
        <div className="container">
            <h2>Password Reset</h2>
            <div className="formInputs">
                <label htmlFor="newPassword">Enter your Password</label>
                <input 
                type="password" 
                id="newPassword" 
                name="newPassword" 
                onChange={handleInputChange}
                value={password.newPassword}
                required={true}
                />
            </div>
            

            <div className="formInputs">
                <label htmlFor="conformPassword">Confirm your Password</label>
                <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                onChange={handleInputChange}
                value={password.confirmPassword}
                required={true}
                />
            </div>

            <div style={{
                display:"flex",
                justifyContent: "space-evenly"

            }}>
                <CustomButton 
                buttonName="Submit"
                style="submit"
                click={handleUpdatePassword}
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