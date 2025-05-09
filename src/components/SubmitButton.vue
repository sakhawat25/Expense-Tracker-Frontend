<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    text: String,
    isLoading: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <button type="submit" :disabled="props.isLoading" :class="['delay-50 duration-200 outline-none px-4 py-2 text-white transition-all', props.isLoading
        ? 'bg-[#009C86] cursor-not-allowed opacity-60'
        : 'bg-[#01705F] cursor-pointer hover:bg-[#009C86] hover:scale-105']">
        <i v-if="props.isLoading" class="pi pi-spin pi-spinner"></i>
        {{ props.text }}
    </button>
</template>