<template>
  <form @submit.prevent="saveChanges">
    <label for="editFirstName">Имя:</label>
    <input type="text" id="editFirstName" v-model="editedUser.firstName" required>

    <label for="editLastName">Фамилия:</label>
    <input type="text" id="editLastName" v-model="editedUser.lastName" required>

    <label for="editEmail">Email:</label>
    <input type="email" id="editEmail" v-model="editedUser.email" required>

    <label v-if="isEditForm" for="password">Password</label>
    <input v-if="isEditForm" type="password" id="password" v-model="editedUser.password" required>

    <label for="editRole">Роль:</label>
    <select id="editRole" v-model="editedUser.role" required>
      <option value="USER">Пользователь</option>
      <option value="ADMINISTRATOR">Администратор</option>
      <option value="MANAGER">Менеджер</option>
    </select>

    <button type="submit">{{ text }}</button>
  </form>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  props: {
    text: String
  },
  data() {
    return {
      editedUser: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: ""
      },
      isEditForm: false,
    };
  },
  methods: {
    getUser(id) {
      UserService.get(id)
        .then(response => {
          this.editedUser = response.data.result;
        })
        .catch(e => {
          console.log(e);
        });
    },
    saveChanges() {
      console.log("User: ", this.editedUser)
      UserService.create(this.editedUser)
        .then(response => {
          console.log(response.data)
        })
      this.$router.push({ name: 'users' });
    }
  },
  mounted() {
    console.log('Before getUser:', this.editedUser);
    this.isEditForm = this.$route.params.userId === undefined;
    if (!this.isEditForm) {
      this.getUser(this.$route.params.userId);
    }
  }
};
</script>

<style scoped>
form {
  display: grid;
  gap: 10px;
  padding: 1rem;
  border: solid 2px #BAE8FA;
  border-radius: 1rem;
}

form input, select{
  border: solid 2px #BAE8FA;
  border-radius: 1rem;
  line-height: 2rem;
  padding: 0.5rem;
}

label {
  font-weight: bold;
}

button {
  background-color: #BAE8FA;
  color: #fff;
  padding: 8px 12px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}
</style>
