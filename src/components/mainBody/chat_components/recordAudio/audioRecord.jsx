import React , {useState} from 'react';
import { useReactMediaRecorder } from "react-media-recorder";

import { IoIosMicrophone, IoIosMicOff, IoIosCheckboxOutline, IoIosArrowBack } from "react-icons/io";

function RecordMedia(props){
    // the record type is an objec that can have an attribute that is either video, audio, or screen
    
    let result= props.recordType==="audio"? {audio:true}: {video:true};


    const {status, startRecording, stopRecording, mediaBlobUrl} =useReactMediaRecorder({result})
    
   
    let activeClass='record';

    switch(status){
        
        case 'recording':
            activeClass='recording';
            break;

        default:
            activeClass='record';
            break;
        
    }

    function handleStopRecording(){
        stopRecording();
    }

    if(status == "stopped"){
        props.uploadAudioFile(mediaBlobUrl);
    }
    
    return (
        <div className='recordMedia'>

            <IoIosMicrophone  onClick={startRecording} className={activeClass} />
            <div className='audioButtons'>
                <IoIosMicOff onClick={handleStopRecording} fontSize={25} className={'action'}  /> 
                
            </div>
   
 
        </div>       
    )
                    
    
}

export{ RecordMedia }

