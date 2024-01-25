<template>
  <form @submit.prevent="saveChanges">
    <label for="editFirstName">Имя:</label>
    <input type="text" id="editFirstName" required>

    <label for="editLastName">Фамилия:</label>
    <input type="text" id="editLastName" required>

    <label for="editEmail">Email:</label>
    <input type="email" id="editEmail" required>

    <label for="editRole">Роль:</label>
    <select id="editRole" required>
      <option value="Пользователь">Пользователь</option>
      <option value="Администратор">Администратор</option>
      <option value="Менеджер">Менеджер</option>
    </select>

    <button type="submit">{{ text }}</button>
  </form>
</template>

<script>
export default {
  props: {
    userToEdit: Object,
    text: String
  },
  data() {
    return {
      editedUser: { ...this.userToEdit },
    };
  },
  methods: {
    saveChanges() {
      this.$emit('save-changes', this.editedUser);
    },
  },
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
