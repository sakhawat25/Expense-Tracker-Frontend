<script setup>
import DoughnutChart from '@/components/DoughnutChart.vue'
import Layout from '@/components/Layout.vue'
</script>

<template>
    <Layout>
        <!-- Dashboard Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div class="flex justify-between items-center p-6 bg-white shadow rounded-md">
                <div>
                    <h3 class="text-lg font-semibold text-gray-600">
                        Total Expenses
                    </h3>
                    <p class="text-2xl font-bold text-indigo-700">$1200</p>
                </div>

                <i class="pi pi-dollar text-4xl text-[#4a3e73]"></i>
            </div>

            <div class="flex justify-between items-center p-6 bg-white shadow rounded-md">
                <div>
                    <h3 class="text-lg font-semibold text-gray-600">This Month</h3>
                    <p class="text-2xl font-bold text-indigo-700">$300</p>
                </div>

                <i class="pi pi-calendar-times text-4xl text-[#4a3e73]"></i>
            </div>

            <div class="flex justify-between items-center p-6 bg-white shadow rounded-md">
                <div>
                    <h3 class="text-lg font-semibold text-gray-600">Categories</h3>
                    <p class="text-2xl font-bold text-indigo-700">5</p>
                </div>

                <i class="pi pi-list text-4xl text-[#4a3e73]"></i>
            </div>
        </div>

        <!-- Expense Chart -->
        <div class="mt-6 bg-white p-6 shadow rounded-md">
            <h3 class="text-lg font-semibold text-gray-700">Expense Breakdown</h3>
            <div class="h-64 sm:h-96 mt-4">
                <!-- <canvas id="expenseChart" class="w-full h-full"></canvas> -->
                <DoughnutChart />
            </div>
        </div>

        <!-- Expense List -->
        <div class="mt-6 bg-white p-6 shadow rounded-md overflow-x-auto">
            <h3 class="text-lg font-semibold text-gray-700">Recent Expenses</h3>
            <table class="w-full mt-4 border-collapse min-w-max">
                <thead>
                    <tr class="bg-gray-200 text-gray-700">
                        <th class="p-2 text-left">Date</th>
                        <th class="p-2 text-left">Category</th>
                        <th class="p-2 text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b">
                        <td class="p-2">2025-04-03</td>
                        <td class="p-2">Food</td>
                        <td class="p-2 text-right text-red-600">- $50</td>
                    </tr>
                    <tr class="border-b">
                        <td class="p-2">2025-04-02</td>
                        <td class="p-2">Transport</td>
                        <td class="p-2 text-right text-red-600">- $20</td>
                    </tr>
                    <tr class="border-b">
                        <td class="p-2">2025-04-02</td>
                        <td class="p-2">Transport</td>
                        <td class="p-2 text-right text-red-600">- $20</td>
                    </tr>
                    <tr class="border-b">
                        <td class="p-2">2025-04-02</td>
                        <td class="p-2">Transport</td>
                        <td class="p-2 text-right text-red-600">- $20</td>
                    </tr>
                    <tr class="border-b">
                        <td class="p-2">2025-04-02</td>
                        <td class="p-2">Transport</td>
                        <td class="p-2 text-right text-red-600">- $20</td>
                    </tr>
                    <tr class="border-b">
                        <td class="p-2">2025-04-02</td>
                        <td class="p-2">Transport</td>
                        <td class="p-2 text-right text-red-600">- $20</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Layout>
</template>