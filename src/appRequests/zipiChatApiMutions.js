import { SendData, fetchData, sendFormData, UpdateData, deleteData } from "../utility/handleAxiousRequest";

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

/** Message component request */
export async function editRecentlySentMessage(data) {
  try{
    let Response = await UpdateData(`/convo/editMessage/${data.messageId}`, data );
    return Response;
  }catch(e){
    console.error(e)
  }
  

}

export async function deleteRecentlySentMessage(data) {
  try{
    let Response = await deleteData(`/convo/deleteMessage/${data.messageId}`);
    return Response;
  }catch(e){
    console.error(e)
  }
  

}
