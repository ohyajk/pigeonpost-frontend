import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { create } from "zustand"
import { toast } from "react-toastify"
import { api } from "../helpers/helper"
import Cookies from "js-cookie"

const useStore = create((set, get) => ({
    email: "",
    pass: "",
    setEmail: (email) => set({ email }),
    setPass: (pass) => set({ pass }),
}))

const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { email, pass, setEmail, setPass } = useStore()

    const submit = async (e) => {
        e.preventDefault()
        if (!email || !pass) {
            return toast.warn("All Fields are required!", {
                position: toast.POSITION.TOP_CENTER,
            })
        }
        setLoading(true)
        try {
            const res = await fetch(`${api}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    pass,
                }),
            })
            const data = await res.json()
            console.log(data)
            if (res.status === 200) {
                const { token, isVerified, isFilled, id } = data
                const expirationDate = new Date(new Date().getTime() + 60 * 60000)
                Cookies.set("token", token, { expires: expirationDate })
                Cookies.set("isVerified", JSON.parse(isVerified), { expires: expirationDate })
                Cookies.set("isFilled", JSON.parse(isFilled), { expires: expirationDate })
                Cookies.set("id", id, { expires: expirationDate })
                setEmail("")
                setPass("")
                navigate("/")
            } else if (res.status === 401) {
                toast.error("Invalid Credentials !", {
                    position: toast.POSITION.TOP_CENTER,
                })
                setEmail("")
                setPass("")
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error("Server Error !", {
                position: toast.POSITION.TOP_CENTER,
            })
            setEmail("")
            setPass("")
            setLoading(false)
        }
    }

    return (
        <main className='h-screen w-full flex justify-center items-center'>
            <section className='py-8 px-6 flex flex-col gap-4 bg-[#242424] rounded-lg'>
                <h1 className='text-4xl font-bold text-center'>LOGIN</h1>
                <form onSubmit={submit} className='flex flex-col gap-4'>
                    <span className='flex flex-col gap-2'>
                        <label htmlFor='email'>Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className='rounded-lg px-4 py-2 bg-bgbg outline-none focus:outline-sky-400 hover:outline-sky-400' type='email' id='email' placeholder='Enter your email' />
                    </span>
                    <span className='flex flex-col gap-2'>
                        <label htmlFor='password'>Password</label>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} className='rounded-lg px-4 py-2 bg-bgbg outline-none focus:outline-sky-400 hover:outline-sky-400' type='password' id='password' placeholder='Enter your password' />
                    </span>
                    <button className='rounded-lg px-4 py-2 bg-sky-400 hover:bg-sky-400/50' type='submit'>
                        {loading ? <i class='fa-solid fa-spinner fa-spin-pulse fa-spin-reverse'></i> : "Login"}
                    </button>
                    <span className='text-center opacity-50'>OR</span>
                    <Link to='/register' className='rounded-lg text-center px-4 py-2 border border-sky-400 hover:bg-sky-400' type='button'>
                        Register
                    </Link>
                </form>
            </section>
        </main>
    )
}

export default Login
