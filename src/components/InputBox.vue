<script setup>
import { defineProps, defineExpose, ref } from 'vue'

const inputRef = ref(null)

const { label, inputId, icon, placeholder, type, errorMessages } = defineProps({
    label: String,
    inputId: String,
    icon: String,
    placeholder: {
        required: false,
        type: String,
    },
    type: String,
    errorMessages: Array,
})

const model = defineModel()

defineExpose({
    inputRef
})
</script>

<template>
    <div class="flex flex-col gap-3">
        <label :for="inputId" class="text-indigo-700">{{ label }}</label>
        <div class="flex flex-col gap-2">
            <div class="relative">
                <i :class="[`absolute pi ${icon} left-2 text-indigo-700 top-1/3`]"></i>
                <input ref="inputRef" :type="type" :id="inputId" v-model="model" :placeholder="placeholder" :class="['transition-all delay-50 duration-200 focus:outline-indigo-700 outline outline-2 outline-indigo-300 px-8 py-2 rounded-md text-indigo-700 w-full',
                    errorMessages ? 'outline-red-500' : ''
                ]" />
            </div>
            <small v-for="(errorMessage, index) in errorMessages" :key="index" class="text-red-500">{{ errorMessage
            }}</small>
        </div>

    </div>
</template>