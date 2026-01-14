import axios from "axios";

const instance=axios.create({
    baseURL:"https://inboxified.vercel.app/api/v1"
    // baseURL:"http://localhost:5000/api/v1"
})

export const base="https://curryentreprise.vercel.app/"
export const baseApi="https://inboxified.vercel.app/api/v1"

// export const base="http://localhost:5173"
export default instance

