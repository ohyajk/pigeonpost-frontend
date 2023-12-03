import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { api } from "../helpers/helper"
import { comBoxState } from "../helpers/globalStates"
import ComBox from "../components/ComBox"
import AllCom from "../components/AllCom"

const Profile = () => {
    const token = Cookies.get("token")
    const id = Cookies.get("id")
    const state = comBoxState((state) => state.comState.visible)
    const postId = comBoxState((state) => state.comState.postId)
    const { showComBox, hideComBox } = comBoxState()
    useEffect(() => {
        if (token && id) {
            fetch(`${api}/user/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setData(data)
                })
        }
        fetch(`${api}/posts/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setPosts(data)
            })
    }, [])
    const [posts, setPosts] = useState({})
    const [data, setData] = useState({})
    const { name, handle, following, followers } = data?.data || "loading"
    const allPosts = posts.data || []

    const deletePost = async (pid) => {
        await fetch(`${api}/post/${pid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => console.log("deleted"))
            .catch((err) => console.log(err))
    }

    return (
        <main className='py-8 flex justify-center'>
            <section className='w-full max-w-3xl flex flex-col items-center gap-2 p-4 rounded-lg bg-[#242424]'>
                <div className='h-24 w-24 bg-sky-400 text-6xl text-center flex justify-center items-center font-bold rounded-full'>{data?.data?.name[0]}</div>
                <h1 className='text-4xl font-bold text-center'>{name}</h1>
                <h2 className='text-2xl font-bold text-center'>@{handle}</h2>
                <span className='flex gap-4 text-xl p-2'>
                    <h4>Followers: {Array.isArray(followers) && followers.length}</h4>
                    <hr className='h-6 w-[2px] bg-white' />
                    <h4>Following: {Array.isArray(following) && following.length}</h4>
                </span>
                <hr className='w-full h-[2px] bg-white opacity-50' />
                <div className='flex w-full items-center justify-between px-6'>
                    <h4 className='text-lg opacity-80 font-bold'>All Posts</h4>
                    <h4 className='text-lg opacity-80 font-bold'>{allPosts.length}</h4>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    {allPosts.map((d) => {
                        return (
                            <div key={d._id} className='bg-bgbg rounded-lg border-sky-400/50 border w-full  p-4 flex flex-col gap-4'>
                                <span className='flex flex-col gap-2 break-words'>
                                    <div className='flex gap-2 items-center'>
                                        <span className='h-12 w-12 bg-sky-400 text-xl text-center flex justify-center items-center font-bold rounded-full'>{data?.data?.name[0]}</span>
                                        <h2 className='flex flex-col w-fit'>
                                            <span className='text-xl'>{data?.data?.name}</span>
                                            <span className='opacity-50'>@{data?.data?.handle}</span>
                                        </h2>
                                        <span className='flex flex-grow items-center justify-end gap-4 pr-2'>
                                            <i onClick={() => deletePost(d._id)} className='hover:text-sky-400 cursor-pointer fa-lg fa-solid fa-trash-can'></i>
                                        </span>
                                    </div>
                                    <p className='break-words '>{d.content}</p>
                                </span>
                                <span className='flex items-center gap-4'>
                                    <button className='flex justify-start items-center gap-2 hover:text-sky-400'>
                                        <i class='fa-solid fa-heart'></i>
                                        <h6>{d.likes.length}</h6>
                                    </button>
                                    <button onClick={() => (state == true ? hideComBox() : showComBox(d._id))} className='flex justify-start items-center gap-2 hover:text-sky-400'>
                                        <i className='fa-solid fa-comment'></i>
                                        <h6>{d.comments.length}</h6>
                                    </button>
                                </span>
                                {state && postId == d._id ? <ComBox /> : ""}
                                {state && postId == d._id ? <AllCom d={d} /> : ""}
                            </div>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}

export default Profile
