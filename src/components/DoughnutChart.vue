<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
    labels: Array,
    data: Array,
})

// Dynamically computed chart data
const chartData = computed(() => ({
    labels: props.labels,
    datasets: [
        {
            backgroundColor: ['#EB9100', '#06DC5F', '#0092F4', '#9933C1', '#CC1A06'],
            data: props.data,
            hoverOffset: 4,
        }
    ]
}))

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
}
</script>

<template>
    <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>