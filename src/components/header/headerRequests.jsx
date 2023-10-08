import { SendData, fetchData } from "../../utility/handleAxiousRequest";

export async function handleGetActiveUserPicture() {
    try {
      let Response = await fetchData("/users/getUserPicture");
      return Response.data.userPicUrl;
    } catch (e) {
      console.error(e);
    }
  }

export async function getAllFriendRequest() {
    try{
      let Response = await fetchData("/friend/getAllFriendRequest");
      return Response;
    }catch(e){
      console.error(e)
    }
  }

export async function getAllNonFriends() {
    try{
      let Response = await fetchData("/friend/allnonFriends");
      console.log(Response);
      return Response;
    }catch(e){
      console.error(e)
    }
  
  }

export async function isLoggedOut(){
    try{
        return await fetchData("/api/logout");
    }catch(e){
        console.error(e)
    }
}