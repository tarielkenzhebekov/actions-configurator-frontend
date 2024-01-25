<template>
  <div class="edit-user-form">
    <h1>Изменить пользователя</h1>
    <UserForm :text="'Сохранить'" />
  </div>
</template>

<script>
import UserForm from "@/views/users/components/UserForm";
export default {
  components: {UserForm},
  props: {
    text: String,
  }
};
</script>

<style scoped>
.edit-user-form {
  max-width: 400px;
  margin: 20px auto;
}
</style>
