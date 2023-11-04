import React, { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import Dashboard from '../views/Dashboard';
import Project from '../views/Project';

const routeList = [
    {
        path: '/',
        key: '/',
        element: <Dashboard />,
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
    }
]

const RenderRouter = () => {
    const element = useRoutes(routeList);
    return element;
};
export const localRoutes = routeList;
export default RenderRouter;