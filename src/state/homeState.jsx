import Cookies from "js-cookie"
import { create } from "zustand"
import { api, handle, name, id, token } from "../helpers/helper"

const postStore = create((set, get) => ({
    loading: false,
    loadTrue: () => set({ loading: true }),
    loadFalse: () => set({ loading: false }),
    count: 1,
    allPosts: [],
    plusCount: () => {
        const currentPage = get().count
        const totalPages = get().allPosts.totalPages
        if (currentPage < totalPages) {
            set((state) => ({ count: state.count + 1 }))
            get().getPosts()
        }
    },
    minusCount: () => {
        const currentPage = get().count
        if (currentPage > 1) {
            set((state) => ({ count: state.count - 1 }))
            get().getPosts()
        }
    },

    getPosts: async () => {
        get().loadTrue()
        const token2 = Cookies.get("token")
        const id = Cookies.get("id")
        const currentPage = get().count
        const res = await fetch(`${api}/posts?page=${currentPage}&userId=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token2}`,
            },
        })
        const data = await res.json()

        if (data.data && data.data.length > 0) {
            set({ allPosts: data })
        }
        get().loadFalse()
    },
}))

export default postStore
