<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, reactive, onUnmounted, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import api from '@/api'
import InputBox from '@/components/InputBox.vue'
import SubmitButton from '@/components/SubmitButton.vue'

const router = useRouter()
const isLoading = ref(false)
const emailInputComponent = ref(null)

const formData = reactive({
    email: '',
    password: '',
})

const validationErrors = reactive({
    email: null,
    password: null,
})

const clearErrors = () => {
    Object.keys(validationErrors).forEach(key => validationErrors[key] = null)
}

const showSuccessAlert = (message) => {
    toast(message, {
        'theme': 'colored',
        'type': 'success',
        'transition': 'slide',
        'dangerouslyHTMLString': true,
    })
}

const showUnSuccessAlert = (message) => {
    toast(message, {
        'theme': 'colored',
        'type': 'error',
        'transition': 'slide',
        'dangerouslyHTMLString': true,
    })
}

const handleLogin = async () => {
    isLoading.value = true
    clearErrors()

    try {
        await api.get('/sanctum/csrf-cookie')
        await api.post('/login', formData)

        localStorage.setItem('success_message', 'Login successful');

        router.push({ name: 'dashboard' })
    } catch (error) {
        console.log(error)
        const errors = error?.response?.data?.errors || {}

        validationErrors.email = errors.email ?? null
        validationErrors.password = errors.password ?? null
        validationErrors.hcaptcha = errors.hcaptcha_token ?? null

        formData.password = ''

        isLoading.value = false
    }
}

onMounted(() => {
    emailInputComponent.value?.inputRef?.focus()

    if (localStorage.getItem('success_message')) {
        const message = localStorage.getItem('success_message')
        localStorage.removeItem('success_message')
        showSuccessAlert(message)
    }

    if (localStorage.getItem('unsuccess_message')) {
        const message = localStorage.getItem('unsuccess_message')
        localStorage.removeItem('unsuccess_message')
        showUnSuccessAlert(message)
    }
})

onUnmounted(() => {
    Object.keys(formData).forEach(key => formData[key] = '')
    clearErrors()
})
</script>

<template>
    <div class="min-h-screen w-full flex items-center justify-center">
        <div class="flex flex-col max-w-[1024px] min-h-[600px] w-full px-12 md:flex-row md:justify-between">
            <div class="flex items-center justify-center w-full md:justify-start">
                <div class="flex flex-col gap-8 h-full justify-around w-fit items-center w-full">
                    <RouterLink :to="{ name: 'home' }">
                        <h1 class="font-extrabold text-[#01705F] text-xl tracking-wide uppercase">
                            Expense Tracker
                        </h1>
                    </RouterLink>

                    <form @submit.prevent="handleLogin" class="flex flex-col gap-12">
                        <InputBox ref="emailInputComponent" v-model="formData.email" type="text" label="Email"
                            inputId="email" placeholder="john.doe@hotmail.com" icon="pi-envelope"
                            :errorMessages="validationErrors.email" />

                        <InputBox v-model="formData.password" type="password" label="Password" inputId="password"
                            placeholder="*******" icon="pi-lock" :errorMessages="validationErrors.password" />

                        <div v-if="validationErrors.unverified" class="text-sm text-red-500">
                            {{ validationErrors.unverified }}
                        </div>

                        <SubmitButton :isLoading="isLoading" text="Login" />

                        <div class="flex flex-col items-center justify-between">
                            <p>
                                Don't have an account? <RouterLink :to="{ name: 'register' }"
                                    class="transition-all delay-150 duration-300 decoration-[#01705F] hover:text-[#01705F] hover:underline text-[#009C86]">
                                    Sign Up</RouterLink>
                            </p>

                            <a href="#"
                                class="transition-all delay-150 duration-300 decoration-[#01705F] hover:text-[#01705F] hover:underline text-[#009C86]">Forgot
                                Password?</a>
                        </div>
                    </form>
                </div>
            </div>
            <div class="flex hidden items-center justify-center md:block w-full rounded-md">
                <img src="@/assets/images/login.jpg" alt="Login image" class="h-full w-full rounded-lg object-fill" />
            </div>
        </div>
    </div>
</template>
