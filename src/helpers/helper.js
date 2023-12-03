import Cookies from "js-cookie"

export const api = import.meta.env.VITE_API_URL

export const token = Cookies.get("token")
export const id = Cookies.get("id")
export const name = Cookies.get("name")
export const handle = Cookies.get("handle")
