import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ManageLayout from "../layouts/ManageLayout";
import QuestionLayout from "../layouts/QuestionLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import List from "../pages/manage/List";
import Trash from "../pages/manage/Trash";
import Star from "../pages/manage/Star";
import Edit from "../pages/question/Edit/Edit";
import Stat from "../pages/question/Stat/Stat";
import Suggestion from "../pages/Suggestion/Suggestion";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "/manage",
                element: <ManageLayout />,
                children: [
                    {
                        path: "list",
                        element: <List />,
                    },
                    {
                        path: "trash",
                        element: <Trash />,
                    },
                    {
                        path: "star",
                        element: <Star />,
                    },
                ],
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
    {
        path: "question",
        element: <QuestionLayout />,
        children: [
            {
                path: "edit/:cardId?",
                element: <Edit />,
            },
            {
                path: "stat/:cardId?",
                element: <Stat />,
            },
        ],
    },
    {
        path: "/suggestion",
        element: <Suggestion />
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;

export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const HOME_PATHNAME = "/";
export const MANAGE_INDEX_PATHNAME = "/manage/list";
