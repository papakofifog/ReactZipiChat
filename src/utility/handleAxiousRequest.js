import axios from "axios";
import {showToast} from '../utility/showToast';
import sampleUsers from "../assets/data/sampleUsers";
import jwt_decode from "jwt-decode";
import { ControlCamera } from "@mui/icons-material";


const user_access_token=window.sessionStorage.getItem('access-token')
const Headers= {
    headers: {
        authorization: 'Bearer '+window.sessionStorage.getItem('access-token'),
        ['Content-Type']:'application/json'
    }
}

function checkJWExpiryDate(){
    let data= jwt_decode(sessionStorage.getItem("access-token"));
    console.log(data);
   
    if(data.exp < Date.now()){
        return false;
    }else{
       return true;
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
            return results;
        
    }catch(e){
        console.error(e.response.data)
        return e.response;
    }
    
      
}

async function UpdateData(baseurl,Body) {
    try{
        
            Headers.headers['Content-Type']='application/json';
            let results= await axios.put(baseurl, Body, Headers );
            return results;
        
    }catch(e){
        console.error(e.response.data)
        return e.response;
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

export {fetchData,SendData, UpdateData,sendFormData, sendAndVerifyUserDataLocaly, fetchUserDataLocally}