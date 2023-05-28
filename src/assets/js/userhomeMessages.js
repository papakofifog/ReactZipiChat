import { sendData, getData, sendFormData } from "./handleRequest.js";
import { showInformationToast } from "./toaster.js";
//import { dropDown  } from "./componets.js"

/*let chatsView = document.querySelector('#messages');
let messageToBeSent= document.querySelector('#input')
let sendMessageButton= document.querySelector('#sendMessage')

let userProfileContainer= document.querySelector('#userEverything');

let attatchFileBtn= document.querySelector('#attatchFile');
//let backDropMask= document.querySelector('#backdrop');
let addEmogiButton= document.querySelector('#addEmoji');
let dropdownWrapper= document.querySelector('#dropdownWrapper');
let filePreview= document.querySelector('.file-preview');
let fileUpload= document.querySelector('#filePreview');
let recordAudioBtn= document.querySelector('#record-audio');*/

let currentUploadedFileURL= {
    url:'',
    type:'',
    name:''
}

let dynamicMessage={
    messageString:"",
    fileSent:{
        url:'',
        type:'',
        name:''
    }
}



function creatList(data){
    try{
        console.log(data.senderId);
        //console.log(data.sender_id === userProfileContainer.childNodes[0].id)
        let listClass='receiver';
        if (data.senderId=== userProfileContainer.childNodes[0].id ){
            listClass='sender';
        }
        
        let messageList=`<div class=${listClass}> <li class='messageList'>
            ${
                data.message.fileSent.url ? formatMessage(data.message.messageString)+ getElementPerFleType(data.message.fileSent): formatMessage(data.message.messageString)
            
            }
            
            </li></div>`;
        
        
        return messageList;
        
    

    } catch(e){
        console.error(e)
    }
    
}

let accessToken= window.sessionStorage.getItem('access-token');
const socket = io.connect(`http://localhost:3000`);




function ConnectWitChatServer(){
    socket.emit('setUserId', userProfileContainer.childNodes[0].id)

}

function showMessagePerUser(msg){
    let chatTitle= document.querySelector('#chat-name');
    let receiverName= chatTitle.innerHTML;
    console.log(msg.recipientId , receiverName)
    if (msg.recipientId === receiverName){
        showMessage(msg)
    }
}

function receiveMessage(){
    socket.on('receiveMessage',(msg)=>{
        showMessage(msg)
        
        //showMessagePerUser(msg)
        //console.log(2)
    } )
}


receiveMessage()

function showMessage(msg){
    try{
        
        let message= creatList(msg);
        chatsView.innerHTML+=message;
        //console.log(message)
    }catch(e){
        console.error(e)
    }

    
}

function getElementPerFleType(data){
    console.log(data)
    let type= data.type.split('/')[1]
        switch(type){
            case "mp3" || "wav "||" aac":
                return `<audio src="${data.url}" class="audio" controls alt='${data.name}'></audio>`;
              

            case  "mp4" || "avi" || "mov" || "wmv":
                return `<video src="${data.url}" class="video" controls alt='${data.name}'></video>`;

            default:
                return `<img class="documentPreview" src='${data.url}' alt='${data.name}'>`;
            
        }
    
}

function formatMessage(msg){
    return `<h5>${msg}</h5>`
}

function ResetState(){
    currentUploadedFileURL.url='';
    currentUploadedFileURL.type='';
    currentUploadedFileURL.name='';
    filePreview.innerHTML='';
    dynamicMessage.fileSent.url='';
    dynamicMessage.fileSent.type=''
    dynamicMessage.fileSent.name=''

}

async function sendMessage() {
    let chatTitle= document.querySelector('#chat-name');
    try{
        //let { url } = currentUploadedFileURL;
        console.log(chatTitle);
        let chatName=chatTitle.innerHTML;
        //console.log(userProfileContainer.childNodes[0].id)

        
        dynamicMessage.messageString=messageToBeSent.value;
        dynamicMessage.fileSent.url=currentUploadedFileURL.url;
        dynamicMessage.fileSent.name=currentUploadedFileURL.name;
        dynamicMessage.fileSent.type=currentUploadedFileURL.type;

        console.log(currentUploadedFileURL)

        let dataPacket= {
            senderId: userProfileContainer.childNodes[0].id,
            recipientId: chatName,
            message: dynamicMessage,
            sentAt: Date()
        }

        console.log(dataPacket)

        socket.emit("sendMessage",dataPacket);

        // send data to be saved at the server side
        await sendData('http://localhost:3000/convo/addmessage', dataPacket)

        showMessagePerUser(dataPacket)

        ResetState();


        console.log(1)

    }catch(e){
        console.error(e)
    }
    
     
}

function clearMessageInput(){
    messageToBeSent.value='';
}


function showUploadToast(){
    let uploadContainer=`<div class='container-fluid upload-container'>
    <div class="filePreview">
      <i class="fas fa-file-upload"></i>
    </div>
    <input class="form-control" type="file" name="" id="inputFile">
    <div class="row">
      <div class="col-sm-6">
        <button id='addfile' class="btn btn-primary">Upload</button>
      </div>
      <div class="col-sm-6">
        <button id='cancel-upload'  class="btn btn-danger">Cancel</button>
      </div>
    </div>
  </div>`
    let toast= showInformationToast(uploadContainer);
    return toast;
    
}

