import React from 'react';
import Contact from './chat_components/contacts';
import { Tab } from '@mui/material';
import ActionCards from '../utility_components/actionCards';

export default function ChatSetting(){
    return(
        <>
            <div>
                <div>
                    <ActionCards 
                        firstName={"Papa Kofi"}
                        buttonName={"Edit"}
                        userPic={"papaspicture"}
                        
                    />

                    <div>
                        <p>General</p>
                        <Tab
                        text={"Hello1"}
                        
                        />
                    </div>

                    <div>
                        <p>Personal Chats</p>
                        <Tab
                        text={"Hello1"}
                        
                        />
                    </div>


                    <div>
                        <p>Group Chats</p>
                        <Tab
                        text={"Hello1"}
                        
                        />
                    </div>


                </div>
                <div></div>
            </div>
        </>
    )
}