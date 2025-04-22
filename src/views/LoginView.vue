<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, reactive, onUnmounted } from 'vue'
import axios from 'axios'

import InputBox from '@/components/InputBox.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import CaptchaBox from '@/components/CaptchaBox.vue'

const router = useRouter()
const isLoading = ref(false)
const hcaptchaToken = ref(null)
const captchaBoxRef = ref(null)

const formData = reactive({
    email: '',
    password: '',
})

const validationErrors = reactive({
    email: null,
    password: null,
    unverified: null,
    hcaptcha: null,
})

const clearErrors = () => {
    Object.keys(validationErrors).forEach(key => validationErrors[key] = null)
}

const handleLogin = async () => {
    isLoading.value = true
    clearErrors()

    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
            ...formData,
            hcaptcha_token: hcaptchaToken.value,
        })

        localStorage.setItem('token', data.data.token)

        localStorage.setItem('success_message', 'Login successful');

        return router.push({ name: 'dashboard' })
    } catch (error) {
        const errors = error?.response?.data?.errors || {}
        const unverified = error?.response?.data?.data?.unverified

        validationErrors.email = errors.email ?? null
        validationErrors.password = errors.password ?? null
        validationErrors.hcaptcha = errors.hcaptcha_token ?? null

        if (unverified) {
            validationErrors.unverified = error?.response?.data?.data?.message ?? 'Email not verified.'
        }

        formData.password = ''
        captchaBoxRef.value?.resetCaptcha()
        hcaptchaToken.value = null

        isLoading.value = false
    }
}

const onVerify = (token) => {
    hcaptchaToken.value = token
}

const onExpire = () => {
    hcaptchaToken.value = null
}

onUnmounted(() => {
    formData.email = ''
    formData.password = ''
    clearErrors()
})
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
            <!-- Logo -->
            <div class="text-center">
                <RouterLink :to="{ name: 'home' }" class="text-2xl font-bold text-primary">
                    Expense Tracker
                </RouterLink>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-4">
                <InputBox v-model="formData.email" type="email" label="Email" placeholder="Enter your email"
                    :errorMessages="validationErrors.email" />

                <InputBox v-model="formData.password" type="password" label="Password" placeholder="Enter your password"
                    :errorMessages="validationErrors.password" />

                <div v-if="validationErrors.unverified" class="text-sm text-red-500">
                    {{ validationErrors.unverified }}
                </div>

                <CaptchaBox ref="captchaBoxRef" :errorMessages="validationErrors.hcaptcha" @verify="onVerify"
                    @expire="onExpire" />

                <div class="flex items-center justify-between">
                    <label class="flex items-center">
                        <input type="checkbox"
                            class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                        <span class="ml-2 text-sm text-gray-700">Remember Me</span>
                    </label>
                    <a href="#" class="text-sm text-primary hover:underline">Forgot Password?</a>
                </div>

                <SubmitButton :isLoading="isLoading" text="Login" />

                <p class="text-sm text-center text-gray-600">
                    Don't have an account?
                    <RouterLink :to="{ name: 'register' }" class="text-primary hover:underline">
                        Sign up
                    </RouterLink>
                </p>
            </form>
        </div>
    </div>
</template>
