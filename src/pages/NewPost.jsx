import Cookies from "js-cookie"
import React, { useState } from "react"
import { api } from "../helpers/helper"
import { toast } from "react-toastify"

const NewPost = () => {
    const [content, setContent] = useState("")
    const [char, setChar] = useState(0)
    const setCount = (e) => {
        setContent(e.target.value)
        setChar(e.target.value.length)
    }
    const token = Cookies.get("token")
    const id = Cookies.get("id")

    const submitPost = (e) => {
        e.preventDefault()
        if (!content || !token || !id) return null
        try {
            fetch(`${api}/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    content,
                    owner: id,
                }),
            }).then((res) => {
                if (res.status === 201) {
                    toast.success("Successfully Posted!", {
                        position: toast.POSITION.TOP_CENTER,
                    })
                    setContent("")
                } else {
                    toast.error("Something went wrong!", {
                        position: toast.POSITION.TOP_CENTER,
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className='h-screen w-full flex justify-center items-center '>
            <section className=' py-8 px-6 flex flex-col gap-4 bg-[#242424] rounded-lg w-full max-w-lg'>
                <h1 className='text-4xl font-bold text-center'>NEW POST</h1>
                <form onSubmit={submitPost} className='flex flex-col gap-4'>
                    <span className='flex flex-col gap-2'>
                        <textarea onChange={setCount} className='rounded-lg px-4 py-2 bg-bgbg outline-none focus:outline-sky-400 hover:outline-sky-400 resize-y hide-scroll' placeholder='Whats on your mind ?' cols='30' rows='8' maxLength='200' required></textarea>
                    </span>
                    <h6>Max Character Limit : {char >= 200 ? <span className='text-red-400'>{char}/200</span> : <span>{char}/200</span>}</h6>
                    <button className='rounded-lg px-4 py-2 bg-sky-400 hover:bg-sky-400/50' type='submit'>
                        POST
                    </button>
                </form>
            </section>
        </main>
    )
}

export default NewPost
