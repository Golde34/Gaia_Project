import React, { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import Dashboard from '../views/Dashboard';

const routeList = [
    {
        path: '/',
        key: '/',
        element: <Dashboard />,
    }
]

const RenderRouter = () => {
    const element = useRoutes(routeList);
    return element;
};
export const localRoutes = routeList;
export default RenderRouter;