function PreviewPicture(value){
    let documentPreview= document.querySelector('.filePreview');
    documentPreview.innerHTML=`<img class='img-thumbnail' src='${URL.createObjectURL(value)}' alt='inputfile' >`;

}

async function uploadFunctionCloudinary(value){
    // create a form data object
    let formData= new FormData();
    formData.append('file', value);

    //send the file using axios
    
    let uploadedFileData= await sendFormData("http://localhost:3000/users/upload", formData);

    //console.log(uploadedFileData.data)
    let CloudinaryFileData=uploadedFileData.data;

    /*document.querySelector('.messageList ').addEventListener('click', function(event){
        window.open(event.target.src, '_blank');
    })*/
    
    if(CloudinaryFileData.success){
        let { url, original_filename, fileType} = CloudinaryFileData.data;
        console.log(url);
        currentUploadedFileURL.url=url;
        currentUploadedFileURL.name=original_filename;
        currentUploadedFileURL.type=fileType;
        filePreview.innerHTML= getElementPerFleType(currentUploadedFileURL)
        fileUpload.classList.remove('block');  
    } 
    
    

}

function modifyMainForUpload(){
    let uploadToast=showUploadToast();
    uploadToast.classList.add('centerItem');
    fileUpload.innerHTML=uploadToast.outerHTML;
    fileUpload.classList.add('block')
    let cancelButton=document.querySelector('#cancel-upload');
    let uploadButton= document.querySelector("#inputFile");
    let storeUpload = document.querySelector('#addfile');
    uploadButton.addEventListener('change', (element)=>{
        PreviewPicture(element.target.files[0]);
    })
    storeUpload.addEventListener('click', function(){
        let targetFile = uploadButton.files[0];
        uploadFunctionCloudinary(targetFile);

    })
    cancelButton.addEventListener('click',()=>{
        fileUpload.classList.remove('block'); 
        fileUpload.innerHTML='';
    })
    
}



sendMessageButton.addEventListener('click', function handleSocketIntraction(){
    sendMessage();
    clearMessageInput();
})

attatchFileBtn.addEventListener('click', function handleUploadInteraction(){
    modifyMainForUpload();

} )

recordAudioBtn.addEventListener('click', function handleAudioRecorder(){
    addRecorderModal();
})





function addEmogi(){
    let selectedEmoji="";
    addEmogiButton.addEventListener('click', ()=>{
        const pickerOptions = { onEmojiSelect: function(event){
            messageToBeSent.value+=event.native;
            dropdownWrapper.removeChild(document.querySelector('#emojiPicker'));
        } }
        const picker = new EmojiMart.Picker(pickerOptions)
        picker.id="emojiPicker";
        console.log(picker)
        document.querySelector('em-emoji-picker')?dropdownWrapper.removeChild(document.querySelector('#emojiPicker')): dropdownWrapper.appendChild(picker)
    })
    
}

async function addRecorderModal(){
    let uploadToast=showUploadToast();
    uploadToast.classList.add('centerItem');
    fileUpload.innerHTML=uploadToast.outerHTML;
    let uploadContainer= document.querySelector('.container-fluid .upload-container');
    uploadContainer.innerHTML='';
    uploadContainer.innerHTML= recorderInfo()
    fileUpload.classList.add('block');
    let stopRecording= document.querySelector('#stopRecording');
    let audioContext = new AudioContext();
    let mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    let mediaStreamSource = audioContext.createMediaStreamSource(mediaStream);
    let meadiaRecorder = new MediaRecorder(mediaStream);
    meadiaRecorder.start();
    stopRecording.addEventListener('click', function(){
        //uploadContainer.innerHTML='';
        //fileUpload.classList.remove('block');

        // Stop recording
        meadiaRecorder.stop();

        //Get the recorded file
        meadiaRecorder.addEventListener('stop', function(event){
            let blob = new Blob([event.data], {type: 'video/mp3'});
            let url = URL.createObjectURL(blob);

            console.log(url)
        })
    })

    mutateWaveForm();

}

async function mutateWaveForm(){
    



}

function recorderInfo(){
    return `
        <button class="microphone-Space">
        <i class="fa fa-microphone gray microphone"></i>
    </button>
    <div>
        <div class="waveform-container"></div>
        <span id="timer" class="time-display">00:00</span>
    </div>
    <button id="stopRecording">
        <i class="fa fa-circle"></i>
    </button>
    `
}

addEmogi()

function recordAudio(){
    try{

        recordButton.addEventListener('click', async function(){
            let streamObject= await navigator.mediaDevices.getUserMedia({audio:true})
            let recorder = RecordRTC(streamObject, {
                type: 'audio',
                //mimeType: 'audio/webm',
                //recorderType: StereoAudioRecorder,
                //desiredSampRate: 16000,
                //numberOfAudioChannels: 1  
            })
            
    
            recorder.startRecording();
    
            stopRecordingBtn.addEventListener('click', ()=>{
                recorder.stopRecording(function() {
                    // Get the recorded audio blob and create a url for it.
                    let blob = recorder.getBlob();
                    let url= URL.createObjectURL(blob);
                    
                    console.log("Recorder audio URL:", blob)
                    console.log("Recorder audio URL:", url)

                    window.open(url, '_blank')
                })
            })
        })
    }catch(e){
        console.error(e)
    }
    
}

//recordAudio();


export { ConnectWitChatServer, showMessage }










