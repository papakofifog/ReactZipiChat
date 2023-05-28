import React from "react";
import './modal.css'
import CustomButton from "../buttons";

export default function Modal(props){

    return (
    <div className="modal">
        <div className={props.modalContentStyle|| "modal-content"}>
            {props.title && <div className="modal-header">
                <h4 className="modal-title">{props.title}</h4>
            </div>}
            <div className={props.modalBodyStyle||"modal-body"}>
                {props.content|| props.settings}
            </div>

            <div className={props.modalFooterStyle||"modal-footer"}>
                <CustomButton 
                click={props.close}
                style="cancel"
                isdisabled={false}
                buttonName="Cancel"
                />
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