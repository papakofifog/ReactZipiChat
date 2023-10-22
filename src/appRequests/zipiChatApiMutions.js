import { SendData, fetchData, sendFormData, UpdateData } from "../utility/handleAxiousRequest";

//** Header component queries */



/** Edit Profile && Chats component query */
export async function handleUpdloadPictureToCloud(formData){
  try{
    let response= await sendFormData("/users/upload",formData);
    return response;
  }catch(e){
    console.error(e)
  }
}


export async function handleUpdateProfileData(data) {
  try{
    let Response = await UpdateData("/users/editProfile",data);
    return Response;
  }catch(e){
    console.error(e);
  }
  
}

//** Main body component query */

export async function getAllConversations(data) {
  try{
    let Response = await SendData("/convo/readAllConvo", data);
    return Response;
  }catch(e){
    console.error(e)
  }
  

}
