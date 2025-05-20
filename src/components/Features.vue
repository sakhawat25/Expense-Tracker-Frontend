<script setup>
import FeatureCard from '@/components/FeatureCard.vue'
</script>

<template>
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
</template>