<script setup>
import { RouterLink } from 'vue-router'
import FeatureCard from '@/components/FeatureCard.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <!-- Navbar -->
  <nav class="bg-white shadow-md p-4">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="#" class="text-2xl font-bold text-indigo-600">Expense Tracker</a>
      <div>
        <RouterLink v-if="authStore.user.id" :to="{ name: 'dashboard' }"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Dashboard</RouterLink>

        <RouterLink v-if="!authStore.user.id" :to="{ name: 'login' }"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Login</RouterLink>

        <RouterLink v-if="!authStore.user.id" :to="{ name: 'register' }"
          class="ml-4 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50">Sign Up
        </RouterLink>
      </div>
    </div>
  </nav>

  <!-- Landing Section -->
  <section class="flex justify-center items-center h-screen bg-indigo-700 text-white text-center py-10">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-4xl font-extrabold leading-tight mb-4">Take Control of Your Finances</h1>
      <p class="text-lg mb-6">Track your spending, set budgets, and manage your expenses with ease. Start now and gain
        financial freedom!</p>
      <RouterLink :to="{ name: 'login' }"
        class="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full hover:bg-indigo-100">Get Started
      </RouterLink>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-20 bg-white text-center">
    <h2 class="text-3xl font-semibold text-indigo-600 mb-8">Key Features</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto px-6">
      <FeatureCard icon="pi-chart-line" title="Track Your Expenses"
        text="Monitor all your expenses in one place. Analyze where your money goes." />
      <FeatureCard icon="pi-calendar" title="Budget Management"
        text="Set up budgets for different categories and stick to your limits." />
      <FeatureCard icon="pi-credit-card" title="Multiple Accounts"
        text="Link and manage multiple bank accounts and credit cards." />
      <FeatureCard icon="pi-book" title="Detailed Reports"
        text="Generate detailed reports to gain insights into your spending patterns." />
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-800 text-white text-center py-6">
    <p>&copy; 2025 Expense Tracker | All Rights Reserved</p>
  </footer>
</template>

<style scoped>
.btn-primary {
  background-color: #5e4b8b;
  color: white;
}

.btn-primary:hover {
  background-color: #4a3e73;
}
</style>