import http from '../http-common.js';

class AuthService {
  login(user) {
    console.log("User: ", user)
    http.post('/auth/authenticate', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        console.log(response.data);
        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();
