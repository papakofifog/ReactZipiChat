import React from "react";
import CustomButton from "./buttons";
import Contact from "./mainBody/contacts";

export default function ActionCards(props){
    console.log(props.buttonName)
    return (
        <div className="actionCard">
            <Contact 
            key={props.count}  
            fullName={props.firstname} 
            number={props.number} 
            
            />
            <CustomButton 
            
            buttonName={props.buttonsName}
            style={props.buttonClass}
            click={props.buttonClick}
            isdisabled={props.isdisabled}
            
            />
        </div>
    );
}