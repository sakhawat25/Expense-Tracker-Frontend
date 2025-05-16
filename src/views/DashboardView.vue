<script setup>
import DoughnutChart from '@/components/DoughnutChart.vue'
import Layout from '@/components/Layout.vue'
import StatCard from '@/components/StatCard.vue'
</script>

<template>
    <Layout>
        <!-- Header -->
        <div class="flex">
            <h2 class="text-3xl">Dashboard</h2>
        </div>

        <!-- Cards -->
        <div class="grid gap-8 lg:grid-cols-3">
            <StatCard title="Total Expenses" value="1200" icon="pi-cart-arrow-down" iconColor="red" />
            <StatCard title="This Month" value="300" icon="pi-calendar" iconColor="yellow" />
            <StatCard title="Categories" value="5" icon="pi-list" iconColor="green" />
        </div>

        <!-- Chart -->
        <div class="bg-white flex flex-col gap-8 px-8 py-4">
            <h3 class="text-xl">Expenses Breakdown</h3>
            <div class="flex items-center justify-evenly">
                <!-- <canvas id="expenseChart"></canvas> -->
                <DoughnutChart />
            </div>
        </div>

        <!-- Recent Expenses -->
        <div class="bg-white flex flex-col gap-8 px-8 py-4">
            <h3 class="text-xl">Recent Expenses</h3>

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