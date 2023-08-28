import React, { useEffect, useState } from "react";
import CustomButton from "./buttons";
import Contact from "../mainBody/chat_components/contacts";
import { SendData } from "../../utility/handleAxiousRequest";
import { showToast } from "../../utility/showToast";

export default function ActionCards(props) {
  let [dataResponse, updateDataResponse] = useState(null);
  let [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAddfriend() {
    let receivedData = await SendData(
      "http://localhost:3000/friend/addFriend",
      { friend: props.friendId }
    );

    updateDataResponse(receivedData.data);
    handleDisplayToast(
      receivedData.data.message,
      receivedData.data.success,
      "Accept Request"
    );
    setIsSubmitting(false);
  }

  async function handleSendRequest() {
    let friend = { friend: props.friendId };
    let receivedData = await SendData(
      "http://localhost:3000/friend/sendFriendRequest",
      friend
    );
    updateDataResponse(receivedData.data);
    handleDisplayToast(
      receivedData.data.message,
      receivedData.data.success,
      "Send Request"
    );
    setIsSubmitting(false);
  }

  async function handleCancelFriendRequest() {
    let friend = { friend: props.friendId };
    let receivedData = await SendData(
      "http://localhost:3000/friend/cancelFriendRequest",
      friend
    );
    updateDataResponse(receivedData.data);
    handleDisplayToast(
      receivedData.data.message,
      receivedData.data.success,
      "Send Request"
    );
    setIsSubmitting(false);
  }

  function handleDisplayToast(responseMessage, status, state) {
    //return showToast(dataResponse.message,"green", true)
    if (status) {
      showToast(responseMessage, "green", true);
      props.close(state);
    } else {
      showToast(responseMessage, "red", true);
    }
  }

  async function handleButtonClick() {
    setIsSubmitting(true);
  }

  useEffect(() => {
    const handleCallBack = async () => {
      if (isSubmitting) {
        switch (props.buttonsName) {
          case "Accept Request":
            await handleAddfriend();
            break;
          case "Send Request":
            await handleSendRequest();
            break;
          case "Cancel Request":
            await handleCancelFriendRequest();
            break;
        }
      }
    };
    handleCallBack();
  }, [isSubmitting]);

  return (
    <div className="actionCard">
      <Contact
        key={props.count}
        fullName={props.firstname}
        number={props.number}
        userPic={props.userPic}
        displayNotifications={false}
        relation={{ receiver: "" }}
      />
      <CustomButton
        buttonName={props.buttonsName}
        style={props.buttonClass}
        click={handleButtonClick}
        isdisabled={props.isdisabled}
      />
    </div>
  );
}
