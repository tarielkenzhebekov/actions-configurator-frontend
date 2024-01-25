<template>
    <v-container class="fill-height">
      <v-responsive class="align-center text-center fill-height">
        <h1 class="text-h2 font-weight-bold">Список пользователей</h1>
        <UserList/>
        <router-link to="/add-user">
          <div class="add-button">
            <button>Добавить</button>
            <v-icon>mdi-account-plus</v-icon>
          </div>
        </router-link>
      </v-responsive>
    </v-container>
  </template>

  <script lang="ts" setup>
  import UserList from "@/views/users/components/UserList.vue";
  </script>

<style>
h1{
  margin-bottom: 2rem;
}

.add-button {
  border: solid 2px #BAE8FA;
  padding: 0.5rem 1rem;
  font-size: 18px;
  font-weight: bold;
  border-radius: 0.5rem;
  text-decoration: none;
  position: fixed;
  right: 1rem;
  top: 2rem;
  background-color: white;
  color: black;
  display: flex;
  width: fit-content;
  justify-content: flex-end;
  align-items: center;
  transition: background-color 0.3s ease;
}

.add-button button{
  margin-right: 1rem;
  background-color: white;
  color: black;
}
</style>
