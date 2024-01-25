<template>
  <div class="edit-user-form">
    <h1>Изменить пользователя</h1>
    <UserForm :userToEdit="user" :text="'Сохранить'" @save-changes="handleSaveChanges" />
  </div>
</template>

<script>
import UserForm from "@/views/users/components/UserForm";
export default {
  components: {UserForm},
  props: {
    text: String,
    userToEdit: Object,
  },
  data() {
    return {
      editedUser: { ...this.userToEdit },
    };
  },
  methods: {
    saveChanges() {
      this.$emit('save-changes', this.editedUser);
      this.$router.push({ name: 'user-list' });
    },
  },
};
</script>

<style scoped>
.edit-user-form {
  max-width: 400px;
  margin: 20px auto;
}
</style>
