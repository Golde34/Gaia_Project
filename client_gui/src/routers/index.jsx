import React, { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import Dashboard from '../views/Dashboard';
import Project from '../views/Project';
import SchedulingTable from '../views/SchedulingTable';
import TaskDashboard from '../views/TaskDashboard';
import SignIn from '../screens/authScreen/Signin';
import GaiaAutoSignin from '../screens/authScreen/GaiaAutoSignin';

// const schedule = [
//   {
//     id: 1,
//     title: "Opening Remarks",
//     startTime: "8:00am",
//     endTime: "8:30am",
//     track: 1,
//     presenter: "Jane Doe",
//     color: "#457b9d", // Dark blue
//   },
//   {
//     id: 2,
//     title: "Keynote: The Future of Tech",
//     startTime: "8:30am",
//     endTime: "10:00am",
//     track: 2,
//     presenter: "John Smith",
//     color: "#1d3557", // Navy blue
//   },
//   // More sessions...
// ];


const routeList = [
    {
        path: '/',
        key: '/',
        element: <GaiaAutoSignin />,
    },
    {
        path: '/signin',
        key: 'signin',
        element: <SignIn />,
    },
    {
        path: '/signup',
        key: 'signup',
        // element: <SignUp />,
    },
    {
        path: '/dashboard',
        key: 'dashboard',
        element: <Dashboard />,
    },
    {
        path: '/project',
        key: 'project',
        element: <Project />,
    },
    {
        path: '/project/:id',
        key: 'project-id',
        element: <TaskDashboard />,
    }
    // {
    //     path: '/scheduling-table',
    //     key: 'scheduling-table',
    //     element: <SchedulingTable schedule={schedule}/>,
    // }
]

const RenderRouter = () => {
    const element = useRoutes(routeList);
    return element;
};
export const localRoutes = routeList;
export default RenderRouter;