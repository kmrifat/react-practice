import SideBar from "./inc/Navbar";
import {Outlet} from "react-router-dom";

function AppLayout() {
    return (
        <main className="d-flex flex-nowrap">
            <SideBar></SideBar>
            <div>
                <Outlet/>
            </div>
        </main>
    )
}

export default AppLayout