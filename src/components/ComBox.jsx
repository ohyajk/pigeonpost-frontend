import React, { useState } from "react"
import { api, id, token } from "../helpers/helper"
import { comBoxState } from "../helpers/globalStates"
import postStore from "../state/homeState"
const ComBox = () => {
    const { getPosts } = postStore()
    const postId = comBoxState((state) => state.comState.postId)
    const [comment, setComment] = useState("")

    const addComment = async (e) => {
        e.preventDefault()
        const res = await fetch(`${api}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                content: comment,
                id,
                postId,
            }),
        }).then(() => {
            getPosts()
        })
        const data = await res.json()
        console.log(data)
    }

    return (
        <div className='w-full'>
            <div className=' h-full w-full flex justify-center items-center flex-col'>
                <form onSubmit={addComment} className=' border-white/30 rounded-lg relative flex flex-col gap-4 box-border w-full'>
                    <textarea onChange={(e) => setComment(e.target.value)} className='bg-bgbg outline-none p-2  text-white/80 border-2 border-white/25 rounded-lg' placeholder='Your Comment Here...' cols='30' rows='3'></textarea>
                    <button type='submit' className='py-2 px-4 bg-sky-400 hover:bg-sky-400/50  rounded-lg w-fit font-semibold'>
                        COMMENT
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ComBox
