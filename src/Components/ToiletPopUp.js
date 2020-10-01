import React from "react";
import { ReactComponent as PinIcon } from '../img/pinicon.svg';
import { ReactComponent as DisabledIcon } from '../img/disabledicon.svg';
import { ReactComponent as StarIcon } from '../img/staricon.svg';
import { ReactComponent as ClockIcon } from '../img/clockicon.svg';
  
  
const PopUpIcon = {
    display: "inline-block",
    verticalAlign: "top",
    height: "auto",
    width: "14%",
    margin: "0 !important",
    padding: "3%"
}

const PopUpText = {
    display: "inline-block",
    verticalAlign: "top",
    height: "auto",
    width: "74%",
    margin: "0 !important",
    padding: "3%"
} 

export default function ToiletPopUp(props) {
    return (
        <div className="toilet-pop-up">
            <PinIcon style={PopUpIcon}/>
            <span style={PopUpText}>{props.address}</span>
            <ClockIcon style={PopUpIcon}/>
            <span style={PopUpText}>{props.opening ? props.opening : "Opening hours not specified"}</span>
            <DisabledIcon style={PopUpIcon}/>
            <span style={PopUpText}>{props.disabled ? "Yes" : "No / not specified"}</span>
            <StarIcon style={PopUpIcon}/>
            <span style={PopUpText}>{props.rating ? props.rating : "No ratings yet"}</span>
            <p><a href={props.url}>Link to API</a></p>
        </div>
    );
}


