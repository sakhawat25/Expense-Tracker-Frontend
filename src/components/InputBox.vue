<script setup>
import { defineProps } from 'vue'

const { label, placeholder, type, errorMessages } = defineProps({
    label: String,
    placeholder: {
        required: false,
        type: String,
    },
    type: String,
    errorMessages: Array,
})

const model = defineModel()
</script>

<template>
    <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
        <input v-model="model" :type="type" :placeholder="placeholder"
            class="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-indigo-700 focus:outline-none"
            :class="{ 'border-red-500': errorMessages }" />
        <small v-for="(errorMessage, index) in errorMessages" :key="index" class="text-red-500 font-medium">{{
            errorMessage }}</small>
    </div>
</template>