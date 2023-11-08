import Cookies from "js-cookie"
import React, { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { api } from "../helpers/helper"

const VerifyRegistration = () => {
    const isVerified = Cookies.get("isVerified")
    const id = Cookies.get("id")
    const token = Cookies.get("token")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState()
    const verifyOtp = async (e) => {
        e.preventDefault()
        console.log(otp)
        setLoading(true)
        try {
            const res = await fetch(`${api}/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    id,
                    otp,
                }),
            })
            if (res.status === 200) {
                toast.success("Successfully Verified!", {
                    position: toast.POSITION.TOP_CENTER,
                })
                Cookies.set("isVerified", true)
                navigate("/onboard")
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    if (isVerified == "true") {
        return (
            <main className='h-screen w-full flex justify-center items-center '>
                <section className=' py-8 px-6 flex flex-col gap-4 bg-[#242424] rounded-lg'>
                    <h1 className=' text-4xl font-bold text-center'>VERIFICATION</h1>
                    <h2 className='text-center text-2xl'>wohoo ! You are already Verified...</h2>
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
                <h1 className='text-4xl font-bold text-center'>VERIFICATION</h1>
                <form onSubmit={verifyOtp} className='flex flex-col gap-4'>
                    <span className='flex flex-col gap-2'>
                        <label htmlFor='otp'>OTP</label>
                        <input onChange={(e) => setOtp(e.target.value)} className='rounded-lg px-4 py-2 bg-bgbg outline-none focus:outline-sky-400 hover:outline-sky-400' type='number' maxLength='4' placeholder='Enter your OTP' />
                    </span>

                    <button className='rounded-lg px-4 py-2 bg-sky-400 hover:bg-sky-400/50' type='submit'>
                        {loading ? <i class='fa-solid fa-spinner fa-spin-pulse fa-spin-reverse'></i> : "Verify"}
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

export default VerifyRegistration
