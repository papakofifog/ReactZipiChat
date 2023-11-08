import { CancelOutlined, Check } from '@mui/icons-material';
import React, { useState } from 'react';
import CustomButton from '../../utility_components/buttons';
import checkIcon from "../../../assets/svg/checkIcon.svg";
import cancelIcon from "../../../assets/svg/cancelIcon.svg";
import textColor from "../../../assets/svg/textColorIcon.svg";
import table from "../../../assets/svg/tableIcon.svg";
import file from "../../../assets/svg/fileUploadIcon.svg";
import link from "../../../assets/svg/link-Icon.svg";

import { 
    FormatBoldOutlined,
     FormatItalicOutlined,
     FormatUnderlined,
     EmojiEmotionsOutlined,
     FormatListNumberedOutlined,
     FormatListNumberedRtlOutlined,
     
     
    
} from '@mui/icons-material';




export function TextBox(props){
    
    return (
        <div>
            <div className="row">
                <CustomButton
                    childComponent= {<FormatBoldOutlined />}
                />
                <CustomButton
                    childComponent= {<FormatItalicOutlined />}
                />
                <CustomButton
                    childComponent= {<FormatUnderlined />}
                />
            
            </div>
            <textarea id="" cols="30" rows="10" name="messageToEdit" value={props.message} onChange={(e)=>props.change(e)}></textarea>
            <div className='rowEnd'>
                <CustomButton
                    buttonName="save"
                    click={()=>props.click()}

                />
                <CustomButton
                    buttonName="cancel"
                    click={()=>props.cancel()}
                />
            </div>
        </div>
    )
}