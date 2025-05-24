<script setup>
import api from '@/api'
import DoughnutChart from '@/components/DoughnutChart.vue'
import Layout from '@/components/Layout.vue'
import StatCard from '@/components/StatCard.vue'
import { onMounted, reactive, ref } from 'vue'

const stats = reactive({
    totalExpenses: 0,
    monthlyExpenses: 0,
    categoriesUsed: 0,
})

const chartLabels = ref([])
const chartValues = ref([])
const recentExpenses = ref([])

onMounted(async () => {
    try {
        await api.get('/sanctum/csrf-cookie')
        const response = await api.get('/api/v1/dashboard')

        const { totalExpenses, monthlyExpenses, categoriesUsed, expensesPerCategory, recentExpenses: recent } = response.data.data

        stats.totalExpenses = totalExpenses
        stats.monthlyExpenses = monthlyExpenses
        stats.categoriesUsed = categoriesUsed

        chartLabels.value = expensesPerCategory.map(item => item.name)
        chartValues.value = expensesPerCategory.map(item => item.expenses_sum_amount)

        recentExpenses.value = recent
    } catch (error) {
        console.error(error)
    }
})
</script>

<template>
    <Layout>
        <!-- Header -->
        <div class="flex">
            <h2 class="text-3xl">Dashboard</h2>
        </div>

        <!-- Cards -->
        <div class="grid gap-8 lg:grid-cols-3">
            <StatCard title="Total Expenses" :value="`$${stats.totalExpenses}`" icon="pi-cart-arrow-down"
                iconColor="red" />
            <StatCard title="This Month" :value="`$${stats.monthlyExpenses}`" icon="pi-calendar" iconColor="yellow" />
            <StatCard title="Categories" :value="stats.categoriesUsed" icon="pi-list" iconColor="green" />
        </div>

        <!-- Chart -->
        <div class="bg-white flex flex-col gap-8 px-8 py-4 shadow-lg">
            <h3 class="text-xl">Expenses Breakdown</h3>
            <div class="flex items-center justify-evenly">
                <DoughnutChart :labels="chartLabels" :data="chartValues" />
            </div>
        </div>

        <!-- Recent Expenses -->
        <div class="bg-white flex flex-col gap-8 px-8 py-4 shadow-lg">
            <h3 class="text-xl">Recent Expenses</h3>

            <table class="w-full table-auto border-collapse text-sm">
                <thead class="bg-indigo-600 text-white">
                    <tr>
                        <th class="p-4 px-2">
                            <p class="block text-sm font-normal leading-none">
                                #
                            </p>
                        </th>
                        <th class="p-4">
                            <p class="block text-sm font-normal leading-none">
                                Category
                            </p>
                        </th>
                        <th class="p-4">
                            <p class="block text-sm font-normal leading-none">
                                Amount
                            </p>
                        </th>
                        <th class="p-4">
                            <p class="block text-sm font-normal leading-none">
                                Date
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(expense, index) in recentExpenses" :key="index" :class="['hover:bg-slate-50 border-b border-slate-200 text-center',
                        index % 2 === 0
                            ? 'bg-white'
                            : 'bg-slate-50'
                    ]">
                        <td class="px-2 py-5">
                            <p class="block font-semibold text-sm">
                                <i class="pi pi-circle-fill text-indigo-800"></i>
                            </p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="block text-sm text-slate-800">{{ expense.category?.name }}</p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="block text-sm text-red-700">- ${{ expense.amount }}</p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="block text-sm text-slate-800">{{ expense.date }}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Layout>
</template>