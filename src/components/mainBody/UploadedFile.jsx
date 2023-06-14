import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import CircularStatic from "../circulatProgress";


export default function DisplayUploadedFile(props){
    let [code, setCode] = React.useState();
    let [fileloaded, setfileloading]= React.useState(true);
    
    

        

        let chosenCode;
        
        if(props.fileType == "application/pdf" || props.fileType== "application/msword" ){
            chosenCode=<a href={props.fileUrl} type={props.fileType}>Download PDF</a>
        }else if(props.fileType== "video/webm"){
            chosenCode= <video controls>
                    <source src={props.fileUrl} type="video/mp4" />
                </video>
        }else{
            chosenCode= <img src={props.fileUrl} alt={props.fileName} />
        }

        
        //setCode(chosenCode);
        
        //console.log(code)
    function useProgress(fileloaded){
        setfileloading(fileloaded);
    }
    return (
        <div className="uploadState">
            
            <div className="uploadPreview">
            {fileloaded && <div className="fileLoadingOverlay"> <CircularStatic emitProgress={useProgress} />   </div>}
                {chosenCode}</div>
             <div className="uploadPreviewCloseButtonContainer">
                { props.close && props.fileUrl && <button className="uploadPreviewCloseButton" onClick={(event)=>props.cancelUplaod(event)}
                    ><span><CloseIcon  /></span></button>}
            </div>
            
        </div>
    )

    
}