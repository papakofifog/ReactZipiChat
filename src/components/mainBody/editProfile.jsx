import React , {useEffect,useState} from "react";
import Image from "../image";
import { SendData, UpdateData } from "../../utility/handleAxiousRequest";
import { showToast } from "../../utility/showToast";

export function EditProfile(props){

    const [userProfile, updateProfileData]= useState(props.activeUserData);
    const [isReadyForSubmission, setReadyForSubmission]= useState(false);

    async function handleUpdateProfileData(){
        
        let data={
                firstname:userProfile.firstname,
                lastname: userProfile.lastname,
                Dob:userProfile.Dob
            }

        let Response= await UpdateData("http://localhost:3000/users/editProfile", data)

        if (Response.data.success){
            console.log(Response.data.message);
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

    useEffect(()=>{
        if (isReadyForSubmission){
            handleUpdateProfileData();
        }
    }, [isReadyForSubmission])
    

    return (
        <div className="form-container">
            <div className="editProfile">
            <Image src={"src"} />
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
                        <input type="submit" name="Submit" onClick={handleSubmit} />
                </div>
                
            </form>
            

        </div>
    );
}