<script setup>
import { ref } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS } from 'chart.js'

// Register Chart.js components
ChartJS.register()

// Define reactive chart data and options
const chartData = ref({
    labels: ['Food', 'Transport', 'Shopping', 'Bills', 'Other'],
    datasets: [
        {
            data: [65, 59, 80, 65, 59],
            backgroundColor: ['#EB9100', '#06DC5F', '#0092F4', '#9933C1', '#CC1A06'],
            hoverOffset: 4,
        }
    ]
})

const chartOptions = ref({
    responsive: false,
    maintainAspectRatio: true,
})
</script>

<template>
    <Pie id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>