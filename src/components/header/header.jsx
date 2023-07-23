import {React, useEffect, useState} from "react";
import './header.css'
import Tabs from "./sectionTabs";
import Icon from "../icons";
import Image from "../image";
import LabelText from "../label";
import ZipiLogo from "../../assets/zipiLogo/1024.png";
import Modal from "../modal/modal";
import { MdPersonPin, MdSettings, MdShieldMoon, MdCall, MdPersonAdd } from "react-icons/md"
import { SendData, fetchData } from "../../utility/handleAxiousRequest";
import ActionCards from "../actionCards";
import CustomButton from "../buttons";
import { DarkMode, DarkModeOutlined, LightMode, LightModeOutlined, Logout } from "@mui/icons-material";
import { ProfileFilled, ProfileOutlined } from "@ant-design/icons";
import { EditProfile } from "../mainBody/editProfile";


export default function Header(props){

    let [nonFriendsResponse, setnonFriendsResponse]= useState({
        success:false,
        data:[]
    })

    let [friendRequestResponse, updateFriendRequestResponse]= useState({
        success: false,
        data:[]
    })

    let [ModalDetails, showModal ] = useState({
        show: false,
        title: "",
        content: [],
        setting: {}
    });


    let [isTimeToRefresh, updateRefreshStatus]= useState(false)

    

    let nonFriendElements= nonFriendsResponse.data.map((nonFriend,index)=>{
        return  <ActionCards 
        key={index}  
        firstname={nonFriend.firstname} 
        number="+233552661939"
        buttonsName={nonFriend.isRequestSent?"Cancel Request":"Send Request"}
        friendId={nonFriend.username}
        requestSent={nonFriend.isRequestSent}
        close={handleCloseEvent}
        buttonClass={nonFriend.isRequestSent?"cancelRequest":"sendRequest"}
        //userPic={nonFriend.userPic.userPicUrl}
        />
        
    });

    let userRequestElements= friendRequestResponse.data.map((friendRequest, index)=>{
        return <ActionCards 
        key={index}  
        firstname={friendRequest.firstname} 
        number="+233552661939"
        buttonsName="Accept Request"
        close={handleCloseEvent}
        friendId={friendRequest.username}
        buttonClass="acceptRequest"
        userPic={friendRequest.userPic.userPicUrl}
        />
    })


    function handleTabClickEvent(id){
        let curDetails= ""
        switch (id) {
            case "contacts":
                curDetails={   title:"Send friend Request",
                    content: nonFriendElements
                } 
                break;
            
            case "requests":
                curDetails={ title:"Accept Requests",
                content:userRequestElements
                }
                break;

            case "editProfile":
                curDetails= {title:"Edit Profile",
                content:[]

                }
                break;
        
            default:
                curDetails={ title:"Change your settings",
                content:[]}
                break;
        }

        showModal({show: true,...curDetails});
        
    }

    async function handleGetActiveUserPicture(){
        try{
            let Response= await fetchData("http://localhost:3000/users/getUserPicture");
            return Response.data.userPicUrl;
        }catch(e){
            console.error(e)
        }
    }

    

    async function handleProfileDisplay(){
        let UserPicture=await handleGetActiveUserPicture();
        let curDetails={title:"Edit Profile",
        content:[<EditProfile key={0} activeUserData={props.activeUserData} close={handleCloseEvent} activeUserPicture={UserPicture}  rerun={handleUpdateMainPage}/>]
        }
        showModal({show:true,...curDetails})
    }

    function handleUpdateMainPage(){
        props.rerunMainpage();
    }

    async function handleCloseEvent(actualState){
            switch(actualState){
                case "Accept Request":
                   await getAllFriendRequest();
                   await getAllNonFriends();
                   props.rerunMainpage();
                    break;
                case "Send Request":
                case "Cancel Request":
                    await getAllNonFriends();
                    break;
                case "editProfile":
                    props.rerunMainpage();
                    break;
                
            }

        showModal((prevModalDetails)=>{
            return {... prevModalDetails, show: false, title:"", content:[]} 
        });

    }

    async function getAllNonFriends(){
        let Response = await fetchData('http://localhost:3000/friend/allnonFriends');
        setnonFriendsResponse((prevNonFriends)=>{
            return {...prevNonFriends,success: Response.success,data: Response.data}
        })
        
    }

    async function getAllFriendRequest(){
        let Response = await fetchData('http://localhost:3000/friend/getAllFriendRequest');
        updateFriendRequestResponse({success: Response.success,data: Response.data})
    }

    useEffect(()=>{
        getAllNonFriends();
        getAllFriendRequest();
    },[])

    let modal=ModalDetails.show ?
    <Modal 
    close={handleCloseEvent}
    title={ModalDetails.title} 
    content={ModalDetails.content.map(contact=> contact)} 
    /> : "";

    let DateNow= new Date();

    let greeting= DateNow.getHours()<12?"morning": DateNow.getHours()>12 && DateNow.getHours()< 18 ? "Afternoon": "Evening";
    let [isListDisplayed, setdisplayListStatus]= useState(false);


    function handleDropDownDisplay(){
        setdisplayListStatus((prevStatus)=> !prevStatus)
    }

    async function handleLogOut(){
        await SendData(`${import.meta.env.BASEURL}/api/logout`);
        window.sessionStorage.setItem('access-token', '')
        setTimeout(()=>{location.href='/'},1000)
    }

   
    
    return (

        <div className={!props.displayMode? 'headerLightMode': 'headerDarkMode'} >
        
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
                <Icon
                icon={props.displayMode?<LightModeOutlined style={{color:"white"}} onClick={()=>props.handleDarkMode} />: <DarkModeOutlined style={{color:"white"}} onClick={()=>props.handleDarkMode} />}
                />
                <Icon icon={<MdCall  className="icon" id="myCall"/>} />
            </div>
            <div className="profile" onClick={handleDropDownDisplay} >
                <div className="details">
                    <p style={{color:"#ccc", fontSize:"1.2rem" }}>{props.firstName} </p>
                </div>
                <Image src={props.activeUserData.picture} />
                <div className={isListDisplayed?"dropDownList":"hideDropdownlist"}>
                    <div className="options" role="button" onClick={handleProfileDisplay}>
                            <ProfileOutlined className="logOut" />
                            Edit Profile
                    </div>
                    <div className="options" role="button" onClick={handleLogOut}>
                            <Logout className="logOut" />
                            Log Out
                    </div>
                </div>
            </div>
        </div>
        );
}