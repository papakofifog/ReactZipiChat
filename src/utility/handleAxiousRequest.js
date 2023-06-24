import axios from "axios";
import {showToast} from '../utility/showToast';
import sampleUsers from "../assets/data/sampleUsers";


const user_access_token=window.sessionStorage.getItem('access-token')
const Headers= {
    headers: {
        authorization: 'Bearer '+user_access_token,
        ['Content-Type']:'application/json'
    }
}

function JWTExpiredRedirect(data){
    try{
        let {success, message}= data;
        if(success===false && message==="jwt expired" ){
            showToast(message,"red", false)
            setTimeout(()=>{location.href='/'},2000)
        }
        
    }catch(e){
        console.log(e)
    }
}

async function fetchData(baseurl) {
    try{
        let results= await axios.get(baseurl, Headers);
        JWTExpiredRedirect(results.data)
        return results.data;
    }catch(e){
        console.error(e)
    }
}

async function SendData(baseurl,Body) {
    try{
        Headers.headers['Content-Type']='application/json';
        let results= await axios.post(baseurl, Body, Headers );
        JWTExpiredRedirect(results.data)
        return results;
    }catch(e){
        console.error(e)
    }
    
      
}

async function sendFormData(baseurl,Body){
    try{
        Headers.headers['Content-Type']='multipart/form-data';
        let response= await axios.post(baseurl,Body,Headers)
        return response;
    }catch(e){
        console.error(e)
    }
}

async function sendAndVerifyUserDataLocaly(data){
    let existingUser=sampleUsers.filter((x)=> {
        if(x.email === data.email && x.password === data.password){
            return x;
        }
    });
    if(existingUser.length){
        return {
            success:true,
            message:"Logged In succesfuly",
            token:existingUser[0].token,
        };
    }else{
        return {success:false,
        message:"User does not exist"}
    }
}

async function fetchUserDataLocally(token){
    console.log(token)
    let existingUser= sampleUsers.filter((x=> x.token === token));
    if(existingUser.length){
        console.log(" Hello"+existingUser)
        return {
            success: true,
            data: existingUser[0]
        } 
    }else{
        return {
            success:false,
            message:"User does not exists"
        }
    }
}

export {fetchData,SendData,sendFormData, sendAndVerifyUserDataLocaly, fetchUserDataLocally}