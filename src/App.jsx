import './styles/main.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebLayout from "./views/webpages/WebLayout";
import Home from "./views/webpages/pages/Home";
import JobDetails from "./views/webpages/pages/JobDetails";
import JobApply from "./views/webpages/pages/JobApply";
import AppLayout from "./views/dashboard/AppLayout";
import { useEffect } from "react";


function App() {
    useEffect(() => {
        console.log("App")
    })
    return (
        <Routes>
            <Route path="/" element={<WebLayout />}>
                <Route index element={<Home />} />
                <Route path="/job-details/:slug" element={<JobDetails />} />
                <Route path='/job-apply/:slug' element={<JobApply />} />
            </Route>
            <Route path="/dashboard" element={<AppLayout />} />
        </Routes>

    )
}

export default App
