import Cookies from "js-cookie"
import React, { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { api } from "../helpers/helper"

const Onboard = () => {
    const isFilled = Cookies.get("isFilled")
    const id = Cookies.get("id")
    const token = Cookies.get("token")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [handle, setHandle] = useState("")
    const [bio, setBio] = useState("")

    const fillData = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(`${api}/onboard`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    id,
                    name,
                    handle,
                    bio,
                }),
            })
            if (res.status === 200) {
                toast.success("Welcome to PigeonPost!", {
                    position: toast.POSITION.TOP_CENTER,
                })
                Cookies.set("isFilled", true)
                navigate("/")
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    if (isFilled == "true") {
        return (
            <main className='h-screen w-full flex justify-center items-center '>
                <section className=' py-8 px-6 flex flex-col gap-4 bg-[#242424] rounded-lg'>
                    <h1 className=' text-4xl font-bold text-center'>ONBOARD</h1>
                    <h2 className='text-center text-2xl'>wohoo ! You already Onboarded...</h2>
                    <h4 className='text-center text-white/70'>Please click button below to visit homepage</h4>
                    <Link to='/' className='rounded-lg text-center px-4 py-2 border border-sky-400 bg-sky-400' type='button'>
                        Home
                    </Link>
                </section>
            </main>
        )
    }

    return (
        <main className='h-screen w-full flex justify-center items-center '>
            <section className=' py-8 px-6 flex flex-col gap-4 bg-[#242424] rounded-lg'>
                <h1 className='text-4xl font-bold text-center'>ONBOARD</h1>
                <form onSubmit={fillData} className='flex flex-col gap-4'>
                    <span className='flex flex-col gap-2'>
                        <label htmlFor='name'>NAME</label>
                        <input onChange={(e) => setName(e.target.value)} className='rounded-lg px-4 py-2 bg-bgbg outline-none focus:outline-sky-400 hover:outline-sky-400' type='text' placeholder='Enter your Name' />
                    </span>
                    <span className='flex flex-col gap-2'>
                        <label htmlFor='handle'>@HANDLE</label>
                        <input onChange={(e) => setHandle(e.target.value)} className='rounded-lg px-4 py-2 bg-bgbg outline-none focus:outline-sky-400 hover:outline-sky-400' type='text' placeholder='Enter your Handle' />
                    </span>
                    <span className='flex flex-col gap-2'>
                        <label htmlFor='bio'>BIO</label>
                        <textarea onChange={(e) => setBio(e.target.value)} className='rounded-lg px-4 py-2 bg-bgbg outline-none focus:outline-sky-400 hover:outline-sky-400' type='text' placeholder='Enter your Bio' name='bio' cols='30' rows='4' maxLength='200'></textarea>
                    </span>
                    <button className='rounded-lg px-4 py-2 bg-sky-400 hover:bg-sky-400/50' type='submit'>
                        {loading ? <i class='fa-solid fa-spinner fa-spin-pulse fa-spin-reverse'></i> : "Verify"}
                    </button>
                </form>
            </section>
        </main>
    )
}

export default Onboard
