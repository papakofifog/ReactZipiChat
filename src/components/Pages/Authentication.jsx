import React, { useState } from "react";
import SignIn from "../authentication/signIn";
import SignUp from "../authentication/signUp";
import Image from "../utility_components/image";


import ZipiLogo from "../../assets/zipiLogo/1024.png";
import messageAppIllustration from "../../assets/svg/messageIlustration.svg";

export default function UserAuthentication(){
    const [dislaySignIn,changeAuthType ]= useState(true);
    const tabColor="selected";

    function handleChangeAuthType(state){
        changeAuthType(state);
    }

    return(

        <div className="authenticationContainer">

            <div className="sideIlustrationSection">

                <Image style={"illustration"} src={messageAppIllustration} />
                
            </div>
            <div>

                
                <div className="authenticationFormContainer">

                    <div className="appTradeMark">
                            <Image src={ZipiLogo} />
                            <h2>Zipi Chat Application</h2>
                    </div>


                        <ul className="authenticationSwitch">
                        <li className={dislaySignIn?tabColor:""}
                        onClick={()=>handleChangeAuthType(true)}

                        >Sign In</li>  
                        <li className={dislaySignIn?"":tabColor}
                        onClick={()=>handleChangeAuthType(false)}
                        >Sign Up</li>
                        </ul>

                        

                        {dislaySignIn? <SignIn /> : <SignUp/> }

                    


                    
                        

                    

                </div>


                
            </div>

        </div>
    )
}