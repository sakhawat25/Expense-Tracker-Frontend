<template>
    <section class="flex justify-center items-center h-screen bg-indigo-700 text-white text-center py-10">
        <div class="max-w-2xl mx-auto">
            <h1 class="text-4xl font-extrabold leading-tight mb-4">Take Control of Your Finances</h1>
            <p class="text-lg mb-6">Track your spending, set budgets, and manage your expenses with ease. Start now and
                gain
                financial freedom!</p>
            <RouterLink :to="{ name: 'login' }"
                class="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full hover:bg-indigo-100">Get Started
            </RouterLink>
        </div>
    </section>
</template>