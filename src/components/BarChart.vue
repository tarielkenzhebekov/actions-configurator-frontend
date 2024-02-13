<script setup>
import { Bar } from 'vue-chartjs';

import { getChartLabelPlugin } from 'chart.js-plugin-labels-dv'

const DATA_COUNT = 3; // Get from API
const dataLabels = [];
const ticketValues = [252, 200, 261];
const promocodeValues = [159, 390, 203];

for (let i = 1; i <= DATA_COUNT; ++i) {
  dataLabels.push('Этап ' + i);
}

const chartData = {
  labels: dataLabels,
  datasets: [
    {
      label: 'Билеты',
      data: ticketValues,
      backgroundColor: 'rgb(252, 53, 95)',
      borderColor: 'rgba(255, 255, 255)',
      borderWidth: 1,
      borderRadius: 10,
    }, {
      label: 'Промокоды',
      data: promocodeValues,
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgba(255, 255, 255)',
      borderWidth: 1,
      borderRadius: 10,
    }
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    labels: {
      render: 'value',
      precision: 1,
      position: 'outside',
      textMargin: 6
    },
    title: {
      display: true,
      text: 'Количество проданных билетов и промокодов на каждом этапе',
      position: 'bottom',
      font: {
        'size': 15
      }
    },
    legend: {
      align: 'end'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grace: 20
    }
  }
};

const chartPlugins = [ getChartLabelPlugin() ];

</script>

<template>
    <Bar
      id="bar-chart-1"
      :options="chartOptions"
      :data="chartData"
      :plugins="chartPlugins"
    />
</template>
