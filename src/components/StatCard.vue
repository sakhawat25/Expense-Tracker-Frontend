<script setup>
import { defineProps } from 'vue'

const { title, value, icon, iconColor } = defineProps({
    title: String,
    value: Number,
    icon: String,
    iconColor: String,
})
</script>

<template>
    <div
        class="bg-white w-auto p-6 flex gap-6 w-full items-center justify-evenly shadow-lg transition-all duration-300 hover:scale-105">
        <i :class="`pi ${icon} text-3xl text-${iconColor}-500`"></i>
        <div class="flex flex-col gap-2 items-center">
            <h1 class="text-2xl font-bold text-gray-700">{{ value }}</h1>
            <small class="text-xs uppercase">{{ title }}</small>
        </div>
    </div>
</template>