import axios from "axios"

const axiosInstance = axios.create({
    baseURL: import.meta.mode === "development" ? "http://localhost:7000/api" : "/api",
    withCredentials: true //allows to send cookies to the server
})

export default axiosInstance