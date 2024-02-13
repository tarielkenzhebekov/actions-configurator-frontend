<script setup>
import { Chart as ChartJS, Tooltip, Legend, Title, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js'

import AppNavbar from '@/components/AppNavbar.vue'
import PieChart from '@/components/PieChart.vue'
import BarChart from '@/components/BarChart.vue'
import StackedBarChart from '@/components/StackedBarChart.vue'
import Stacked100BarChart from '@/components/Stacked100BarChart.vue'

ChartJS.register(Tooltip, Legend, Title, ArcElement, CategoryScale, LinearScale, BarElement)
</script>

<template>
  <AppNavbar></AppNavbar>
  <v-container>
    <v-row>
      <v-col cols="6">
        <div id="chart1" class="chart-container"><PieChart /></div>
      </v-col>
      <v-col cols="6">
        <div id="chart2" class="chart-container"><BarChart /></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <div id="chart3" class="chart-container"><StackedBarChart /></div>
      </v-col>
      <v-col cols="6">
        <!-- Chart 4 -->
        <div id="chart4" class="chart-container"><Stacked100BarChart /></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .chart-container {
    width: 500px;
    height: 330px;
    border: 1px solid #ddd;
    border-radius: 10px;
    margin: 20px 5px;
  }
</style>