<script setup>
import { onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import { RouterLink } from 'vue-router'
import 'vue3-toastify/dist/index.css'

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

        <slot></slot>
    </div>
</template>