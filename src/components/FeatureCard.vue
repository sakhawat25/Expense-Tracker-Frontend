<script setup>
import { defineProps } from 'vue'

const { icon, title, text } = defineProps({
    icon: String,
    title: String,
    text: String,
})
</script>

<template>
    <div class="p-6 border rounded-lg shadow-lg">
        <i :class="`pi ${icon} feature-icon mb-4`"></i>
        <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
        <p class="text-gray-700">{{ text }}</p>
    </div>
</template>

<style scoped>
.feature-icon {
    font-size: 2rem;
    color: #5e4b8b;
}
</style>