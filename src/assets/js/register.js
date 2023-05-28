import { showInformationToast, createSpinner, createToastImage } from "./toaster.js";

let registerForm= document.querySelector('#registerForm');
let windowBody= document.querySelector('body');
let usernameInput= document.querySelector('#uname');
let succesImg= "/assets/svg/success-check.svg";
let failureImg= "/assets/svg/failure-check.svg";
let backToSignIn= document.querySelector('#backSignIn');



function getFormData(){
    let arr=[];
    document.querySelectorAll('input').forEach((x)=>{
        if(x.type!='button' && x.id!='com-pass'){
            arr.push(x.value)   
        }
    });
    return arr;
}

function showOpaqueBackground(){
    registerForm.style.display='none'
    windowBody.classList.add('opaqueBody');
    windowBody.appendChild(showInformationToast('User Registration Underway'));
}

function removeOpaqueBackground(){
    registerForm.style.display='block';
    windowBody.classList.remove('opaqueBody');
    let toastContianer= document.querySelector('#tC');
    windowBody.removeChild(toastContianer);
}

function AlterToast(message,badge){
    let toastItem= document.querySelector('#tT');
    toastItem.innerHTML=message;
    let statusImage=createToastImage(badge,'successImage');
    document.querySelector('#tC').appendChild(statusImage);
}


async function registerUser(){
        let url='http://localhost:3000/api/signUp';
        let registerData= getFormData();
        let data = {
            firstname: registerData[0],
            lastname:registerData[1],
            Dob:registerData[2],
            username:registerData[3],
            email:registerData[4],
            password:registerData[5],

        }
        showOpaqueBackground();
        
        let results= await postRequest(url,data);
        
        
        if(results.data.success === true){
            AlterToast(results.data.message,succesImg);
            setTimeout(function(){
                window.location.href='../../auth/login.html';
            },3000)
        }else{
            AlterToast(results.data.message,failureImg);
            setTimeout(function(){
                removeOpaqueBackground()
            },1000)
        }


}

function BackToSignIn(){
    backToSignIn.addEventListener('click', function goBackSignIn(){
        window.location.href='http://localhost:8000/auth/login.html'
    })
}

BackToSignIn();

async function postRequest(url,data){
    let registerData=await axios.post(url,data);
    return registerData;
 
 }


 async function registerWithGoogle(){
    let url='http://localhost:3000/api/google';
    window.location.assign(url);
}

async function getRequest(url){
    let registerDataGoogle= await axios.get(url);
    return registerDataGoogle;
}


export { registerUser, registerWithGoogle }