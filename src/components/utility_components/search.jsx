import React from "react";
import "../../assets/css/search.css";
import Icon from "./icons";

export default function Search(props) {
  return (
    <div className="form">
      <span>
        <Icon icon={props.icon} />
      </span>
      <input
        name="searchCode"
        type="text"
        placeholder="Search"
        value={props.searchQuery.searchCode}
        onChange={props.change}
      />
    </div>
  );
}
