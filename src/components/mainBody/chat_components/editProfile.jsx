import React, { useEffect, useState } from "react";
import Image from "../../utility_components/image";
import { UpdateData, sendFormData } from "../../../utility/handleAxiousRequest";
import { showToast } from "../../../utility/showToast";
import { CallToAction, EditOutlined } from "@mui/icons-material";
import { FileUpload } from "../../utility_components/emoji";
import { mutateZipiUserData } from "../../../hooks/mutateZipiUserData";
import { CircularProgress } from "@mui/material";
import {
  handleUpdloadPictureToCloud,
  handleUpdateProfileData,
} from "../../../appRequests/zipiChatApiMutions";

export function EditProfile(props) {
  const [userProfile, updateProfileData] = useState(props.activeUserData);
  const [isReadyForSubmission, setReadyForSubmission] = useState(false);
  const [fileToUpload, setFileToUpload] = useState({
    name: "",
    size: "",
    type: "",
    url: props.activeUserPicture,
  });

  function onSuccess(data) {
    try {
      showToast(data?.data.message, "green", true);
      props.close("editProfile");
    } catch (e) {
      console.error(e);
    }
  }

  function onError(error) {
    try {
      showToast(error?.data?.message, "red", false);
      setReadyForSubmission((prevValue) => !prevValue);
    } catch (e) {
      console.error(e);
    }
  }

  const { mutate, isLoading, data } = mutateZipiUserData(
    "updateActiveUserData",
    handleUpdateProfileData,
    onSuccess,
    onError
  );

  function handleEditProfileDataUpdate(event) {
    let { name, value } = event.target;

    updateProfileData((prevProfileData) => {
      return { ...prevProfileData, [name]: value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    mutate({
      firstname: userProfile.firstname,
      lastname: userProfile.lastname,
      Dob: userProfile.Dob,
    });
  }

  function uploadToCloudSuccess(data) {
    console.log(data);
    let { url, original_filename, fileType } = data?.data.data || null;
    updateProfilePictureData({ picURL: url });
    setFileToUpload(() => {
      return {
        name: original_filename,
        type: fileType,
        url: url,
      };
    });
  }

  function uploadToCloudFailure(data) {
    console.log(data);
  }

  const {
    mutate: mutatePictureToCloud,
    isLoading: uploadPictureToCloudIsLoading,
  } = mutateZipiUserData(
    "uploodPictureToCloud",
    handleUpdloadPictureToCloud,
    uploadToCloudSuccess,
    uploadToCloudFailure
  );

  async function uploadFunctionCloudinary(value) {
    try {
      let formData = new FormData();
      formData.append("file", value);
      mutatePictureToCloud(formData);
    } catch (e) {
      console.error(e);
    }
  }

  function onUpdateProfilePicture(data) {
    console.log(data);
    showToast(data?.data.message, "green", true);
    props.rerun();
  }

  function onUpdateProfilePictureFailure(data) {
    console.log(data);
    showToast(data?.data.message, "red", false);
  }

  const { mutate: mutateProfilePicture } = mutateZipiUserData(
    "profileUpdate",
    handleProfileUpdateRequest,
    onUpdateProfilePicture,
    onUpdateProfilePictureFailure
  );

  async function handleProfileUpdateRequest(data) {
    try {
      let response = await UpdateData("/users/updatePicture", data);
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  function updateProfilePictureData(data) {
    mutateProfilePicture(data);
  }

  async function handleInputFileChangeEvent(event) {
    let { files } = event.target;
    await uploadFunctionCloudinary(files[0]);
  }

  return (
    <div className="form-container">
      <div className="editProfile">
        {uploadPictureToCloudIsLoading ? (
          <CircularProgress />
        ) : (
          <Image
            style="editImage"
            src={fileToUpload.url || props.activeUserData?.picture}
            children={
              <div className="editProfileImageUploadButton">
                {" "}
                <FileUpload
                  id="attatchFile"
                  style={{ borderRadius: "50%" }}
                  icon={<EditOutlined style={{ color: "black" }} />}
                  change={handleInputFileChangeEvent}
                />
              </div>
            }
          />
        )}

        <p>Upload Files below 5MB</p>
      </div>

      <form action="" className="formStructure">
        <div className="edit-form">
          <div className="form-input-section">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              onChange={handleEditProfileDataUpdate}
              value={userProfile.firstname}
            />
          </div>

          <div className="form-input-section">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              onChange={handleEditProfileDataUpdate}
              value={userProfile.lastname}
            />
          </div>

          <div className="form-input-section">
            <label htmlFor="Dob">Date Of Birth</label>
            <input
              type="date"
              name="Dob"
              id="Dob"
              onChange={handleEditProfileDataUpdate}
              value={userProfile.Dob}
            />
          </div>
        </div>

        <div className="form-input-section">
          <input
            type="submit"
            name={isLoading ? <CircularProgress /> : "Submit"}
            onClick={handleSubmit}
            className="acceptRequest"
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
}
