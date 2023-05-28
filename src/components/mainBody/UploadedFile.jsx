import React from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function DisplayUploadedFile(props){
    let [code, setCode] = React.useState();

        let chosenCode;
        
        if(props.fileType == "application/pdf" || props.fileType== "application/custom" ){
            setCode(<a href={props.fileUrl} type={props.fileType}>Download PDF</a>)
        }else if(props.fileType== "video/mp4"){
            chosenCode= <video controls>
                    <source src={props.fileUrl} type="video/mp4" />
                </video>
        }else{
            chosenCode= <img src={props.fileUrl} alt={props.fileName} />
        }

        React.useEffect(()=>{
            setCode(()=>{
                return chosenCode;
            })
        }, [])
        console.log(code)
    return (
        <div className="uploadState">
            <div className="uploadPreview">{code}</div>
            {props.close && <div className="uploadPreviewCloseButtonContainer">
                <button className="uploadPreviewCloseButton"><faClose  /></button>
            </div>}
            
        </div>
    )

    
}