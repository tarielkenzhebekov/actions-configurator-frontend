<script setup>
import { Bar } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartjsPluginStacked100 from "chartjs-plugin-stacked100";

const DATA_COUNT = 3; // Get from API
const dataLabels = [];
const ticketsSold = [432, 919, 123];
const ticketsRemaining = [54, 500, 50];
const promocodesSold = [1234, 138, 92];
const promocodesRemaining= [400, 53, 22];

for (let i = 1; i <= DATA_COUNT; ++i) {
  dataLabels.push('Этап ' + i);
}

const chartData = {
  labels: dataLabels,
  datasets: [
    {
      label: 'Продано билетов',
      data: ticketsSold,
      stack: 'stack-1',
      backgroundColor: 'rgb(252, 53, 95)',
      borderColor: 'rgb(255, 255, 255)',
      borderWidth: 1,
      borderRadius: {
        bottomLeft: 10,
        bottomRight: 10
      },
      borderSkipped: false
    }, {
      label: 'Остаток билетов',
      data: ticketsRemaining,
      stack: 'stack-1',
      backgroundColor: 'rgb(242, 182, 195)',
      borderColor: 'rgb(255, 255, 255)',
      borderWidth: 1,
      borderRadius: {
        topLeft: 10,
        topRight: 10
      },
    }, {
      label: 'Продано промокодов',
      data: promocodesSold,
      stack: 'stack-2',
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgba(255, 255, 255)',
      borderWidth: 1,
      borderRadius: {
        bottomLeft: 10,
        bottomRight: 10
      },
      borderSkipped: false
    }, {
      label: 'Остаток промокодов',
      data: promocodesRemaining,
      stack: 'stack-2',
      backgroundColor: 'rgb(144, 202, 240)',
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
      text: ['Коэффициент конверсии для билетов и промокодов', 'на каждом этапе'],
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
