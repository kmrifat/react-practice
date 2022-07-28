import './styles/main.scss'
import { Routes, Route } from "react-router-dom";
import WebLayout from "./views/webpages/WebLayout";
import Home from "./views/webpages/pages/Home";
import JobDetails from "./views/webpages/pages/JobDetails";
import AppLayout from "./views/dashboard/AppLayout";


function App() {
    return (
        <Routes>
            <Route path="/" element={<WebLayout />}>
                <Route index element={<Home />} />
                <Route path="/job-details" element={<JobDetails />} />
            </Route>
            <Route path="/dashboard" element={<AppLayout />} />
        </Routes>
    )
}

export default App
