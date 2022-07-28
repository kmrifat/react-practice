import WebLayout from "../views/webpages/WebLayout";
import AppLayout from "../views/dashboard/AppLayout";
import JobDetails from "../views/webpages/pages/JobDetails";

const routes = [
    {
        path: '/',
        component: WebLayout,
        routes: [
            {
                path: '/job/single',
                component: JobDetails
            }
        ]
    },
    {
        path: '/dashboard',
        component: AppLayout
    }
]