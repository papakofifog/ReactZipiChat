import { CiCircleFilled, DotChartOutlined } from "@ant-design/icons";
import React, {useState} from "react";

export default function UserNotifications(props){

    const [notificationMessages, setNotificationMessages]= useState([
        {
            "message":"Papa kofi accepted your friend request",
            "time": new Date().getTime()
        },
        {
            "message":"Keneth accepted your friend request",
            "time": new Date().getTime()
        }


    ])

    return (
        <div className={props.style}>
            
                <div className="row-justifyContentSpaceBetween">
                    <span>{notificationMessages.length}</span>
                    <span>Mark as read!</span>
                </div>

                <div className="listContainer" >
                    
                    {
                        notificationMessages.map((message, index)=>{
                            return (
                                <div key={index} className="row">
                                    <span><CiCircleFilled /></span>
                                    <div >
                                            <p>{message.message}</p>
                                            <h5>{message.time}</h5>
                                    </div>
                                </div>
                                
                                )
                        })
                    }
                </div>
        </div>
    )
}