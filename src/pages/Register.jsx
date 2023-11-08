import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { create } from "zustand"
import { api } from "../helpers/helper"

const useStore = create((set, get) => ({
    email: "",
    pass: "",
    setEmail: (email) => set({ email }),
    setPass: (pass) => set({ pass }),
}))

const Register = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { email, pass, setEmail, setPass } = useStore()
    const submit = async (e) => {
        e.preventDefault()
        if (!email || !pass) {
            return toast.warn("All Fields are required !", {
                position: toast.POSITION.TOP_CENTER,
            })
        }
        setLoading(true)
        try {
            const res = await fetch(`${api}/user`, {
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
            if (res.status === 201) {
                toast.success("Successfully Registered !", {
                    position: toast.POSITION.TOP_CENTER,
                })
                setEmail("")
                setPass("")
                navigate("/login")
            } else if (data.error && data.error.code == 11000) {
                toast.error("User Already Exists !", {
                    position: toast.POSITION.TOP_CENTER,
                })
                setEmail("")
                setPass("")
                navigate("/login")
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <main className='h-screen w-full flex justify-center items-center'>
            <section className='py-8 px-6 flex flex-col gap-4 bg-[#242424] rounded-lg'>
                <h1 className='text-4xl font-bold text-center'>REGISTER</h1>
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
                        {loading ? <i class='fa-solid fa-spinner fa-spin-pulse fa-spin-reverse'></i> : "Register"}
                    </button>
                    <span className='text-center opacity-50'>OR</span>
                    <Link to='/login' className='rounded-lg text-center px-4 py-2 border border-sky-400 hover:bg-sky-400' type='button'>
                        Login
                    </Link>
                </form>
            </section>
        </main>
    )
}

export default Register
