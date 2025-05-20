<script setup>
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>

<template>
    <nav class="bg-white shadow-md p-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <RouterLink :to="{ name: 'home' }" class="text-2xl font-bold text-indigo-600">Expense Tracker</RouterLink>
            <div>
                <RouterLink v-if="authStore.user.id" :to="{ name: 'dashboard' }"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Dashboard</RouterLink>

                <RouterLink v-if="!authStore.user.id" :to="{ name: 'login' }"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Login</RouterLink>

                <RouterLink v-if="!authStore.user.id" :to="{ name: 'register' }"
                    class="ml-4 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50">Sign
                    Up
                </RouterLink>
            </div>
        </div>
    </nav>
</template>