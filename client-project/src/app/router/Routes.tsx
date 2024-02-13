import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";

import Departmentdashboard from "../../features/departments/dashboard/departmentdashboard";
import App from "../layout/App";
import HomePage from "../home/homePage";
import NotFound from "../errors/NotFound";
import LoginForm from "../../features/users/LoginForm";
import RegisterForm from "../../features/users/RegisterForm";
import ServerError from "../errors/ServerError";
import TestErrors from "../../features/errors/TestError";

export const routes: RouteObject[] = [
    {
        path: '/', element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'departments', element: <Departmentdashboard />},
            {path: 'login', element: <LoginForm />},
            {path: 'register', element: <RegisterForm />},
            {path: 'errors', element: <TestErrors />},
            {path: 'not-found', element: <NotFound />},
            {path: 'server-error', element: <ServerError />},
            {path: '*', element: <Navigate replace to='/not-found' />},
        ]
    }
]

export const router = createBrowserRouter(routes);
