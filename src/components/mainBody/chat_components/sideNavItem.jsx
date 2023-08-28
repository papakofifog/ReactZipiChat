import React from "react";
import Icon from "../icons";
import LabelText from "../label";
import '../../../assets/css/sideNavItem.css'


export default function SideNavItem(props){

    let number=1;
    return (
        <div className="side-navItem">
            <Icon icon={props.icon} />
            <LabelText class={props.class} text={props.text} />
            {number? <LabelText class={props.class} text={number} /> : ''}
        </div>
    );
}