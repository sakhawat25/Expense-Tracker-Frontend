<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DoughnutChart from '@/components/DoughnutChart.vue'
import Layout from '@/components/Layout.vue'
import StatCard from '@/components/StatCard.vue'
import axios from 'axios'

const isLoggingout = ref(false)
const authStore = useAuthStore()
const router = useRouter()

const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("mainContent");
    sidebar.classList.toggle("-translate-x-full");
    mainContent.classList.toggle("ml-64");
}

const handleLogout = async () => {
    isLoggingout.value = true
    const token = localStorage.getItem('token')

    try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        localStorage.removeItem('token')
        authStore.user = null

        setTimeout(() => {
            router.push({ name: 'login' })
        }, 100)
    } catch (error) {
        console.log(error.response)
        isLoggingout.value = false
    }
}
</script>

<template>
    <Layout>
        <!-- Main Content -->
        <main id="mainContent" class="flex-1 p-6 transition-all w-full md:ml-0">
            <header class="flex justify-between items-center bg-white p-4 shadow rounded-md">
                <!-- Toggle Sidebar Button for Mobile -->
                <button class="md:hidden px-4 py-2 bg-indigo-700 text-white rounded" @click="toggleSidebar">
                    <i class="pi pi-align-justify"></i>
                </button>
                <h2 class="text-xl font-semibold">Dashboard</h2>
                <button @click="handleLogout" :disabled="isLoggingout" :class="['px-4 py-2 text-white rounded transition',
                    isLoggingout
                        ? 'bg-red-400 curson-not-allowed opacity-60'
                        : 'bg-red-500 hover:bg-red-600'
                ]">
                    Logout <i v-if="isLoggingout" class="pi pi-spin pi-spinner-dotted"></i> <i v-else
                        class="pi pi-sign-out"></i>
                </button>
            </header>

            <!-- Dashboard Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <StatCard title="Total Expenses" value="1200" icon="pi-dollar" />
                <StatCard title="This Month" value="300" icon="pi-calendar" />
                <StatCard title="Categories" value="5" icon="pi-list" />
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
        </main>
    </Layout>
</template>