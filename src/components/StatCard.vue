<script setup>
import { defineProps } from 'vue'

const { title, value, icon } = defineProps({
    title: String,
    value: String,
    icon: String,
})
</script>

<template>
    <div class="flex justify-between items-center p-6 bg-white shadow rounded-md">
        <div>
            <h3 class="text-lg font-semibold text-gray-600">
                {{ title }}
            </h3>
            <p class="text-2xl font-bold text-indigo-700">${{ value }}</p>
        </div>

        <i :class="`pi ${icon} text-4xl text-[#4a3e73]`"></i>
    </div>
</template>