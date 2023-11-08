import React from "react"
import { Navigate } from "react-router-dom"
import Cookies from "js-cookie"

function AuthRoute({ children }) {
    const token = Cookies.get("token")
    const isVerified = Cookies.get("isVerified")
    const isFilled = Cookies.get("isFilled")
    if (!token) {
        return <Navigate to='/login' />
    } else if (isVerified == "false") {
        return <Navigate to='/verify' />
    } else if (isFilled == "false") {
        return <Navigate to='/onboard' />
    } else {
        return children
    }
}
export default AuthRoute
