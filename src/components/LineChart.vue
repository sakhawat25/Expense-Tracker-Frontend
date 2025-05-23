<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js'

// Register Chart.js components
ChartJS.register(Title, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend)

const props = defineProps({
    labels: Array,
    data: Array,
})

// Dynamically computed chart data
const chartData = computed(() => ({
    labels: props.labels,
    datasets: [
        {
            label: 'Monthly Expenses',
            data: props.data,
            borderColor: 'rgb(79, 57, 246)',
        }
    ]
}))

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
}
</script>

<template>
    <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>