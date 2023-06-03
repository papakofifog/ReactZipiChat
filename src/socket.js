import {io} from 'socket.io-client';

const URL = process.env.NODE_ENV === "production" ? undefined: "http://localhost:3000";

export const socket = io(URL);

/*export const socket = io(URL, {
    autoConnect: false
})*/

//call socket.io to make the socket.io client connect.

