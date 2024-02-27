import io from "socket.io-client";
import React from 'react';
 
let connection= io.connect("http://localhost:4000/");
//let SocketContext = React.createContext();

export {connection}

