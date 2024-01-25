<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Имя пользователя:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Вместо этого места добавьте логику для отправки данных на сервер
      // Например, с использованием Axios или Fetch API
      console.log('Отправка данных:', this.username, this.password);

      // После успешной аутентификации можно перенаправить пользователя на другую страницу
      // Например, с использованием Vue Router: this.$router.push('/dashboard');
    }
  }
};
</script>

<style scoped>
/* Ваши стили здесь */
</style>
