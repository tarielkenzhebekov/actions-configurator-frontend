<script setup>
import { Doughnut } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getChartLabelPlugin } from 'chart.js-plugin-labels-dv'

const props = defineProps({
  data: Array,
  labels: Array,
  colors: Array,
  titleText: Array
})

const chartData = {
  labels: props.labels,
  datasets: [ {
    data: props.data,
    backgroundColor: props.colors,
    hoverOffset: 8
  }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      color: 'rgb(40, 40, 40)',
      formatter: ((value, ctx) => {
        return value;
      })
    },
    labels: {
      render: 'percentage',
      precision: 1,
      position: 'outside',
      textMargin: 6
    },
    title: {
      display: true,
      text: props.titleText,
      position: 'bottom',
      padding: 20,
      font: {
        'size': 15
      }
    },
    legend: {
      align: 'end'
    }
  }
};

const chartPlugins = [ ChartDataLabels, getChartLabelPlugin()];

</script>

<template>
  <Doughnut
    id="doughnut-chart-1"
    :options="chartOptions"
    :data="chartData"
    :plugins="chartPlugins"
  />
</template>
