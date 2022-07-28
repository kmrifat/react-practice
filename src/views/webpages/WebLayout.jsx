import Navbar from "./inc/Navbar"
import { Outlet } from "react-router-dom";


function WebLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>

    )
}

export default WebLayout