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
import ChartCard from '@/components/ChartCard.vue'

const paddingPlugin = {
  id: 'customPaddingPlugin',
  beforeInit(chart) {
    const originalFit = chart.legend.fit;
    chart.legend.fit = function fit() {
      originalFit.bind(chart.legend)();
      this.height += 15;
    }
  }
}

ChartJS.register(
  Tooltip,
  Legend,
  Title,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  paddingPlugin);

const loaded = ref(false);

const actionsAmount = ref();
const totalIncome = ref();
const overallIncome = ref([]);
const activeAndNonActiveActions = ref([]);
const totalAmount = ref([]);
const promocodesSold = ref([]);
const ticketsSold = ref([]);
const promocodesUsed = ref([]);
const ticketsUsed = ref([]);

const colors = ['rgb(252, 53, 95)', 'rgb(54, 162, 235)']

onMounted( () => {
  try {
    StatisticsService.findAll()
      .then((data) => {
        console.log(data);
        actionsAmount.value = data.actionsAmount;
        totalIncome.value = data.totalIncome;
        overallIncome.value = [data.ticketsIncome, data.promocodesIncome];
        activeAndNonActiveActions.value = [data.activatedActionsAmount, data.actionsAmount - data.activatedActionsAmount];
        totalAmount.value = [data.ticketsAmount, data.promocodesAmount];
        promocodesSold.value = [data.promocodesSold, data.promocodesAmount - data.promocodesSold];
        ticketsSold.value = [data.ticketsSold, data.ticketsAmount - data.ticketsSold];
        promocodesUsed.value = [data.promocodesUsed, data.promocodesSold - data.promocodesUsed];
        ticketsUsed.value = [data.ticketsUsed, data.ticketsSold - data.ticketsUsed];
        loaded.value = true;
      });
  } catch(err) {
    console.log(err);
  }
})
</script>

<template>
  <AppNavbar></AppNavbar>
  <v-main class="mx-8 pt-10">

    <v-row class="d-flex">
      <v-col
        cols="3"
        lg="3"
        md="6"
        sm="12"
      >
        <ChartCard
          img-url="/images/discount.png"
          title="Количество акций"
          :number="actionsAmount"
        >
          <PieChart
            v-if="loaded"
            :data="activeAndNonActiveActions"
            :labels="['Активные', 'Неактивные']"
            :colors="colors"
            :title-text="['Соотношение активных и неактивных акций']"
          />
        </ChartCard>
      </v-col>
      <v-col
        cols="3"
        lg="3"
        md="6"
        sm="12"
      >
        <ChartCard
          img-url="/images/income.png"
          title="Доход (в сомах)"
          :number="totalIncome"
        >
          <PieChart
            v-if="loaded"
            :data="overallIncome"
            :labels="['Билеты', 'Промокоды']"
            :colors="colors"
            :title-text="['Доход от билетов и промокодов']"
          />
        </ChartCard>
      </v-col>
      <v-col
        cols="6"
        lg="6"
        md="6"
        sm="12"
      >
        <ChartCard
          img-url="/images/sale.png"
          title="Всего выставлено на продажу билетов и промокодов"
          :number="totalAmount[0] + totalAmount[1]"
        >
          <div id="chart3" class="chart-container">
            <HorizontalBarChart
              v-if="loaded"
              :data="totalAmount"
              :labels="['Билеты', 'Промокоды']"
              :colors="colors"
              :title-text="['Общее количество билетов и промокодов,', 'выставленные на продажу']"
              :data-labels="['Общее']"
            />
          </div>
        </ChartCard>
      </v-col>
      <v-col
        cols="3"
        lg="3"
        md="6"
        sm="12"
      >
        <ChartCard
          img-url="/images/promocode.png"
          title="Продано промокодов"
          :number="promocodesSold[0]"
        >
          <DoughnutChart
            v-if="loaded"
            :data="promocodesSold"
            :labels="['Продано', 'Остаток']"
            :colors="colors"
            :title-text="['Количество проданных промокодов']"
          />
        </ChartCard>
      </v-col>
      <v-col
        cols="3"
        lg="3"
        md="6"
        sm="12"
      >
        <ChartCard
          img-url="/images/ticket.png"
          title="Продано билетов"
          :number="ticketsSold[0]"
        >
          <DoughnutChart
            v-if="loaded"
            :data="ticketsSold"
            :labels="['Продано', 'Остаток']"
            :colors="colors"
            :title-text="['Количество проданных билетов']"
          />
        </ChartCard>
      </v-col>
      <v-col
        cols="3"
        lg="3"
        md="6"
        sm="12"
      >
        <ChartCard
          img-url="/images/promocode_used.png"
          title="Использовано промокодов"
          :number="promocodesUsed[0]"
        >
          <DoughnutChart
            v-if="loaded"
            :data="promocodesUsed"
            :labels="['Использовано', 'Остаток']"
            :colors="colors"
            :title-text="['Количество использованных промокодов']"
          />
        </ChartCard>
      </v-col>
      <v-col
        cols="3"
        lg="3"
        md="6"
        sm="12"
      >
        <ChartCard
          img-url="/images/ticket_used.png"
          title="Использовано билетов"
          :number="ticketsUsed[0]"
        >
          <DoughnutChart
            v-if="loaded"
            :data="ticketsUsed"
            :labels="['Использовано', 'Остаток']"
            :colors="colors"
            :title-text="['Количество использованных билетов']"
          />
        </ChartCard>
      </v-col>
    </v-row >

<!--    Temporary Delimiter -->
    <v-row>
      <v-col cols="6">
        <div id="chart4" class="chart-container">
          <BarChart
            v-if="loaded"
            :data="totalAmount"
            :label="'Билеты'"
            :colors="['rgb(252, 53, 95)']"
            :title-text="['Bar chart для этапов']"
          />
        </div>
      </v-col>
      <v-col cols="6">
        <div id="chart6" class="chart-container">
          <Stacked100BarChart
            :sold="[432, 919, 123]"
            :remaining="[54, 500, 50]"
            :labels="['Продано билетов', 'Остаток билетов']"
            :colors="['rgb(252, 53, 95)', 'rgb(242, 182, 195)']"
            :title-text="['Коэффициент конверсии для билетов', 'на каждом этапе']"
          />
        </div>
      </v-col>
      <v-col cols="6">
        <div id="chart7" class="chart-container"><StackedBarChart /></div>
      </v-col>
    </v-row>
  </v-main>
</template>

<style scoped>
  .chart-container {
    width: 650px;
    height: 300px;
  }
</style>