<script setup lang="ts">
import Layout from '@/components/Layout.vue'
import LineChart from '@/components/LineChart.vue'
import PieChart from '@/components/PieChart.vue'
import { onMounted, reactive } from 'vue'

const formData = reactive({
    from: '',
    to: '',
})

onMounted(() => {
    const now = new Date();
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1); // Jan 1st
    const lastDayOfYear = new Date(now.getFullYear(), 11, 31); // December 31st

    let year = firstDayOfYear.getFullYear();
    let month = String(firstDayOfYear.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    let day = String(firstDayOfYear.getDate()).padStart(2, '0');

    const from = `${year}-${month}-${day}`;

    year = lastDayOfYear.getFullYear();
    month = String(lastDayOfYear.getMonth() + 1).padStart(2, '0');
    day = String(lastDayOfYear.getDate()).padStart(2, '0');

    const to = `${year}-${month}-${day}`;

    formData.from = from
    formData.to = to
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
            <form>
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
                <!-- <canvas id="expenseChart"></canvas> -->
                <LineChart />
            </div>
        </div>

        <div class="bg-white flex flex-col gap-8 px-8 py-4 shadow-lg">
            <h3 class="text-xl">Category-wise Expense</h3>
            <div class="flex items-center justify-evenly">
                <!-- <canvas id="expenseChart"></canvas> -->
                <PieChart />
            </div>
        </div>

        <div class="bg-white flex flex-col gap-8 px-8 py-4 shadow-lg">
            <h3 class="text-xl">Expense Breakdown</h3>
            <table>
                <thead>
                    <tr>
                        <th class="p-4 px-2 border-b border-slate-300 bg-slate-50">
                            <p class="block text-sm font-normal leading-none text-slate-500">

                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-300 bg-slate-50">
                            <p class="block text-sm font-normal leading-none text-slate-500">
                                Category
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-300 bg-slate-50">
                            <p class="block text-sm font-normal leading-none text-slate-500">
                                Amount
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-300 bg-slate-50">
                            <p class="block text-sm font-normal leading-none text-slate-500">
                                Date
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="hover:bg-slate-50 border-b border-slate-200 text-center">
                        <td class="px-2 py-5">
                            <p class="block font-semibold text-sm">
                                <i class="fa fa-circle text-indigo-800"></i>
                            </p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="block text-sm text-slate-800">Food</p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="block text-sm text-slate-800">$1,200.00</p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="block text-sm text-slate-800">2024-08-01</p>
                        </td>
                    </tr>

                    <tr class="hover:bg-slate-50 border-b border-slate-200 text-center">
                        <td class="px-2 py-5">
                            <p class="block font-semibold text-sm">
                                <i class="fa fa-circle text-indigo-800"></i>
                            </p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="block text-sm text-slate-800">Food</p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="block text-sm text-slate-800">$1,200.00</p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="block text-sm text-slate-800">2024-08-01</p>
                        </td>
                    </tr>

                    <tr class="hover:bg-slate-50 border-b border-slate-200 text-center">
                        <td class="px-2 py-5">
                            <p class="block font-semibold text-sm">
                                <i class="fa fa-circle text-indigo-800"></i>
                            </p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="block text-sm text-slate-800">Food</p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="block text-sm text-slate-800">$1,200.00</p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="block text-sm text-slate-800">2024-08-01</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Layout>
</template>