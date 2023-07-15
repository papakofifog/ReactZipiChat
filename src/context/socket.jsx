import io from "socket.io-client";
import React from 'react';
 
let connection= io.connect("http://localhost:3000/connection");
let SocketContext = React.createContext();

export {connection, SocketContext}

