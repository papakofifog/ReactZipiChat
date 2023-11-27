import { CiCircleFilled, DotChartOutlined, ProfileFilled, ReadFilled } from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import { connection } from "../../context/socket";
import { fetchZipiUserData } from "../../hooks/useZipiUserData";
import { deleteData, fetchData } from "../../utility/handleAxiousRequest";
import { getTimeElapsed, isoStringToGMT } from "../../utility/generalFunctios";
import { CircleNotifications } from "@mui/icons-material";
import { EyeFilled } from "@ant-design/icons";
import { mutateZipiUserData } from "../../hooks/mutateZipiUserData";
import { useQueryClient } from "../../App";
import { showToast } from "../../utility/showToast";
import { green, red } from "@mui/material/colors";
import CustomButton from "../utility_components/buttons";
import { Avatar } from "@mui/material";

export default function UserNotifications(props){

    
    const {data:notificationData, isLoading:notificationsIsloading, isError, refetch, error}= fetchZipiUserData("notifications", getUserNotifications);
    const {mutate:deleteNotification, isLoading:deleteNotificationIsLoading}= mutateZipiUserData('handleDeleteNotification',deleteRequest, handleSuccess,handleFailure);
    const queryClient= useQueryClient();

    async function getUserNotifications(){
        try{
            let response= await fetchData("/notification/getUserNotifications");
            return response;
        }catch(e){
            throw e;
        }
    }

    async function deleteRequest(data){
        try{
            console.log('helo',data)
            let response= await deleteData(`/notification/deleteOneNotification/${data.id}`);
            return response;
        }catch(e){
            throw e;
        }
    }

    async function handleDeleteMutation(notificationId){
        deleteNotification({
            id:notificationId
        })
    }

    async function handleNewNotification(data){
        await refetch();
        props.updateNotificationCount("notification_count_increment");
    }

    async function handleSuccess(){
        queryClient.invalidateQueries(['notifications']);
        showToast(data?.data?.message, "green", true);
    }

    async function handleFailure(){
        showToast(data?.data?.message, "red", false);
    }

    useEffect(()=>{
        if(isError){
            console.error(error)
        }
        connection.on('newNotification', handleNewNotification);
        return () => {
            connection.off('newNotification', handleNewNotification);
          }
    }, [])

    console.log(notificationData)
    return (
        <div className={props.style}>
            
                <div className="row-justifyContentCenter">
                    <span>Notifications</span>
                    <span className="circle-notification">{notificationsIsloading?[].length:notificationData?.data?.data?.length}</span>
                    
                </div>

                <div className="listContainer" >
                    
                    {
                        notificationsIsloading || isError?"Notifications are loading":(notificationData?.data?.data.map((notification, index)=>{
                            let readableDate=getTimeElapsed(notification?.createdAt)
                            return (
                                <div key={index} className="listContainer-item">
                                    <span><Avatar imgProps={notification?.userPic} /></span>
                                    <div >
                                            <p className="content">{notification?.message}</p>
                                            <p  className="timeStamp">{readableDate}</p>
                                    </div>
                                    <CustomButton 
                                        style="notification-action-button"
                                        icon={<EyeFilled className="notification-action-button" />}
                                        click={()=>handleDeleteMutation(notification?._id)}
                                    />
                                    
                                </div>
                                
                                )
                        }))
                    }
                </div>
        </div>
    )
}