<template>
  <div id="app">
    <div>
      <Sidebar />
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  data: () => {
    return {
      user: null,
    };
  },
  components: {
    Sidebar
  },
  mounted() {
    const activeUser = JSON.parse(localStorage.getItem('user'));
    console.log("Active user: ", activeUser);
    if(!activeUser) {
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style scoped>
.content {
  margin-left: 20%;
  padding: 1rem;
}
</style>
