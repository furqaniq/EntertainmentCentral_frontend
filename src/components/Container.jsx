import React from "react";

export default function Container({children, className}) {
    return ( 
    <div className={" max-w-screen-xl mx-auto content-evenly  " +className}>
        {children}</div>
);
}