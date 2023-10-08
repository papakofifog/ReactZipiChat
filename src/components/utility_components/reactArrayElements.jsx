import ActionCards from "./actionCards";


export function generateNewFriendsActionCardElementArray(data){
   return data?.map((nonFriend, index) => {
    return (
      <ActionCards
        key={index}
        firstname={nonFriend.firstname}
        number="+233552661939"
        buttonsName={
          nonFriend.isRequestSent ? "Cancel Request" : "Send Request"
        }
        friendId={nonFriend.username}
        requestSent={nonFriend.isRequestSent}
        //close={handleCloseEvent}
        buttonClass={nonFriend.isRequestSent ? "cancelRequest" : "sendRequest"}
        //userPic={nonFriend.userPic.userPicUrl}
      />
    );
  }); 
}

export function generateFriendRequestCardElementsList(data){
    return data?.map(
        (friendRequest, index) => {
          return (
            <ActionCards
              key={index}
              firstname={friendRequest.firstname}
              number="+233552661939"
              buttonsName="Accept Request"
              //close={handleCloseEvent}
              friendId={friendRequest.username}
              buttonClass="acceptRequest"
              userPic={friendRequest.userPic.userPicUrl}
            />
          );
        }
      );
}


