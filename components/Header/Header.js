import React from 'react'
import TopBar from "../TopBar";

import MenuWeb from "./Menu/Menu";

export default function Header (){
    return (
        <div className="header">
            <TopBar></TopBar>
            <MenuWeb></MenuWeb>
        </div>
    )
}
