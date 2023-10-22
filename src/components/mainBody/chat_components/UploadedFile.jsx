import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CircularStatic from "../../utility_components/circulatProgress";
import { CircularProgress } from "@mui/material";
import Image from "../../utility_components/image";
import mswordIcon from "../../../assets/svg/wordIcon.svg";
import pdfIcon from "../../../assets/svg/pdfIcon.svg";
import notePad from "../../../assets/svg/notepad.svg";

export default function DisplayUploadedFile(props) {
  
  let [fileloaded, setfileloading] = React.useState(true);

  let chosenCode;
  switch(props.fileType){
    case "application/pdf":
      chosenCode= <a target="_blank" href={props.fileUrl} type={props.fileType}>
        <Image src= {pdfIcon}/>
      </a>
    case "application/msword":
     chosenCode= <a target="_blank" href={props.fileUrl} type={props.fileType}>
        <Image src= {mswordIcon}/>
      </a>
      break;
    case "video/webm":
      chosenCode= <video controls>
        <source src={props.fileUrl} type="video/mp4" />
      </video>
      break;
    case "audio/wav":
    case "audio":
     chosenCode= <audio src={props.fileUrl} controls />;
      break;
    case "text/plain":
      chosenCode= <a target="_blank" href={props.fileUrl} type={props.fileType}>
          <Image src= {notePad}/>
        </a>;
      break;
    default:
      chosenCode= <img src={props.fileUrl} alt={props.fileName} />
      break;


  }
  return (
    <div className="uploadState">
      <div className="uploadPreview">
        {fileloaded && (
          <div className="fileLoadingOverlay">
            {" "}
              {props.fileIsBeingUploaded && <CircularProgress />}
            {" "}
          </div>
        )}
        {chosenCode}
      </div>
      <div className="uploadPreviewCloseButtonContainer">
        {props.close && props.fileUrl && (
          <button
            className="uploadPreviewCloseButton"
            onClick={(event) => props.cancelUplaod(event)}
            disabled={props.fileIsBeingUploaded}
          >
            <span>
              <CloseIcon  />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
