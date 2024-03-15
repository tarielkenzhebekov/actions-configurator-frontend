<script setup>
import { Chart as ChartJS, Tooltip, Legend, Title, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { onMounted, ref, watch } from 'vue';

import AppNavbar from '@/components/AppNavbar.vue';
import PieChart from '@/components/charts/PieChart.vue';
import BarChart from '@/components/charts/BarChart.vue';
import Stacked100BarChart from '@/components/charts/Stacked100BarChart.vue';
import HorizontalBarChart from '@/components/charts/HorizontalBarChart.vue';
import DoughnutChart from '@/components/charts/DoughnutChart.vue';
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

const actionsCount = ref();
const totalIncome = ref();
const overallIncome = ref([]);
const activeAndNonActiveActions = ref([]);
const totalAmount = ref([]);
const promocodesSold = ref([]);
const ticketsSold = ref([]);
const promocodesUsed = ref([]);
const ticketsUsed = ref([]);

const stagesAmount = ref([]);
const stagesSold = ref([]);
const stagesNotSold = ref([]);
const stagesUsed = ref([]);
const stagesNotUsed = ref([]);
const stagesIncome = ref([]);

const actionAmount = ref();
const actionSold = ref();
const actionUsed = ref();
const actionIncome = ref();

const actionSoldPieChartData = ref([]);
const actionUsedPieChartData = ref([]);

const actionSoldImage = ref();
const actionUsedImage = ref();

const actionAmountCardTitle = ref();
const actionSoldCardTitle = ref();
const actionUsedCardTitle = ref();
const actionIncomeCardTitle = ref();

const actionAmountBarChartTitle = ref();
const actionSoldPieChartTitle = ref();
const actionUsedPieChartTitle = ref();
const actionIncomeBarChartTitle = ref();
const actionSoldStackedBarChartTitle = ref();
const actionUsedStackedBarChartTitle = ref();

const colors = ['rgb(252, 53, 95)', 'rgb(54, 162, 235)']

const actions = ref([{
  id: -1, name: 'Общая статистика'
}])
const select = ref();
const overallSelected = ref(true);

const fetchOverallStats = () => {
  loaded.value = false;
  StatisticsService.findAll()
    .then((data) => {
      actionsCount.value = data.actionsAmount;
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

const fetchActionStats = (id, type) => {
  loaded.value = false;
  StatisticsService.findById(id, type)
    .then((response) => {
        stagesAmount.value = response.data.map((stage) => stage.amount);
        stagesSold.value = response.data.map((stage) =>  stage.sold);
        stagesNotSold.value = response.data.map((stage) =>  stage.amount - stage.sold);
        stagesUsed.value = response.data.map((stage) =>  stage.used);
        stagesNotUsed.value = response.data.map((stage) =>  stage.sold - stage.used);
        stagesIncome.value = response.data.map((stage) => stage.income);


        actionAmount.value = stagesAmount.value.reduce((accumulator, currentValue) => {
          return accumulator + currentValue
        }, 0);
        actionSold.value = stagesSold.value.reduce((accumulator, currentValue) => {
          return accumulator + currentValue
        }, 0);
        actionUsed.value = stagesUsed.value.reduce((accumulator, currentValue) => {
          return accumulator + currentValue
        }, 0);
        actionIncome.value = stagesIncome.value.reduce((accumulator, currentValue) => {
          return accumulator + currentValue
        }, 0);

        actionSoldPieChartData.value = [actionSold.value, actionAmount.value - actionSold.value];
        actionUsedPieChartData.value = [actionUsed.value, actionSold.value - actionUsed.value];

        if (type === 'TICKET') {
          actionSoldImage.value = '/images/ticket.png';
          actionUsedImage.value = '/images/ticket_used.png';
          actionAmountCardTitle.value = 'Всего билетов выставлено на продажу';
          actionSoldCardTitle.value = 'Всего продано билетов';
          actionUsedCardTitle.value = 'Использовано билетов';
          actionIncomeCardTitle.value = 'Общая выручка от продажи билетов';
          actionAmountBarChartTitle.value = 'Количество билетов выставленных на продажу на каждом этапе'
          actionSoldPieChartTitle.value = 'Продано билетов';
          actionUsedPieChartTitle.value = 'Использовано билетов из проданных';
          actionIncomeBarChartTitle.value = 'Выручка от продажи билетов на каждом этапе';
          actionSoldStackedBarChartTitle.value = 'Процент продажи билетов';
          actionUsedStackedBarChartTitle.value = 'Процент использования проданных билетов';
        } else {
          actionSoldImage.value = '/images/promocode.png';
          actionUsedImage.value = '/images/promocode_used.png';
          actionAmountCardTitle.value = 'Всего промокодов выставлено на продажу';
          actionSoldCardTitle.value = 'Всего продано промокодов';
          actionUsedCardTitle.value = 'Использовано промокодов';
          actionIncomeCardTitle.value = 'Общая выручка от продажи промокодов';
          actionAmountBarChartTitle.value = 'Количество промокодов выставленных на продажу на каждом этапе';
          actionSoldPieChartTitle.value = 'Продано промокодов';
          actionUsedPieChartTitle.value = 'Использовано промокодов из проданных';
          actionIncomeBarChartTitle.value = 'Выручка от продажи промокодов на каждом этапе';
          actionSoldStackedBarChartTitle.value = 'Процент продажи промокодов';
          actionUsedStackedBarChartTitle.value = 'Процент использования проданных промокодов';
        }

        loaded.value = true;
      }
    );
}

const fetchSelectedValue = () =>{
  localStorage.setItem('select', JSON.stringify(select.value))

  try {
    if (select.value.id === -1) {
      overallSelected.value = true;
      fetchOverallStats();
    } else {
      overallSelected.value = false;
      fetchActionStats(select.value.id, select.value.type);
    }
  } catch (err) {
    console.log(err);
  }
}

onMounted( () => {
  try {
    const localSelect = localStorage.getItem('select');
    select.value = localSelect ? JSON.parse(localSelect) : actions.value[0];

    fetchSelectedValue();
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
      <v-row v-if="overallSelected">
        <v-col
          cols="3"
          lg="3"
          md="6"
          sm="12"
        >
          <ChartCard
            v-if="loaded"
            img-url="/images/discount.png"
            title="Количество акций"
            :number="actionsCount"
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
            v-if="loaded"
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
            v-if="loaded"
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
            v-if="loaded"
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
            v-if="loaded"
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
            v-if="loaded"
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
            v-if="loaded"
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
      <v-row v-else>
        <v-col
          cols="6"
          lg="6"
          md="6"
          sm="12"
        >
          <ChartCard
            v-if="loaded"
            img-url="/images/sale.png"
            :title="actionAmountCardTitle"
            :number="actionAmount"
          >
            <div id="chart4" class="chart-container">
              <BarChart
                v-if="loaded"
                :data="stagesAmount"
                :colors="['rgb(252, 53, 95)']"
                :title-text="actionAmountBarChartTitle"
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
            v-if="loaded"
            :img-url="actionSoldImage"
            :title="actionSoldCardTitle"
            :number="actionSold"
          >
            <PieChart
              v-if="loaded"
              :data="actionSoldPieChartData"
              :labels="['Продано', 'Остаток']"
              :colors="colors"
              :title-text="[actionSoldPieChartTitle]"
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
            v-if="loaded"
            :img-url="actionUsedImage"
            :title="actionUsedCardTitle"
            :number="actionUsed"
          >
            <PieChart
              v-if="loaded"
              :data="actionUsedPieChartData"
              :labels="['Использовано', 'Остаток']"
              :colors="colors"
              :title-text="[actionUsedPieChartTitle]"
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
            v-if="loaded"
            img-url="/images/income.png"
            :title="actionIncomeCardTitle"
            :number="actionIncome"
          >
            <div id="chart5" class="chart-container">
              <BarChart
                v-if="loaded"
                :data="stagesIncome"
                :label="'Билеты'"
                :colors="['rgb(252, 53, 95)']"
                :title-text="actionIncomeBarChartTitle"
              />
            </div>
          </ChartCard>
        </v-col>
        <v-col
          cols="6"
          lg="6"
          md="6"
          sm="12"
        >
          <ChartCard
            v-if="loaded"
            img-url="/images/sold.png"
            :title="actionSoldCardTitle"
            :number="actionSold"
          >
            <div id="chart6" class="chart-container">
              <Stacked100BarChart
                v-if="loaded"
                :sold="stagesSold"
                :remaining="stagesNotSold"
                :labels="['Продано', 'Остаток']"
                :colors="['rgb(252, 53, 95)', 'rgb(242, 182, 195)']"
                :title-text="actionSoldStackedBarChartTitle"
              />
            </div>
          </ChartCard>
        </v-col>
        <v-col
          cols="6"
          lg="6"
          md="6"
          sm="12"
        >
          <ChartCard
            v-if="loaded"
            img-url="/images/used.png"
            :title="actionUsedCardTitle"
            :number="actionUsed"
          >
            <div id="chart7" class="chart-container">
              <Stacked100BarChart
                v-if="loaded"
                :sold="stagesUsed"
                :remaining="stagesNotUsed"
                :labels="['Использовано', 'Остаток']"
                :colors="['rgb(252, 53, 95)', 'rgb(242, 182, 195)']"
                :title-text="actionUsedStackedBarChartTitle"
              />
            </div>
          </ChartCard>
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