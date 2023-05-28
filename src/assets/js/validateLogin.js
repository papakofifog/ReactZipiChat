let emailInput=document.querySelector('#email');
let passwordInput= document.querySelector('#pass');
let logIn= document.querySelector('#login');
import { LoginUser } from "./login.js";

function validateEmail(input){
    let emailRegex= /^\w+@\w+\.com$/
    let emailInputStatus= emailRegex.test(input.value);
    if(emailInputStatus){
        hideErrorMessage(input);
        alertSuccess(input);
        return true
    }else{
        showErrorMessage(input);
        alertProblem(input);
        return false;
    }
}

function validatePassword(input){
    if (input.value!=''){
        hideErrorMessage(input);
        alertSuccess(input);
        return true;
    }else{
        showErrorMessage(input)
        alertProblem(input)
        return false;
    }
}

function showErrorMessage(input){
    return document.querySelector('#error-l'+input.id).style.display='block';
}

function hideErrorMessage(input){
    return document.querySelector('#error-l'+input.id).style.display='none';
}

function alertSuccess(input){
    return input.style.borderColor="green";
}
function alertProblem(input){
    return input.style.borderColor='red';
}

function validateBoth(){
    document.querySelectorAll('input').forEach((x)=>{
        x.addEventListener('keyup', ()=>{
            switch(x.type){
                case 'email':
                    validateEmail(x);
                    break;
                
                case 'password':
                    validatePassword(x);
                    break;
                default:
                    break;
            }
        })
    })
    
}

validateBoth();




function validateLogin(){
    try{
        logIn.addEventListener('click', async ()=>{
            if(validateEmail(emailInput) && validatePassword(passwordInput)){
                // we good to send the request
                await LoginUser(); 
            }
            return false;
    
        })
    }catch(e){
        console.error(e)
    }
    
}



validateLogin();

