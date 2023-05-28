const user_access_token=window.sessionStorage.getItem('access-token')
const Headers= {
    headers: {
        authorization: 'Bearer '+user_access_token
    }
}

async function sendData(url,data){
    try{
        Headers.headers['Content-Type']='application/json';
        let response=await axios.post(url,data,Headers);
        return response;
    }catch(e){
        console.error(e)
    }
    
}

async function getData(url){
    try{
        let response= await axios.get(url,Headers)
        return response;
    }catch(e){
        console.error(e)
    }
    
}

async function updateData(url){
    try{
        let response= await axios.put(url);
        return response;
    }catch(e){
        console.error(e)
    }
    
}

async function SendPostWithoutHeader(url,body){
    try{
        let response= await axios.post(url,body)
        return response;
    }catch(e){
        console.error(e)
    }
}

async function sendFormData(url,body){
    try{
        Headers.headers['Content-Type']='multipart/form-data';
        let response= await axios.post(url,body,Headers)
        
        return response;
    }catch(e){
        console.error(e)
    }
}






export {sendData, getData, updateData, SendPostWithoutHeader, sendFormData}