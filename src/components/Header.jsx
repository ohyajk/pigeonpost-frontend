import React from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
const Header = () => {
    const paths = ["/register", "/login", "/verify", "/onboard"]
    const location = useLocation()
    const navigate = useNavigate()

    if (paths.includes(location.pathname)) {
        return null
    }

    const clearCookies = () => {
        Cookies.remove("token")
        Cookies.remove("id")
        Cookies.remove("isVerified")
        Cookies.remove("isFilled")
        navigate("/login")
    }

    return (
        <header className='bg-[#242424] px-4 border-b border-sky-400 flex justify-center items-center h-20 w-full'>
            <nav className='flex justify-between items-center w-full max-w-[1440px]'>
                <img className='h-20 ' src='./logo.svg' alt='logo' />
                <ul className='text-xl font-bold flex gap-8 items-center'>
                    <NavLink to='/' className={({ isActive }) => `${isActive ? "text-sky-400" : ""} flex gap-2 items-center hover:text-sky-400`}>
                        <i className='fa-solid fa-house'></i>
                        <li>HOME</li>
                    </NavLink>
                    <NavLink to='/search' className={({ isActive }) => `${isActive ? "text-sky-400" : ""} flex gap-2 items-center hover:text-sky-400`}>
                        <i className='fa-solid fa-magnifying-glass'></i>
                        <li>SEARCH</li>
                    </NavLink>
                    <NavLink to='/new' className={({ isActive }) => `${isActive ? "text-sky-400" : ""} flex gap-2 items-center hover:text-sky-400`}>
                        <i className='fa-solid fa-pen-to-square'></i>
                        <li>NEW POST</li>
                    </NavLink>
                    <NavLink to='/profile' className={({ isActive }) => `${isActive ? "text-sky-400" : ""} flex gap-2 items-center hover:text-sky-400`}>
                        <i className='fa-solid fa-user'></i>
                        <li>MY PROFILE</li>
                    </NavLink>
                </ul>
                <button onClick={clearCookies} className='text-xl font-bold flex gap-2 items-center hover:text-sky-400'>
                    <i className='fa-solid fa-right-from-bracket'></i>
                    <span>LOGOUT</span>
                </button>
            </nav>
        </header>
    )
}

export default Header
