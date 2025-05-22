<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
    <aside id="sidebar" class="text-white w-fit z-10 overflow-hidden bg-indigo-600 rounded-lg p-4 flex flex-col gap-10">
        <div class="flex items-center justify-between gap-6">
            <RouterLink id="title" :to="{ name: 'home' }" class="text-lg font-semibold hidden">
                <h1>
                    Expense Tracker
                </h1>
            </RouterLink>
            <button @click="$emit('on-toggle')" id="toggleSidebar"
                class="cursor-pointer duration-300 hover:bg-indigo-800 px-4 py-2 transition-all">
                <i class="pi pi-chevron-right"></i>
            </button>
        </div>
        <div class="flex flex-col gap-2">
            <p class="uppercase text-sm menu-label hidden">Menu</p>
            <RouterLink title="Dashboard" :to="{ name: 'dashboard' }" :class="['flex items-center gap-4 hover:bg-indigo-800 px-4 py-2',
                route.name === 'dashboard' ? 'bg-indigo-800' : ''
            ]">
                <i class="pi pi-chart-line"></i>
                <span class="hidden menu-texts">Dashboard</span>
            </RouterLink>

            <RouterLink title="Expenses" :to="{ name: 'expenses' }" :class="['flex items-center gap-4 hover:bg-indigo-800 px-4 py-2',
                route.name === 'expenses' ? 'bg-indigo-800' : ''
            ]">
                <i class="pi pi-cart-arrow-down"></i>
                <span class="hidden menu-texts">Expenses</span>
            </RouterLink>

            <RouterLink title="Reports" :to="{ name: 'reports' }" :class="['flex items-center gap-4 hover:bg-indigo-800 px-4 py-2',
                route.name === 'reports' ? 'bg-indigo-800' : ''
            ]">
                <i class="pi pi-file"></i>
                <span class="hidden menu-texts">Reports</span>
            </RouterLink>
        </div>
    </aside>
</template>

<style scoped>
#sidebar {
    transition: 300ms ease-in-out;
}
</style>