import { getData } from "./handleRequest.js";

const logoutBtn= document.querySelector('#logout')

logoutBtn.addEventListener('click', async ()=>{
    let updateLoginStatus=  await getData('http://localhost:3000/api/logout');
    if(updateLoginStatus){
        window.sessionStorage.removeItem('access-token');
        document.location.href='../../auth/login.html';
    }else{
        alert("Cannot Logout Yet")
    }
    
})