<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import 'vue3-toastify/dist/index.css'

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

const showSuccessAlert = (message) => {
    toast(message, {
        'theme': 'colored',
        'type': 'success',
        'transition': 'slide',
        'dangerouslyHTMLString': true,
    })
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
            <RouterLink :to="{ name: 'home' }">
                <h2 class="text-2xl font-bold text-center">Expense Tracker</h2>
            </RouterLink>

            <nav class="mt-6">
                <RouterLink :to="{ name: 'dashboard' }" class="block py-2 px-4 rounded bg-indigo-500">Dashboard
                </RouterLink>
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
                <button @click="handleLogout" :disabled="isLoggingout" :class="['px-4 py-2 text-white rounded transition',
                    isLoggingout
                        ? 'bg-red-400 curson-not-allowed opacity-60'
                        : 'bg-red-500 hover:bg-red-600'
                ]">
                    Logout <i v-if="isLoggingout" class="pi pi-spin pi-spinner-dotted"></i> <i v-else
                        class="pi pi-sign-out"></i>
                </button>
            </header>

            <slot></slot>

        </main>
    </div>
</template>