import React, { useEffect, useState } from "react";
import './main.css'
import SideNavItem from "./sideNavItem";
import Search from "../search";

import Contact from "./contacts";

import { SendData, fetchData } from "../../utility/handleAxiousRequest";
import { FiUsers,FiArchive, FiTrash, FiMessageCircle, FiSearch } from "react-icons/fi"
import Chat from "./chat";




export default function Main(props){

    

    let [response, setResponse ]= useState({
        success:false,
        data: []
    })

    let [conversations, setConvesations]= useState({
        success: false,
        data:[]
    })

    let [relationship, setRelationship] = useState({
        sender:'',
        receiver:''
    })


    async function handleRerender(newState){
        newState && await getAllConversations(relationship);  
    }

    async function handleRelationshipUpdate(friendUsername){
        

        //console.log({sender:activeUserName, receiver:friendUsername})
        
        setRelationship((prevRelationship,)=> {
            return {...prevRelationship,
            sender:props.activeUser, receiver:friendUsername}
        })

        

        await getAllConversations(relationship)
    }

    async function getAllConversations(data){
        let Response= await SendData("http://localhost:3000/convo/readAllConvo",data);


        setConvesations((prevConversation)=>{
            return {
                ...prevConversation,
                success: Response.data.success,
                data: Response.data
            }
        })

    }

    useEffect(()=>{
        getAllConversations(relationship) 
    }, [])

    
    


    let friendListElements= response.data.map((friendItem, index)=>{
        
        return <Contact key={index}  fullName={friendItem.firstname+friendItem.lastname} number={friendItem.number} lastMessage="Are you home" lastMessageDate="Friday 2023" handleMessages={handleRelationshipUpdate} username={friendItem.username} />
    })

    async function getAllContacts(){
        let Response = await fetchData('http://localhost:3000/friend/getUsersFriends');
        setResponse((prevResponse)=>{
            return {
                ...prevResponse,
                success:Response.success,
                data: Response.data
            }
        })
        
    }

    
    useEffect(()=>{
        getAllContacts();
    }, [])


    return (
        <main>
            <div className="navigation">

                <SideNavItem class={"side-navItemText"} icon={<FiUsers className="icon"/>} text="Friends" />
                <SideNavItem class={"side-navItemText"} icon={<FiMessageCircle className="icon"/>} text="Groups" />
                <SideNavItem class={"side-navItemText"} icon={<FiArchive className="icon" />} text="Archived" />
                <SideNavItem class={"side-navItemText"} icon={<FiTrash  className="icon"/>} text="Trash" />

            </div>

            <div className="chat-content">
                <div className="contacts">
                    
                    <Search  icon={<FiSearch className="icon white-color"/>} />

                    <div className="contacts-container">

                        {friendListElements.length ? friendListElements: "" }

                    </div>

                    

                </div>

                {conversations.success && <Chat conversations={conversations.data || [] } activeUser={props.activeUser} relation={relationship} update={handleRerender} /> }

                



                
            </div>

        </main>
    );
}