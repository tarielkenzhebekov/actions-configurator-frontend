import { defineStore } from "pinia"
import AuthService from "@/services/AuthService"


const userStore = {
  state: () => {
    return {
      status: { loggedIn: false },
      userData: {
        accessToken: null,
        refreshToken: null,
      },
    }
  },
  getters: {
    isLoggedIn: (state) => state.status.loggedIn,
    getAccessToken: (state) => state.userData.accessToken,
    getRefreshToken: (state) => state.userData.refreshToken,
  },
  actions: {
    async login(user) {
      try {
        this.userData = await AuthService.authenticate(user)
        if ((this.getAccessToken !== null) && (this.getAccessToken !== undefined)) {
          this.status.loggedIn = true
        } else {
          this.status.loggedIn = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    logout() {
      this.status.loggedIn = false
      this.userData.accessToken = null
      this.userData.refreshToken = null
    }
  },
}


export const useUserStore = defineStore("user", userStore)