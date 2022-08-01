import Navbar from "./inc/Navbar"
import { Outlet } from "react-router-dom";
import { useEffect } from "react";


function WebLayout() {
   
    return (
        <>
            <Navbar />
            <div className="container">
                <Outlet />
            </div>

        </>

    )
}

export default WebLayout