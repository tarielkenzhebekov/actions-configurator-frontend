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
  components: {
    Sidebar
  }
};
</script>

<style scoped>
.content {
  margin-left: 20%;
  padding: 1rem;
}
</style>
