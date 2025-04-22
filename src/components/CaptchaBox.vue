<script setup>
import { ref } from 'vue'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'

defineProps({
    errorMessages: Array,
})

const emit = defineEmits(['verify', 'expire'])

const captchaRef = ref(null)

defineExpose({
    resetCaptcha: () => captchaRef.value?.reset()
})
</script>

<template>
    <div class="space-y-1">
        <VueHcaptcha ref="captchaRef" sitekey="8b0ed5ce-4850-4818-83a2-3a461bfc939c"
            @verify="token => emit('verify', token)" @expired="() => emit('expire')" />

        <div v-if="errorMessages?.length" class="space-y-0.5 mb-2">
            <small v-for="(errorMessage, index) in errorMessages" :key="index" class="text-red-500 font-medium block">
                {{ errorMessage }}
            </small>
        </div>
    </div>
</template>
