<script setup>
import { RouterLink } from 'vue-router'
import { ref, reactive, onUnmounted } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import InputBox from '@/components/InputBox.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import CaptchaBox from '@/components/CaptchaBox.vue'

const isLoading = ref(false)
const hcaptchaToken = ref(null)
const captchaBoxRef = ref(null)

const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const validationErrors = reactive({
    name: null,
    email: null,
    password: null,
    hcaptcha: null,
})

const clearForm = () => {
    Object.assign(formData, {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
}

const clearErrors = () => {
    Object.assign(validationErrors, {
        name: null,
        email: null,
        password: null,
        hcaptcha: null,
    })
}

const handleRegister = async () => {
    isLoading.value = true
    clearErrors()

    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, {
            ...formData,
            hcaptcha_token: hcaptchaToken.value,
        })

        clearForm()
        showSuccessToast(data.message)
    } catch (error) {
        const errors = error?.response?.data?.errors || {}

        validationErrors.name = errors.name ?? null
        validationErrors.email = errors.email ?? null
        validationErrors.password = errors.password ?? null
        validationErrors.hcaptcha = errors.hcaptcha_token ?? null

        formData.password = ''
        formData.password_confirmation = ''

        captchaBoxRef.value?.resetCaptcha()
        hcaptchaToken.value = null
    } finally {
        isLoading.value = false
    }
}

const showSuccessToast = (message) => {
    toast(message, {
        theme: 'colored',
        type: 'success',
        transition: 'slide',
        dangerouslyHTMLString: true,
    })
}

const onVerify = (token) => {
    hcaptchaToken.value = token
}

const onExpire = () => {
    hcaptchaToken.value = null
}

onUnmounted(() => {
    clearForm()
    clearErrors()
})
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
            <div class="w-full text-center">
                <RouterLink :to="{ name: 'home' }" class="text-2xl font-bold text-primary">
                    Expense Tracker
                </RouterLink>
            </div>

            <form @submit.prevent="handleRegister" class="space-y-4">
                <InputBox v-model="formData.name" type="text" label="Name" placeholder="Enter your name"
                    :errorMessages="validationErrors.name" />

                <InputBox v-model="formData.email" type="email" label="Email" placeholder="Enter your email"
                    :errorMessages="validationErrors.email" />

                <InputBox v-model="formData.password" type="password" label="Password" placeholder="Enter your password"
                    :errorMessages="validationErrors.password" />

                <InputBox v-model="formData.password_confirmation" type="password" label="Confirm Password"
                    placeholder="Confirm your password" />

                <CaptchaBox ref="captchaBoxRef" :errorMessages="validationErrors.hcaptcha" @verify="onVerify"
                    @expire="onExpire" />

                <SubmitButton :isLoading="isLoading" text="Register" />

                <p class="mt-4 text-sm text-center text-gray-600">
                    Already have an account?
                    <RouterLink :to="{ name: 'login' }" class="text-primary hover:underline">
                        Login
                    </RouterLink>
                </p>
            </form>
        </div>
    </div>
</template>
