import axios from "axios"
import { useUserStore } from '@/stores/UserStore.js'


const axiosInstance = axios.create({
  baseURL: "http://localhost:8814/api",
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()

    if (userStore.isLoggedIn) {
      console.log(`Bearer ${userStore.getAccessToken}`)
      config.headers.Authorization = `Bearer ${userStore.getAccessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)


export default axiosInstance