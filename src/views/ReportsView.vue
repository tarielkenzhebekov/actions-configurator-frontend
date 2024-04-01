<script setup>

import AppNavbar from '@/components/AppNavbar.vue'
import ReportsService from '@/services/ReportsService.js'
import { onMounted, ref } from 'vue'

const reports = ref([]);

const headers = [
  { title: 'Название', value: 'name' },
  { title: 'Дата создания', value: 'dateCreated' },
  { text: 'Actions', value: 'actions', sortable: false }
];

const downloadFile = (report) => {
  console.log('I\'m inside downloadFile ' + report.id)
  ReportsService.findById(report.id)
    .then(response => {
      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = report.name;
      link.click();
      URL.revokeObjectURL(link.href);
    })
    .catch(e => console.log(e));
};

onMounted(async () => {
  reports.value = await ReportsService.findAll()
    .then(response => {
      return response;
    })
    .catch(e => console.log(e));
})

</script>

<template>
  <AppNavbar></AppNavbar>
  <v-main>
    <v-container class="w-66">
      <v-data-table
        :headers="headers"
        :items="reports"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            @click="downloadFile(item)"
          >
            mdi-download
          </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>

<style scoped>

</style>