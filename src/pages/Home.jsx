import React, { useEffect, useState } from "react"
import { api, handle, name, id, token } from "../helpers/helper"
import { comBoxState } from "../helpers/globalStates"
import ComBox from "../components/ComBox"
import AllCom from "../components/AllCom"
import postStore from "../state/homeState"

const Home = () => {
    const { allPosts, getPosts, plusCount, minusCount, count, loading, loadTrue } = postStore()
    const state = comBoxState((state) => state.comState.visible)
    const postId = comBoxState((state) => state.comState.postId)
    const { showComBox, hideComBox } = comBoxState()
    console.log(allPosts)
    const postLike = async (postId) => {
        try {
            fetch(`${api}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    postId,
                    id,
                }),
            }).then(() => {
                getPosts()
            })
        } catch (error) {
            console.log(error)
        }
    }

    const removeLike = async (postId) => {
        try {
            fetch(`${api}/like`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    postId,
                    id,
                }),
            }).then(() => {
                getPosts()
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    if (loading) {
        return (
            <span className='flex flex-col gap-4 h-[calc(100vh-5rem)] justify-center items-center'>
                <i className='fa-solid fa-spinner fa-spin-pulse fa-4x'></i>
                <span className='text-2xl font-bold animate-pulse'>Loading please wait...</span>
            </span>
        )
    }
    if (allPosts.length == 0) {
        return (
            <span className='flex flex-col gap-2 h-[calc(100vh-5rem)] justify-center items-center'>
                <span className='text-xl font-bold animate-pulse'>No Posts to Show.</span>
                <span className='text-xl font-bold animate-pulse'>Follow People on search page to see content</span>
            </span>
        )
    }

    return (
        <section className='flex flex-col items-center my-4 gap-4'>
            <div className='flex flex-col gap-2 w-full justify-center max-w-3xl'>
                {allPosts?.data?.map((d) => {
                    return (
                        <div key={d._id} className='bg-[#242424] rounded-lg border-sky-400/50 border w-full  p-4 flex flex-col gap-4'>
                            <span className='flex flex-col gap-2 break-words'>
                                <div className='flex gap-2 items-center'>
                                    <span className='h-12 w-12 bg-sky-400 text-xl text-center flex justify-center items-center font-bold rounded-full'>{d.owner.name[0].toUpperCase()}</span>
                                    <h2 className='flex flex-col w-fit'>
                                        <span className='text-xl'>{d.owner.name}</span>
                                        <span className='opacity-50'>@{d.owner.handle}</span>
                                    </h2>
                                </div>
                                <p className='break-words '>{d.content}</p>
                            </span>
                            <span className='flex items-center gap-4'>
                                <button
                                    onClick={() => {
                                        d.likes.some((like) => like._id == id) ? removeLike(d._id) : postLike(d._id)
                                    }}
                                    className={`flex justify-start items-center gap-2 hover:text-sky-400 ${d.likes.some((like) => like._id == id) ? "text-sky-400" : ""}`}>
                                    <i className='fa-solid fa-heart'></i>
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
            <div className='flex items-center justify-center gap-2'>
                <button onClick={minusCount} className={`bg-sky-400 rounded-lg px-4 py-2 ${count == 1 && "opacity-70"}`}>
                    Prev Page
                </button>
                <h6>{count}</h6>
                <button onClick={plusCount} className={`bg-sky-400 rounded-lg px-4 py-2 ${count == allPosts?.totalPages && "opacity-70"}`}>
                    Next Page
                </button>
            </div>
        </section>
    )
}

export default Home
