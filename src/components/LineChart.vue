<script setup>
import { ref } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

// Register Chart.js components
ChartJS.register(Title, CategoryScale, LinearScale, PointElement, LineElement)

// Define reactive chart data and options
const chartData = ref({
    labels: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'Monthly Expenses',
            data: [65, 59, 80, 65, 59, 80, 65, 59, 80, 65, 59, 80],
            borderColor: 'rgb(79, 57, 246)',
        }
    ]
})

const chartOptions = ref({
    responsive: false,
    maintainAspectRatio: true,
})
</script>

<template>
    <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>