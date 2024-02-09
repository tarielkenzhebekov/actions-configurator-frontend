<script setup>
import { onMounted, ref } from 'vue'
import AppNavbar from '@/components/AppNavbar.vue'
import ActionsService from '@/services/ActionsService.js'


const actions = ref([])
onMounted(() => {
  ActionsService.findAll()
    .then(response => {
      console.log(response)
      actions.value = response
    })
})
</script>

<template>
  <AppNavbar></AppNavbar>
  <v-main>
    <v-card>
      <v-data-table :items="actions"></v-data-table>
    </v-card>
  </v-main>
</template>

<style scoped lang="scss">

</style>