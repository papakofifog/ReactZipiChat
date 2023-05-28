import React from "react";
import './search.css'
import Icon from "./icons";

export default function Search(props){
    return (

        <div className="form">
            <span>
                <Icon icon={props.icon} />
            </span>
            <input type="text" placeholder="Search" />
        </div>

    );
}