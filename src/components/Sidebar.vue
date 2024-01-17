<template>
  <div :class="{ 'sidebar': true, 'closed': isClosed }">
    <div class="sidebar-open-close">
      <v-icon v-if="!isClosed" @click="toggleSidebar">mdi-close</v-icon>
      <v-icon v-if="isClosed" @click="toggleSidebar">mdi-chevron-double-right</v-icon>
    </div>
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="Лого" class="logo" />
    </div>
    <router-link to="/actions" class="sidebar-link" :class="{ 'selected': $route.path === '/actions' }">
      <span v-if="!isClosed">Акции</span>
      <v-icon>mdi-format-list-bulleted</v-icon>
    </router-link>
    <router-link to="/users" class="sidebar-link" :class="{ 'selected': $route.path === '/users' }">
      <span v-if="!isClosed">Пользователи</span>
      <v-icon>mdi-account</v-icon>
    </router-link>
    <router-link to="/statistics" class="sidebar-link" :class="{ 'selected': $route.path === '/statistics' }">
      <span v-if="!isClosed">Статистика</span>
      <v-icon>mdi-chart-bar</v-icon>
    </router-link>
    <router-link to="/subscribers" class="sidebar-link" :class="{ 'selected': $route.path === '/subscribers' }">
      <span v-if="!isClosed">Абоненты</span>
      <v-icon>mdi-account-group</v-icon>
    </router-link>
    <div class="button-container">
      <router-link to="/logout" class="logout-button" :class="{ 'selected': $route.path === '/logout' }">
        <span v-if="!isClosed">Выйти</span>
        <v-icon>mdi-exit-to-app</v-icon>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Sidebar',
  data() {
    return {
      isClosed: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isClosed = !this.isClosed;
    },
  },
};
</script>

<style scoped>
.sidebar {
  height: 100%;
  width: 20%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #BAE8FA;
  transition: width 0.3s ease;
}

.closed {
  width: 5%;
}

.logo-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  padding-top: 0;
}

.logo {
  width: 40%;
  min-width: 3rem;
}

.sidebar-link {
  padding: 1rem;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 2px white;
  border-top: solid 1px white;
  transition: background-color 0.3s ease;
}

.sidebar-link v-icon {
  margin-left: 1rem;
}

.button-container {
  padding: 1rem;
  display: flex;
  justify-content: space-around;
}

.sidebar-link span {
  margin-left: 1rem;
}

.sidebar-link.selected {
  background-color: white;
  color: black;
}

.sidebar-open-close {
  text-align: right;
}

.logout-button {
  border: solid 2px white;
  padding: 0.5rem 1rem;
  font-size: 18px;
  font-weight: bold;
  border-radius: 0.5rem;
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: white;
  color: black;
}
</style>
