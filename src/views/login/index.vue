<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin" class="login-form">
      <div>
        <label for="email">Username:</label>
        <input type="text" id="email" v-model="email" required class="form-input" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required class="form-input" />
      </div>
      <button type="submit" class="submit-button">Login</button>
    </form>
  </div>
</template>

<script>
import { authStore } from "../../store/AuthModule";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      const user = {
        email: this.email,
        password: this.password,
      };

      try {
        await authStore.login(user);
        this.$router.push({ name: 'actions' });
        console.log("Successfully logged in");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  display: grid;
  gap: 10px;
  padding: 1rem;
  width: fit-content;
  border: solid 2px #BAE8FA;
  border-radius: 1rem;
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;
}

.form-input {
  border: solid 2px #BAE8FA;
  border-radius: 1rem;
  line-height: 2rem;
  padding: 0.5rem;
}

label {
  font-weight: bold;
}

.submit-button {
  background-color: #BAE8FA;
  color: #fff;
  padding: 8px 12px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}
</style>
