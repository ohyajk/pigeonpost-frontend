import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./Layout.jsx"
import Profile from "./pages/Profile.jsx"
import Home from "./pages/Home.jsx"
import Search from "./pages/Search.jsx"
import NewPost from "./pages/NewPost.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import VerifyRegistration from "./pages/VerifyRegistration.jsx"
import Onboard from "./pages/Onboard.jsx"
import AuthRoute from "./helpers/AuthRoute.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: (
                    <AuthRoute>
                        <Home />
                    </AuthRoute>
                ),
            },
            {
                path: "/search",
                element: (
                    <AuthRoute>
                        <Search />
                    </AuthRoute>
                ),
            },
            {
                path: "/new",
                element: (
                    <AuthRoute>
                        <NewPost />
                    </AuthRoute>
                ),
            },
            {
                path: "/profile",
                element: (
                    <AuthRoute>
                        <Profile />
                    </AuthRoute>
                ),
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/verify",
                element: <VerifyRegistration />,
            },
            {
                path: "/onboard",
                element: <Onboard />,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
