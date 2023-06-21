import React from 'react';
import Icon from './icons';

export default function CustomButton(props){
    let content= props.icon? <Icon icon={props.icon} />: props.buttonName;
    return(
        <button
         className={props.style}
         onClick={()=>{
            ///console.log(props.id)
            ///console.log(props.click);
            props.id?props.click(props.id):props.click();
         }
            }
         disabled={props.isdisabled}
        >
            {content || props.childComponent}
        </button>
    );
}