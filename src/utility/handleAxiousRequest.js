import axios from "axios";
import {showToast} from '../utility/showToast';
import sampleUsers from "../assets/data/sampleUsers";
import jwt_decode from "jwt-decode";
import { isTokenExpired } from "./generalFunctios";



//const user_access_token=sessionStorage.getItem('access-token')
const Headers= {
    headers: {
        authorization: 'Bearer '+sessionStorage.getItem('access-token'),
        ['Content-Type']:'application/json'
    }
}

const baseurl= "http://localhost:3000";

async function getNewAccessTokenIfJwtHasExpired(){
    let tokeStatus=isTokenExpired(sessionStorage.getItem("access-token"))
    console.log(tokeStatus)
    if(tokeStatus){
        await getNewAccessTokenIfJwtExpired()
    }
}

async function getNewAccessTokenIfJwtExpired(){
    try{
        let refreshToken=window.sessionStorage.getItem("refresh-token");
        Headers.headers.authorization=`Bearer ${refreshToken}`;
        await refetchAccessRefreshTokens();
        
    }catch(e){
        console.log(e)
    }
}

async function refetchAccessRefreshTokens(){
    try{
        let endpoint= baseurl.concat("/api/refreshToken");
        let results= await axios.get(endpoint, Headers);
        let {accessToken, refreshToken}=results?.data?.token;
        sessionStorage.setItem("access-token",accessToken);
        sessionStorage.setItem("refresh-token",refreshToken);
        Headers.headers.authorization=`Bearer ${sessionStorage.getItem("access-token")}`;
    }catch(e){
        throw e;
    }
}

async function fetchData(path) {
    try{
        await getNewAccessTokenIfJwtHasExpired();
        let endpoint= baseurl.concat(path);
        let results= await axios.get(endpoint, Headers);
        return results;
    }catch(e){
        throw e;
    }
}



async function SendData(path,Body) {
    try{
        await getNewAccessTokenIfJwtHasExpired();
        let endpoint= baseurl.concat(path);
        Headers.headers['Content-Type']='application/json';
        let results= await axios.post(endpoint, Body, Headers );
        return results;
    }catch(e){
        throw e;
    }
        
}

async function UpdateData(path,Body) {
    try{
        await getNewAccessTokenIfJwtHasExpired();
        let endpoint= baseurl.concat(path);
        Headers.headers['Content-Type']='application/json';
        let results= await axios.put(endpoint, Body, Headers );
        return results;
        
    }catch(e){
        console.error(e.response.data)
        throw e;
    }
    
      
}

async function deleteData(path) {
    try{
        await getNewAccessTokenIfJwtHasExpired();
        let endpoint= baseurl.concat(path);
        Headers.headers['Content-Type']='application/json';
        let results= await axios.delete(endpoint,Headers );
        return results;
    }catch(e){
        console.error(e.response.data)
        throw e;
    }
    
      
}



async function sendFormData(path,Body){
    try{
        await getNewAccessTokenIfJwtHasExpired();
        Headers.headers['Content-Type']='multipart/form-data';
        let endpoint=baseurl.concat(path);
        let response= await axios.post(endpoint,Body,Headers)
        return response;
    }catch(e){
        console.error(e)
        throw e;
    }
}



export {fetchData,SendData, UpdateData,sendFormData, deleteData}