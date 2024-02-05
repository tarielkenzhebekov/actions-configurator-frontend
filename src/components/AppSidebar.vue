<script setup>

</script>

<template>
  <v-container>
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/74.jpg"
          title="Mashrab Buranov"
          subtitle="mashrabburanov@gmail.com"
        >
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-creation" title="Акции" value="action"></v-list-item>
        <v-list-item prepend-icon="mdi-account-multiple" title="Абоненты" value="subscriber"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="Пользователи" value="user"></v-list-item>
        <v-list-item prepend-icon="mdi-chart-bar" title="Статистика" value="statistics"></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<style scoped lang="scss">
  
</style>