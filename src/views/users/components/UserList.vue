<template>
  <div class="container">
    <table>
      <thead>
      <tr class="table_container">
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Email</th>
        <th>Роль</th>
        <th>Действия</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="user in userList" :key="user.id" class="table_container">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <div>
              <router-link :to="'/edit-user/' + user.id" ><v-icon style="color: green; margin-right: 1rem">mdi-pencil</v-icon></router-link>
              <v-icon @click="deleteUser(user.id)" style="color: red;">mdi-delete</v-icon>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      userList: [],
    };
  },
  methods: {
    retrieveUsers() {
      UserService.getAll()
        .then(response => {
          this.userList = response.data.result;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteUser(userId) {
      console.log('Deleting user with ID:', userId);
    },
  },
  mounted() {
    this.retrieveUsers();
  }
};
</script>

<style scoped>
tbody, table{
  width: 100%;
  padding: 0.3rem;
}
.table_container{
  display: grid;
  grid-template-columns: 20% 20% 30% 20% 10%;
  width: 100%;
  text-align: left;
  padding: 1rem;
  border: solid 2px #BAE8FA;
  margin: 0.3rem;
  border-radius: 1rem;
}
a{
  color: black;
  text-decoration: none;
}
</style>
