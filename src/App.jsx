import './styles/main.scss'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import WebLayout from "./views/webpages/WebLayout";
import Home from "./views/webpages/pages/Home";
import JobDetails from "./views/webpages/pages/JobDetails";
import JobApply from "./views/webpages/pages/apply/JobApply";
import JobApplySuccess from "./views/webpages/pages/apply/JobApplySuccess";
import AppLayout from "./views/dashboard/AppLayout";
import {useEffect} from "react";
import Dashboard from "./views/dashboard/pages/Dashboard";


function App() {
    useEffect(() => {
        console.log("App")
    })
    return (
        <Routes>
            <Route path="/" element={<WebLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="/job-details/:slug" element={<JobDetails/>}/>
                <Route path='/job-apply/:slug' element={<JobApply/>}/>
                <Route path='/job-apply-success' element={<JobApplySuccess/>}/>
            </Route>
            <Route path="/dashboard" element={<AppLayout/>}>
                <Route index element={<Dashboard/>}/>
            </Route>
        </Routes>

    )
}

export default App
