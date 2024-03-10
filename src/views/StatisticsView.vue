<script setup>
import { Chart as ChartJS, Tooltip, Legend, Title, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { onMounted, ref, watch } from 'vue';

import AppNavbar from '@/components/AppNavbar.vue';
import PieChart from '@/components/PieChart.vue';
import BarChart from '@/components/BarChart.vue';
import StackedBarChart from '@/components/StackedBarChart.vue';
import Stacked100BarChart from '@/components/Stacked100BarChart.vue';
import HorizontalBarChart from '@/components/HorizontalBarChart.vue';
import DoughnutChart from '@/components/DoughnutChart.vue';
import ChartCard from '@/components/ChartCard.vue';
import StatisticsService from '@/services/StatisticsService.js';
import ActionsService from '@/services/ActionsService.js';

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

const actions = ref([{
  id: -1, name: 'Общая статистика'
}])
const select = ref(
  actions.value[0]
);

const fetchOverallStats = () => {
  loaded.value = false;
  StatisticsService.findAll()
    .then((data) => {
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
}

const fetchActionStats = async(id, type) => {
  try {
    StatisticsService.findById(id, type)
      .then((response) =>
        console.log(response.data)
      );

  } catch (err) {
    console.log(err)
  }
}

onMounted( () => {
  try {
    fetchOverallStats();
    ActionsService.findAll()
      .then(response => {
        for (const element of response) {
          actions.value.push(element);
        }
      })
  } catch(err) {
    console.log(err);
  }
})

const fetchSelectedValue = () =>{
  console.log('Select value: ');
  console.log(select.value);
  try {
    if (select.value.id === -1) {
      fetchOverallStats();
    } else {
      fetchActionStats(select.value.id, select.value.type);
    }
  } catch (err) {
    console.log(err);
  }
}

watch(select, fetchSelectedValue);
</script>

<template>
  <AppNavbar></AppNavbar>
  <v-main>
    <v-container fluid>
      <v-row justify="end">
        <v-col cols="12" sm="4">
            <v-select
              v-model="select"
              :items="actions"
              item-title="name"
              item-value="id"
              label="Select"
              return-object
              single-line
            ></v-select>
        </v-col>
      </v-row>
      <v-row>
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
    </v-container>
  </v-main>
</template>

<style scoped>
  .chart-container {
    width: 650px;
    height: 300px;
  }
</style>