import React , {useEffect,useState} from "react";
import Image from "../image";
import { SendData, UpdateData, sendFormData, fetchData } from "../../utility/handleAxiousRequest";
import { showToast } from "../../utility/showToast";
import { Edit, EditOutlined, EditRoadOutlined } from "@mui/icons-material";
import { EditFilled } from "@ant-design/icons";
import {FileUpload} from "../emoji";
import Icon from '../icons';


export function EditProfile(props){

    const [userProfile, updateProfileData]= useState(props.activeUserData);
    const [isReadyForSubmission, setReadyForSubmission]= useState(false);
    const [fileToUpload,setFileToUpload] = useState({
        name:'',
        size:'',
        type:'',
        url:props.activeUserPicture,
    })
    async function handleUpdateProfileData(){
        let data={
                firstname:userProfile.firstname,
                lastname: userProfile.lastname,
                Dob:userProfile.Dob
            }

        let Response= await UpdateData("http://localhost:3000/users/editProfile", data)

        if (Response.data.success){
            showToast(Response.data.message,"green",true);
            props.close("editProfile");
        }else{
            showToast(Response.data.message,"red", false)
            setReadyForSubmission((prevValue)=>!prevValue)
        }
    }

    function handleEditProfileDataUpdate(event){
        let {name, value}=event.target;

        updateProfileData((prevProfileData)=>{
            return {...prevProfileData, [name]:value}
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        setReadyForSubmission((prevValue)=>!prevValue);
    }

    async function uploadFunctionCloudinary(value){

        try{
            let formData= new FormData();
            formData.append('file', value);
            let uploadedFileData= await sendFormData("http://localhost:3000/users/upload", formData);
            let CloudinaryFileData=uploadedFileData.data;
            if(CloudinaryFileData.success){
                let { url, original_filename, fileType} = CloudinaryFileData.data;
                
                return {url, original_filename, fileType}
    
            } 
            return null;
        }catch(e){
            console.error(e)
        }
        
        
    }

    async function handleInputFileChangeEvent(event){
        let { files }= event.target;
        let {url, original_filename, fileType}= await uploadFunctionCloudinary(files[0]);
        let Response= await UpdateData("http://localhost:3000/users/updatePicture", {picURL:url});
        if(Response.data.success){
            showToast(Response.data.message, "green", true);
            props.rerun(); 
        }else{
            showToast(Response.data.message, "red", false);
        }
        setFileToUpload(()=>{
            return {
                name:original_filename,
                type:fileType,
                url:url,
            }
        })

    }


    useEffect(()=>{
        if (isReadyForSubmission){
            handleUpdateProfileData();
        }
    }, [isReadyForSubmission])
    

    return (
        <div className="form-container">
            <div className="editProfile">
            <Image style="editImage" src={fileToUpload.url} children={<div className="editProfileImageUploadButton"> <FileUpload 
                                    id="attatchFile" 
                                    style={{borderRadius:"50%"}}
                                    icon={<EditOutlined style={{color:"black"}} />} 
                                    change={handleInputFileChangeEvent}
                                    /></div>} />
            
            <p>Upload Files below 5MB</p>
            </div>

            <form action="" className="formStructure"  >
                <div className="edit-form">
                    <div className="form-input-section">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" name="firstname" id="firstname" onChange={handleEditProfileDataUpdate}  value={userProfile.firstname} />
                    </div>

                    <div className="form-input-section">
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" name="lastname" id="lastname" onChange={handleEditProfileDataUpdate} value={userProfile.lastname} />
                    </div>

                    <div className="form-input-section">
                        <label htmlFor="Dob">Date Of Birth</label>
                        <input type="date" name="Dob" id="Dob" onChange={handleEditProfileDataUpdate} value={userProfile.Dob} />
                    </div>

                    
                </div>

                <div className="form-input-section">
                        <input type="submit" name="Submit" onClick={handleSubmit} className="acceptRequest"/>
                </div>
                
            </form>
            

        </div>
    );
}