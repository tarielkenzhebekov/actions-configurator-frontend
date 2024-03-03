<script setup>
import { Bar } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const props = defineProps({
  data: Object,
  labels: Array,
  colors: Array,
  titleText: Array
})

const datasets = [];

for (let i = 0; i < props.data.length; i++) {
    const dataset = {
        label: props.labels[i],
        data: [props.data[i]],
        backgroundColor: props.colors[i],
        borderColor: 'rgba(255, 255, 255)',
        borderWidth: 1,
        borderRadius: 10,
    };
    datasets.push(dataset);
}
const dataLabels = ['Общее'];

const chartData = {
  labels: dataLabels,
  datasets: datasets
};

const chartOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
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
    },
    datalabels: {
        align: 'end',
        color: 'rgb(40, 40, 40)'
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      grace: 5
    }
  }
};

const chartPlugins = [ ChartDataLabels ];

</script>

<template>
    <Bar
      id="bar-chart-1"
      :options="chartOptions"
      :data="chartData"
      :plugins="chartPlugins"
    />
</template>
