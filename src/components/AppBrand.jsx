import React from "react";
import Image from "./image";
import LabelText from "./label";
import ZipiLogo from "../assets/zipiLogo/1024.png"

export default function AppBrand(props){
    return (
        <div className={props.style ||"app-brand"}>
            <Image src={ZipiLogo} />
            <LabelText class={"brand"} text={"ZipiChat"} />
        </div>
    );
}