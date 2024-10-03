import React from "react";
import {useLocation, useParams} from "react-router-dom";

export default function Posts(){
    const {id}=useParams();
    const urlsting=new URLSearchParams(useLocation().search);
    const fname=urlsting.get("fname");
    const lname=urlsting.get("lname");
    return (<h1>This is Posts page Hello {fname} {lname} {id}</h1>)
}

