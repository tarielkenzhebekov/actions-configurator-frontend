import { defineStore } from 'pinia';
import AuthService from '../services/AuthService';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    status: { loggedIn: false },
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => state.status.loggedIn,
    getUser: (state) => state.user,
  },
  actions: {
    async login(user) {
      try {
        const loggedInUser = await AuthService.login(user);
        this.loginSuccess(loggedInUser);
        return loggedInUser;
      } catch (error) {
        this.loginFailure();
        throw error;
      }
    },
    logout() {
      AuthService.logout();
      localStorage.clear();
      this.logoutSuccess();
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logoutSuccess(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
  },
});

export const authStore = useAuthStore();
