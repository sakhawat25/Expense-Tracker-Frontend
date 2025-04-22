<script setup>
import { ref } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

// Define reactive chart data and options
const chartData = ref({
    labels: ['Food', 'Transport', 'Shopping', 'Bills', 'Other'],
    datasets: [
        {
            backgroundColor: ['#EB9100', '#06DC5F', '#0092F4', '#9933C1', '#CC1A06'],
            data: [25, 25, 25, 25, 25]
        }
    ]
})

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
})
</script>

<template>
    <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>