import {React, useEffect, useState} from "react";
import './header.css'
import Tabs from "./sectionTabs";
import Icon from "../icons";
import Image from "../image";
import LabelText from "../label";
import ZipiLogo from "../../assets/zipiLogo/1024.png";
import Modal from "../modal/modal";
import { MdPersonPin, MdSettings, MdShieldMoon, MdCall, MdPersonAdd } from "react-icons/md"
import { fetchData } from "../../utility/handleAxiousRequest";
import ActionCards from "../actionCards";


export default function Header(props){

    let [response, setResponse]= useState({
        success:false,
        data:[]
    })

    let [ModalDetails, showModal ] = useState({
        show: false,
        title: "",
        content: [],
        setting: {}
    });

    let [nonFriends, addNonFriends] = useState([])

    let nonFriendElements= response.data.map((nonFriend,index)=>{
        return  <ActionCards 
        key={index}  
        firstname={nonFriend.firstname} 
        number="+233552661939"
        buttonsName="Send Request"
        />
        
    });

    console.log(nonFriendElements)
    


    

    

    function handleTabClickEvent(id){

        console.log(nonFriends)

        addNonFriends(nonFriendElements);
        let curDetails= ""
        switch (id) {
            case "contacts":
                curDetails={   title:"Send friend Request",
                    content: nonFriends
                } 
                break;
            
            case "requests":
                curDetails={ title:"Accept Requests",
                content:[]}
                break;
        
            default:
                curDetails={ title:"Change your settings",
                content:[]}
                break;
        }


        
        
        showModal((prevModalDetails)=>{
          return {... prevModalDetails, show: true, ... curDetails}      
        });
        
    }

    function handleCloseEvent(){

        showModal((prevModalDetails)=>{
            return {... prevModalDetails, show: false, title:"", content:[]} 
        });

    }

    async function getAllNonFriends(){
        let Response = await fetchData('http://localhost:3000/friend/allnonFriends');
        setResponse((prevResponse)=>{
            return {
                ...prevResponse,
                success: Response.success,
                data: Response.data
            }
        })
        
    }


    useEffect(()=>{
        getAllNonFriends();
    },[])

    let modal=ModalDetails.show ?
    <Modal 
    close={handleCloseEvent}
    title={ModalDetails.title} 
    content={ModalDetails.content.map(contact=> contact)} 
    /> : "";

    let DateNow= new Date();

    let greeting= DateNow.getHours()<12?"morning": DateNow.getHours()>12 && DateNow.getHours()< 18 ? "Afternoon": "Evening";

    return (

        <div className="header">
        
            <div className="app-brand">
            <Image src={ZipiLogo} />
            <LabelText class={"brand"} text={"ZipiChat"} />
            </div>

            <div className="chatAction-section">
            
                <Tabs 
                id="contacts" 
                modal={ModalDetails} 
                click={handleTabClickEvent} 
                icon={<MdPersonAdd className="icon"/>} 
                class={"section-name"}  
                text={"New Friends"} 
                />

                <Tabs 
                id="requests" 
                modal={ModalDetails} 
                click={handleTabClickEvent} 
                icon= {<MdPersonPin  className="icon"/>} 
                class={"section-name"}  
                text={"Requests"}  
                />

                 <Tabs 
                id="settings" 
                modal={ModalDetails} 
                click={handleTabClickEvent} 
                icon= {<MdSettings  className="icon"/>} 
                class={"section-name"}  
                text={"Settings"}  
                />


               
                {modal}
            </div>

            <div className="simpleActions-section">
                <div className="light-mode">
                    <div className="toggle-circle">
                        <Icon icon={<MdShieldMoon className="icon" />} />
                    </div>
                </div>
                <Icon icon={<MdCall  className="icon" id="myCall"/>} />
                

            </div>

            <div className="profile">
                <div className="details">
                <LabelText class={"profile-text"} text={"Good "+greeting} />
                <LabelText class={"profile-text"} text={props.fullName} />
                {props.number && <LabelText class={"profile-text"} text={"+233552661939"} />}
                </div>
                <Image src={"src"} />
            </div>

        </div>
        
        );
}