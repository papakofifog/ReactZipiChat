import React, { useEffect, useState } from 'react'
import Icon from './icons'
import Picker from '@emoji-mart/react'
import { UploadFile } from '@mui/icons-material'
import CustomButton from './buttons'


function Emoji(props) {
  return (
    <Picker data={props.emogiData} onEmojiSelect={(event)=>{
        props.select(event.native)
    }} />
  )
}

function FileUpload(props){
   


    return (
        <button>
            <div className={props.class}>
                
                <label htmlFor="getFile1"> {props.icon }</label>
                <input 
                type="file" 
                id="getFile1" 
                name="getFile1"
                className="hide" 
                onChange={(event)=>props.change(event)}
                />
                
            </div>
            
            
        
        
        </button>
        
    );
}

function RecordAudio(){
    let [record, updateRecord ] = useState(false)

    let startRecording = () => {
        updateRecord({ record: true });
    }

    let stopRecording = () => {
        updateRecord({ record: false });
    }

  

    return (

        <div>
            
      </div>
    );

}

export { Emoji, FileUpload, RecordAudio}