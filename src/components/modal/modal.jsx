import React from "react";
import './modal.css'
import CustomButton from "../buttons";
import {CloseCircleOutlined } from '@ant-design/icons';


export default function Modal(props){
    let headerClassName= props.title? "modal-header":"modal-header-closeBtn";
    return (
    <div className="modal">
        <div className={props.modalContentStyle|| "modal-content"}>
            <div className={headerClassName}>
                {props.title && <h4 className="modal-title">{props.title}</h4>}
                <CloseCircleOutlined
                onClick={props.close}
                className="cancel"
                />
            </div>
            <div className={props.modalBodyStyle||"modal-body"}>
                {props.content|| props.settings}
            </div>

            <div className={props.modalFooterStyle||"modal-footer"}>
                
                {props.actionName && <CustomButton 
                click={props.close} 
                style="action"
                isdisabled={false}
                buttonName={props.actionName} />}
            </div>

        </div>
    </div>
    );
}