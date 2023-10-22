import { SendData, fetchData, sendFormData, UpdateData } from "../utility/handleAxiousRequest";


/** Homepage component request */
export const fetchActiveUserBasicData = async ()=>{
  try{
    let data=await fetchData("/users/activeUser");
    return data;
  }catch(e){
    console.error(e)
  }
  

}


//** Header component requests */
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




//** Main body component Requests */


export async function getAllContacts() {
  try{
    let response = await fetchData("/friend/getUsersFriends");
    return response;
  }catch(e){
    console.error(e);
  }
  
}