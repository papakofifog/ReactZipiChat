import { sendData } from "./handleRequest.js";
import { showMessage } from "./userhomeMessages.js";
import { formatActiveUserFriends } from "./userHome.js";
const userContactsContainer= document.querySelector('#userContactsList');
const chatWithFriendIcon= document.querySelector('#chatFriendIcon');
const chatWithUserUsername= document.querySelector('#chat-name');
const chatsView = document.querySelector('#messages');
let currentUser= document.querySelector('#userEverything')
let chatProfileHeader= document.querySelector('#chatProfile-user');
let personalFriends= document.querySelector("#personal-friends");
let groups=document.querySelector("#groups");
let friendItem1= document.querySelector('#friendItem-1');
let friendItem2= document.querySelector('#friendItem-2');
let userContacts=document.querySelector('#userContactsList');
let form= document.querySelector('#form');


function handleChatView(value1,value2){
    friendItem1.addEventListener('click',async function(){
        userContacts.innerHTML=value1;
    })

    friendItem2.addEventListener('click', function(){
        userContacts.innerHTML=value2;
    })
}

 async function MonitorOptions (){
    let friends= await formatActiveUserFriends();
    // show the friends chat view when the page loads.
    handleChatView(friends,"");


    // handdle chat behaviour when a user interact with the chat app.
    personalFriends.addEventListener('click', async function(){
        
        friendItem1.innerHTML="Friends";
        friendItem2.innerHTML="New Contacts";
        let friends= await formatActiveUserFriends();
        userContacts.innerHTML=friends;
        handleChatView(friends,"");
        MonitorClickFriend();
    })
    groups.addEventListener('click', function (){
        friendItem1.innerHTML="Groups";
        friendItem2.innerHTML="New Groups";
        let groups="";
        userContacts.innerHTML=""
        handleChatView("","")
    })
    
}


function MonitorClickFriend(){
    //console.log("monitoring click event")
    let userContacts= userContactsContainer.childNodes;
    //console.log(userContacts)
    userContacts.forEach((x)=>{
        x.addEventListener('click', async function chatWithUser(){
            form.classList.remove('disableElement')
            chatsView.innerHTML='';
            let chatImage=`<img id="chatFriendIcon" class="icon" src="${x.childNodes[1].childNodes[1].src}" alt="chat Avatar">`;
            if(!x.childNodes[1].childNodes[1].src)chatImage= `<div class="contactImg contactNoPic">${x.childNodes[1].childNodes[1].innerHTML}</div>`;

            let chatImageName=`${chatImage}<p id="chat-name">${x.id}</p>`
            chatProfileHeader.innerHTML=chatImageName;

            let chatsBetweenUsers= await getInterPersonalChats(currentUser.childNodes[0].id,x.id)
            console.log(currentUser.childNodes[0].id,x.id)
            walkthroughMessages(chatsBetweenUsers)

        })
    })

    
    
}


async function getInterPersonalChats(senderID, receiverID){
    try{
        let url='http://localhost:3000/convo/readAllConvo';
        let data= {'sender':senderID, 'receiver': receiverID}
        let userChats= await sendData(url,data);
        return userChats.data.data;
    }catch(e){
        console.error(e)
    }
    
}

function walkthroughMessages(data){
    try {
        data.forEach((msg)=>{
            showMessage(msg)
        })
    }catch(e){
        console.error(e)
    }
}

export {MonitorClickFriend , MonitorOptions }

