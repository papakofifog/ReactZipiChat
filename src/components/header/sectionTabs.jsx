import React from "react";
import "../../assets/css/sectionTab.css";
import Icon from "../utility_components/icons";
import LabelText from "../utility_components/label";

export default function Tabs(props) {
  return (
    <div
      id={props.id}
      className="section-tab"
      onClick={() => props.click(props.id)}
    >
      <Icon icon={props.icon} />
      <LabelText class={props.class} text={props.text} />
    </div>
  );
}
