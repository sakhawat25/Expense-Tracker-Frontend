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
    <button type="submit" :disabled="props.isLoading" :class="[
        'relative w-full mt-4 font-semibold px-4 py-2 rounded-md text-white transition',
        props.isLoading
            ? 'bg-indigo-400 cursor-not-allowed opacity-60'
            : 'bg-indigo-600 hover:bg-indigo-700'
    ]">
        {{ props.text }}
        <i v-if="props.isLoading" class="pi pi-spin pi-spinner-dotted absolute top-3 right-4"></i>
    </button>
</template>