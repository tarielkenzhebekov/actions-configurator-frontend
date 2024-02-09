import axios from "@/plugins/axios"

class AuthService {
  async authenticate(user) {
    const userData = await axios.post('/auth/authenticate', {
        email: user.email,
        password: user.password
    })
    return {
      accessToken: userData.data.access_token,
      refreshToken: userData.data.refresh_token
    }
  }
}

export default new AuthService()