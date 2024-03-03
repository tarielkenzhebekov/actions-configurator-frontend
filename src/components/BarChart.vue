<script setup>
import { Bar } from 'vue-chartjs';

import { getChartLabelPlugin } from 'chart.js-plugin-labels-dv'

const props = defineProps({
  data: Array,
  label: String,
  colors: Array,
  titleText: Array
})

const dataLabels = [];

for (let i = 1; i <= props.data.length; ++i) {
  dataLabels.push('Этап ' + i);
}

const chartData = {
  labels: dataLabels,
  datasets: [{
    label: props.label,
    data: props.data,
    backgroundColor: props.colors,
    borderColor: 'rgba(255, 255, 255)',
    borderWidth: 1,
    borderRadius: 10,
  }]
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
      text: props.titleText,
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
