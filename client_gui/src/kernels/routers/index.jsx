import React, { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import Dashboard from '../../views/Dashboard';
import Project from '../../views/task_manager/Project';
import SchedulingTable from '../../views/task_manager/SchedulingTable';
import TaskDashboard from '../../views/task_manager/TaskDashboard';
import SignIn from '../../screens/authScreen/Signin';
import GaiaAutoSignin from '../../screens/authScreen/GaiaAutoSignin';
import Microservices from '../../views/microservices_gui/Microservices';
import UserProfile from '../../views/user_gui/UserProfile';
import AuthManagerDashboard from '../../views/auth_service/UserManagerDashboard';

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

// Guest is public
// User is protected, only logged in when the Role higher than User
// Admin is protected, only logged in when the Role higher than Admin
// Boss is private, only logged in when the Role is Boss

const routeList = [
    {
        path: '/',
        key: 'root',
        element: <Navigate to="/gaia" replace />,
    },
    {
        path: '/gaia',
        key: 'gaia',
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
    },
    {
        path: '/microservices',
        key: 'microservices',
        element: <Microservices />,
    },
    {
        path: '/profile',
        key: 'profile',
        element: <UserProfile />,
    },
    {
        path: '/auth-manager',
        key: 'auth-manager',
        element: <AuthManagerDashboard />,
    },
    // {
    //     path: '/scheduling-table',
    //     key: 'scheduling-table',
    //     element: <SchedulingTable schedule={schedule}/>,
    // }
]

const RenderRouter = (props) => {
    const element = useRoutes(routeList);
    return element;
};
export const localRoutes = routeList;
export default RenderRouter;