import Cookies from "js-cookie"
import React, { useState } from "react"
import { api } from "../helpers/helper"
const Search = () => {
    const token2 = Cookies.get("token")
    const id = Cookies.get("id")
    const [name, setName] = useState("")
    const [searchData, setSearchData] = useState([])
    const [loading, setLoading] = useState(false)

    const getUsers = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await fetch(`${api}/users?userQuery=${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token2}`,
            },
        })
        const data = await res.json()
        setSearchData(data)
        setLoading(false)
    }

    const follow = async (myId, userId) => {
        const res = await fetch(`${api}/follow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token2}`,
            },
            body: JSON.stringify({
                myId,
                userId,
            }),
        })
        const data = await res.json()
    }

    const unfollow = async (myId, userId) => {
        const res = await fetch(`${api}/unfollow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token2}`,
            },
            body: JSON.stringify({
                myId,
                userId,
            }),
        })
        const data = await res.json()
    }

    return (
        <section className='flex flex-col items-center pt-8 gap-4'>
            <h1 className='text-3xl font-bold'>Search Your Friends Here...</h1>
            <form onSubmit={getUsers} className='flex justify-center gap-2'>
                <input onChange={(e) => setName(e.target.value)} className='px-4 py-2 outline-none bg-[#242424] text-white/70 border border-sky-400 rounded-lg' type='text' required />
                <input className='px-4 py-2 bg-sky-400 rounded-lg cursor-pointer hover:bg-sky-800' type='submit' value='SEARCH' />
            </form>
            <div className='bg-[#242424] max-w-md w-full p-4 flex flex-col gap-4 border border-white/10'>
                <div className='flex justify-center text-center items-center'>
                    {!loading && !searchData.data && <span>Search results will appear here...</span>}
                    {loading && <i className='fa-solid fa-spinner fa-spin-pulse fa-2x'></i>}
                </div>
                {!loading &&
                    searchData?.data?.map((a) => {
                        return (
                            <div className='flex gap-2 justify-between items-center w-full p-4 border border-white/10'>
                                <p className='flex gap-4 items-center'>
                                    <span className='h-12 w-12 bg-sky-400 text-xl text-center flex justify-center items-center font-bold rounded-full'>{a.name[0].toUpperCase()}</span>
                                    <h2 className='flex flex-col w-fit'>
                                        <span className='text-xl font-bold'>{a.name}</span>
                                        <span className='opacity-50'>@{a.handle}</span>
                                    </h2>
                                </p>
                                {a._id == id || a.followers.some((s) => s == id) ? (
                                    ""
                                ) : (
                                    <button onClick={() => follow(id, a._id)} className='border border-sky-400 px-4 py-2 rounded-lg hover:bg-sky-400'>
                                        Follow
                                    </button>
                                )}
                                {a.followers.some((s) => s == id) ? (
                                    <button onClick={() => unfollow(id, a._id)} className='border border-sky-400 px-4 py-2 rounded-lg hover:bg-sky-400'>
                                        Unfollow
                                    </button>
                                ) : null}
                            </div>
                        )
                    })}
            </div>
        </section>
    )
}

export default Search
