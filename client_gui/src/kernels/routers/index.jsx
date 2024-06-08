import React, { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import Dashboard from '../../views/Dashboard';
import Project from '../../views/task_manager/Project';
import SchedulingTable from '../../views/schedule_plan/SchedulingTable';
import TaskDashboard from '../../views/task_manager/TaskDashboard';
import SignIn from '../../screens/authScreen/Signin';
import GaiaAutoSignin from '../../screens/authScreen/GaiaAutoSignin';
import Microservices from '../../views/microservices_gui/Microservices';
import UserProfile from '../../views/user_gui/UserProfile';
import AuthManagerDashboard from '../../views/auth_service/UserManagerDashboard';
import Calendar from '../../views/schedule_plan/Calendar';
import PrivilegeAndRoleDashboard from '../../views/auth_service/RoleAndPrivilegeDashboard';
import PrivilegeUrlSettings from '../../views/auth_service/PrivilegeUrlSettings';
import GaiaManagerDashboard from '../../views/gaia_management/GaiaManagerDashboard';
import UserTaskConnector from '../../views/user_gui/UserTaskConnector';

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
        path: '/user-task-connector',
        key: 'user-task-connector',
        element: <UserTaskConnector />,
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
        path: '/manager',
        key: 'manager',
        element: <GaiaManagerDashboard />,
    },
    {
        path: '/user-manager',
        key: 'user-manager',
        element: <AuthManagerDashboard />,
    },
    {
        path: '/privilege-role-dashboard',
        key: 'privilege-role-dashboard',
        element: <PrivilegeAndRoleDashboard />,
    },
    {
        path: '/privilege-url-settings',
        key: 'privilege-url-settings',
        element: <PrivilegeUrlSettings />,  
    },
    {
        path: '/schedule',
        key: 'schedule',
        element: <SchedulingTable/>,
    },
    {
        path: '/calendar',
        key: 'calendar',
        element: <Calendar />,
    }
]

const RenderRouter = (props) => {
    const element = useRoutes(routeList);
    return element;
};
export const localRoutes = routeList;
export default RenderRouter;