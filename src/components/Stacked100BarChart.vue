<script setup>
import { Bar } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartjsPluginStacked100 from "chartjs-plugin-stacked100";

const props = defineProps({
  sold: Array,
  remaining: Array,
  labels: Array,
  colors: Array,
  titleText: Array
})

const dataLabels = [];

for (let i = 1; i <= props.sold.length; ++i) {
  dataLabels.push('Этап ' + i);
}

const chartData = {
  labels: dataLabels,
  datasets: [
    {
      label: props.labels[0],
      data: props.sold,
      stack: 'stack-1',
      backgroundColor: props.colors[0],
      borderColor: 'rgb(255, 255, 255)',
      borderWidth: 1,
      borderRadius: {
        bottomLeft: 10,
        bottomRight: 10
      },
      borderSkipped: false
    }, {
      label: props.labels[1],
      data: props.remaining,
      stack: 'stack-1',
      backgroundColor: props.colors[1],
      borderColor: 'rgb(255, 255, 255)',
      borderWidth: 1,
      borderRadius: {
        topLeft: 10,
        topRight: 10
      },
    }
  ],
};

const chartOptions = {
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
      align: 'end',
      fullSize: false
    },
    stacked100: {
      enable: true,
      precision: 1
    },
    datalabels: {
      color: 'rgb(40, 40, 40)',

      formatter: (_value, context) => {
        const data = context.chart.data;
        const { datasetIndex, dataIndex } = context;
        return `${data.calculatedData[datasetIndex][dataIndex]}%`;
      },
    }
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: true
    }
  }
};

const chartPlugins = [ ChartDataLabels, ChartjsPluginStacked100 ]

</script>

<template>
    <Bar
      id="bar-chart-3"
      :options="chartOptions"
      :data="chartData"
      :plugins="chartPlugins"
    />
</template>
