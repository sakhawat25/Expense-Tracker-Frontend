<script setup>
import { defineProps } from 'vue'

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
</script>

<template>
    <div class="flex flex-col gap-3">
        <label :for="inputId" class="text-[#01705F]">{{ label }}</label>
        <div class="flex flex-col gap-2">
            <div class="relative">
                <i :class="[`absolute pi ${icon} left-2 text-[#009C86] top-1/3`]"></i>
                <input :type="type" :id="inputId" v-model="model" :placeholder="placeholder" :class="['transition-all delay-50 duration-200 focus:outline-[#009C86] outline outline-2 outline-[#00DFC0] px-12 py-2 rounded-md text-[#01705F] w-full',
                    errorMessages ? 'outline-red-500' : ''
                ]" />
            </div>
            <small v-for="(errorMessage, index) in errorMessages" :key="index" class="text-red-500">{{ errorMessage
                }}</small>
        </div>

    </div>
</template>