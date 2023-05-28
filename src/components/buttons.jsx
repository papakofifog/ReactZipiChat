import React from 'react';
import Icon from './icons';

export default function CustomButton(props){
    let content= props.icon? <Icon icon={props.icon} />: props.buttonName;
    return(
        <button
         className={props.style}
         onClick={()=>{
            props.click(props.id)
         }
            }
         disabled={props.isdisabled}
        >
            {content}
        </button>
    );
}