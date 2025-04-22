<script setup>
import DoughnutChart from '@/components/DoughnutChart.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const isLoggingout = ref(false)

const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("mainContent");
    sidebar.classList.toggle("-translate-x-full");
    mainContent.classList.toggle("ml-64");
}

const showSuccessAlert = (message) => {
    toast(message, {
        'theme': 'colored',
        'type': 'success',
        'transition': 'slide',
        'dangerouslyHTMLString': true,
    })
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
    } finally {
        isLoggingout.value = false
    }
}

onMounted(() => {
    if (localStorage.getItem('success_message')) {
        const message = localStorage.getItem('success_message')
        localStorage.removeItem('success_message')
        showSuccessAlert(message)
    }
})
</script>

<template>
    <div class="flex min-h-screen">
        <!-- Sidebar -->
        <aside id="sidebar"
            class="w-64 bg-indigo-700 text-white p-6 fixed min-h-screen transform -translate-x-full transition-transform md:translate-x-0 md:relative">
            <!-- Logo Section -->
            <h2 class="text-2xl font-bold text-center">Expense Tracker</h2>

            <nav class="mt-6">
                <a href="dashboard.html" class="block py-2 px-4 rounded bg-indigo-500">Dashboard</a>
                <a href="expenses.html" class="block py-2 px-4 mt-2 hover:bg-indigo-500">Expenses</a>
                <a href="reports.html" class="block py-2 px-4 mt-2 hover:bg-indigo-500">Reports</a>
                <a href="settings.html" class="block py-2 px-4 mt-2 hover:bg-indigo-500">Settings</a>
            </nav>
        </aside>

        <!-- Main Content -->
        <main id="mainContent" class="flex-1 p-6 transition-all w-full md:ml-0">
            <header class="flex justify-between items-center bg-white p-4 shadow rounded-md">
                <!-- Toggle Sidebar Button for Mobile -->
                <button class="md:hidden px-4 py-2 bg-indigo-700 text-white rounded" @click="toggleSidebar">
                    <i class="pi pi-align-justify"></i>
                </button>
                <h2 class="text-xl font-semibold">Dashboard</h2>
                <button @click="handleLogout" :disabled="isLoggingout"
                    class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Logout <i v-if="isLoggingout" class="pi pi-spin pi-spinner-dotted"></i> <i v-else
                        class="pi pi-sign-out"></i>
                </button>
            </header>

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
        </main>
    </div>
</template>