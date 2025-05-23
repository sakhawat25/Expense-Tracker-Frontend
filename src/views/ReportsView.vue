<script setup lang="ts">
import api from '@/api'
import Layout from '@/components/Layout.vue'
import LineChart from '@/components/LineChart.vue'
import PieChart from '@/components/PieChart.vue'
import { onMounted, reactive, ref } from 'vue'

const formData = reactive({
    from: '',
    to: '',
})

const validationErrors = reactive({
    from: null,
    to: null,
})

const lineChartLabels = ref([])
const lineChartValues = ref([])
const pieChartLabels = ref([])
const pieChartValues = ref([])
const expenses = ref([])

const handleFilter = async () => {
    clearErrors()

    try {
        await api.get('/sanctum/csrf-cookie')
        const response = await api.post('/api/v1/reports/filter', formData)

        updateCharts(response.data.data)
    } catch (error) {
        console.error(error)
        const errors = error?.response?.data?.errors

        if (errors) {
            validationErrors.from = errors.from || null
            validationErrors.to = errors.to || null
        }
    }
}

const updateCharts = ({ expensesPerCategory, expensesPerMonth, wholeYearExpenses }) => {
    lineChartLabels.value = expensesPerMonth.map(item => Object.keys(item)[0])
    lineChartValues.value = expensesPerMonth.map(item => Object.values(item)[0])

    pieChartLabels.value = expensesPerCategory.map(item => item.name)
    pieChartValues.value = expensesPerCategory.map(item => item.expenses_sum_amount)

    expenses.value = wholeYearExpenses
}

const formatDate = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

const clearErrors = () => {
    Object.keys(validationErrors).forEach(key => validationErrors[key] = null)
}

onMounted(async () => {
    const now = new Date();
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1); // Jan 1st
    const lastDayOfYear = new Date(now.getFullYear(), 11, 31); // December 31st

    formData.from = formatDate(firstDayOfYear)
    formData.to = formatDate(lastDayOfYear)

    try {
        const response = await api.get('/api/v1/reports')

        updateCharts(response.data.data)
    } catch (error) {
        console.error(error)
    }
})
</script>

<template>
    <Layout>
        <!-- Header -->
        <div class="flex items-center justify-between">
            <h2 class="text-3xl">Reports</h2>
        </div>

        <div class="bg-white flex flex-col gap-8 px-8 py-4 shadow-lg">
            <h3 class="text-xl">Filter Reports</h3>
            <ul v-if="validationErrors.from || validationErrors.to"
                class="list-disc px-10 py-2 text-white rounded-lg bg-red-400 shadow-lg">
                <li v-for="(message, index) in validationErrors.from || []" :key="index">{{ message }}</li>
                <li v-for="(message, index) in validationErrors.to || []" :key="index">{{ message }}</li>
            </ul>
            <form @submit.prevent="handleFilter">
                <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end md:justify-center">
                    <div class="flex flex-col gap-2">
                        <label class="text-indigo-700" for="from">From</label>
                        <input v-model="formData.from"
                            class="outline-none border-1 border-indigo-600 text-indigo-700 px-4 py-2 focus:border-indigo-700"
                            type="date" id="from">
                        <!-- <small class="text-red-500">This is an error</small> -->
                    </div>
                    <div class="flex flex-col gap-2">
                        <label class="text-indigo-700" for="to">To</label>
                        <input v-model="formData.to"
                            class="outline-none border-1 border-indigo-600 text-indigo-700 px-4 py-2 focus:border-indigo-700"
                            type="date" id="to">
                    </div>
                    <button
                        class="delay-50 duration-200 outline-none px-4 py-2 text-white transition-all bg-indigo-500 cursor-pointer hover:bg-indigo-700 hover:scale-105">
                        Apply Filter
                    </button>
                </div>
            </form>
        </div>

        <div class="bg-white flex flex-col gap-8 px-8 py-4 shadow-lg">
            <h3 class="text-xl">Monthly Expense Trend</h3>
            <div class="flex items-center justify-evenly">
                <LineChart :labels="lineChartLabels" :data="lineChartValues" />
            </div>
        </div>

        <div class="bg-white flex flex-col gap-8 px-8 py-4 shadow-lg">
            <h3 class="text-xl">Category-wise Expense</h3>
            <div class="flex items-center justify-evenly">
                <PieChart :labels="pieChartLabels" :data="pieChartValues" />
            </div>
        </div>

        <div class="bg-white flex flex-col gap-8 px-8 py-4 shadow-lg">
            <h3 class="text-xl">Expense Breakdown</h3>
            <table class="w-full table-auto border-collapse text-sm">
                <thead class="bg-indigo-600 text-white">
                    <tr>
                        <th class="p-4 px-2">
                            <p class="block text-sm font-normal leading-non">
                                #
                            </p>
                        </th>
                        <th class="p-4">
                            <p class="block text-sm font-normal leading-non">
                                Category
                            </p>
                        </th>
                        <th class="p-4">
                            <p class="block text-sm font-normal leading-non">
                                Amount
                            </p>
                        </th>
                        <th class="p-4">
                            <p class="block text-sm font-normal leading-non">
                                Date
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(expense, index) in expenses" :key="index" :class="['hover:bg-slate-50 border-b border-slate-200 text-center',
                        index % 2 === 0
                            ? 'bg-white'
                            : 'bg-slate-50'
                    ]">
                        <td class="px-2 py-5">
                            <p class="block font-semibold text-sm">
                                <i class="pi pi-circle-fill text-indigo-600"></i>
                            </p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="block text-sm text-slate-800">{{ expense.category?.name }}</p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="block text-sm text-slate-800">${{ expense.amount }}</p>
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