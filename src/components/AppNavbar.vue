<script setup>
import AppSidebar from './AppSidebar.vue'

</script>

<template>
  <v-container>
    <v-app-bar>
      <v-app-bar-title>
        <v-avatar :tile="true">
          <img src="@/assets/logo.png" alt="logo">
        </v-avatar>
        Конфигуратор Акций
      </v-app-bar-title>
      <v-btn icon="mdi-magnify"></v-btn>
      <v-btn icon="mdi-export"></v-btn>
    </v-app-bar>
    
    <AppSidebar></AppSidebar>
  </v-container>  
</template>

<style scoped lang="scss">
  
</style>