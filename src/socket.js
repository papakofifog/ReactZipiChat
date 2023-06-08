import {io} from 'socket.io-client';

const URL = "http://localhost:3000";

//export const socket = io(URL);

const socket = io(URL,{autoConnect:false});

function isSocketConneted(){
    return socket.connected;
}

function connectToSocket(userId){
    socket.timeout(1000).connect();
    emitEvent('setUserId', userId);
}

function disconnetFromSocket(callback){
    socket.disconnect();
    ()=>{
        callback();
    }
}

function listenToSocket(socketEvent,callBack){
    socket.on(socketEvent,()=>{callBack()})
}

function emitEvent(sockeEvent,message){
    console.log(sockeEvent);
    socket.emit("sendMessage","Hi");
}

export { socket,connectToSocket,disconnetFromSocket,listenToSocket,emitEvent,isSocketConneted}

//call socket.io to make the socket.io client connect.

