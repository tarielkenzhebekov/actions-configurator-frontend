<script setup>
import { Chart as ChartJS, Tooltip, Legend, Title, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { onMounted, ref } from 'vue';

import AppNavbar from '@/components/AppNavbar.vue';
import PieChart from '@/components/PieChart.vue';
import BarChart from '@/components/BarChart.vue';
import StackedBarChart from '@/components/StackedBarChart.vue';
import Stacked100BarChart from '@/components/Stacked100BarChart.vue';
import HorizontalBarChart from '@/components/HorizontalBarChart.vue';
import DoughnutChart from '@/components/DoughnutChart.vue';
import StatisticsService from '@/services/StatisticsService.js';

ChartJS.register(Tooltip, Legend, Title, ArcElement, CategoryScale, LinearScale, BarElement);

const loaded = ref(false);

const overallIncome = ref([]);
const activeAndNonActiveActions = ref([]);
const totalAmount = ref([]);

const colors = ['rgb(252, 53, 95)', 'rgb(54, 162, 235)']

onMounted( () => {
  try {
    StatisticsService.findAll()
      .then((data) => {
        console.log(data);
        overallIncome.value = [data.ticketsIncome, data.promocodesIncome];
        activeAndNonActiveActions.value = [data.activatedActionsAmount, data.actionsAmount - data.activatedActionsAmount];
        totalAmount.value = [data.ticketsAmount, data.promocodesAmount];
        loaded.value = true;
      });
  } catch(err) {
    console.log(err);
  }
})
</script>

<template>
  <AppNavbar></AppNavbar>
  <v-container>
    <v-row>
      <v-col cols="6">
        <div id="chart1" class="chart-container">
          <PieChart
            v-if="loaded"
            :data="overallIncome"
            :labels="['Билеты', 'Промокоды']"
            :colors="colors"
            :title-text="['Доход от билетов и промокодов за весь период (в сомах)']"
          />
        </div>
      </v-col>
      <v-col cols="6">
        <div id="chart5" class="chart-container">
          <PieChart
            v-if="loaded"
            :data="activeAndNonActiveActions"
            :labels="['Активные', 'Неактивные']"
            :colors="colors"
            :title-text="['Соотношение активных и неактивных акций']"
          />
        </div>
      </v-col>
      <v-col cols="6">
        <div id="chart6" class="chart-container">
          <HorizontalBarChart
            v-if="loaded"
            :data="totalAmount"
            :labels="['Билеты', 'Промокоды']"
            :colors="colors"
            :title-text="['Общее количество билетов и промокодов,', 'выставленные на продажу']"
          />
        </div>
      </v-col>
      <v-col cols="6">
        <div id="chart2" class="chart-container"><BarChart /></div>
      </v-col>
      <v-col cols="6">
        <div id="chart7" class="chart-container">
          <DoughnutChart
            v-if="loaded"
            :data="totalAmount"
            :labels="['Билеты', 'Промокоды']"
            :colors="colors"
            :title-text="['Общее количество билетов и промокодов,', 'выставленные на продажу']"
          />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <div id="chart3" class="chart-container"><StackedBarChart /></div>
      </v-col>
      <v-col cols="6">
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