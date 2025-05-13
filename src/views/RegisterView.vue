<script setup>
import { RouterLink } from 'vue-router'
import { ref, reactive, onUnmounted, onMounted } from 'vue'
import api from '@/api'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import InputBox from '@/components/InputBox.vue'
import SubmitButton from '@/components/SubmitButton.vue'

const isLoading = ref(false)
const nameInputComponent = ref(null)

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
    })
}

const handleRegister = async () => {
    isLoading.value = true
    clearErrors()

    try {
        await api.get('/sanctum/csrf-cookie')
        await api.post('/register', formData)

        clearForm()
        showSuccessToast('Registration successful, verify email to login')
    } catch (error) {
        const errors = error?.response?.data?.errors || {}

        validationErrors.name = errors.name ?? null
        validationErrors.email = errors.email ?? null
        validationErrors.password = errors.password ?? null

        formData.password = ''
        formData.password_confirmation = ''
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

onMounted(() => {
    nameInputComponent.value?.inputRef?.focus()
})

onUnmounted(() => {
    clearForm()
    clearErrors()
})
</script>

<template>
    <div class="min-h-screen w-full flex items-center justify-center">
        <div class="flex flex-col max-w-[1024px] min-h-[600px] w-full px-12 md:flex-row md:justify-between">
            <div class="flex items-center justify-center w-full md:justify-start">
                <div class="flex flex-col gap-12 h-full justify-around w-fit items-center w-full">
                    <RouterLink :to="{ name: 'home' }">
                        <h1 class="font-extrabold text-indigo-700 text-xl tracking-wide uppercase">
                            Expense Tracker
                        </h1>
                    </RouterLink>

                    <form @submit.prevent="handleRegister" class="flex flex-col gap-6">
                        <InputBox ref="nameInputComponent" v-model="formData.name" type="text" label="Name"
                            inputId="name" placeholder="John Doe" icon="pi-user-plus"
                            :errorMessages="validationErrors.name" />

                        <InputBox v-model="formData.email" type="text" label="Email" inputId="email"
                            placeholder="john.doe@hotmail.com" icon="pi-envelope"
                            :errorMessages="validationErrors.email" />

                        <InputBox v-model="formData.password" type="password" label="Password" inputId="password"
                            placeholder="*******" icon="pi-lock" :errorMessages="validationErrors.password" />

                        <InputBox v-model="formData.password_confirmation" type="password" label="Password"
                            inputId="password_confirmation" placeholder="*******" icon="pi-lock" />

                        <SubmitButton :isLoading="isLoading" text="Register" />

                        <div class="flex flex-col items-center justify-between">
                            <p>
                                Already have an account? <RouterLink :to="{ name: 'login' }"
                                    class="transition-all delay-150 duration-300 decoration-indigo-700 hover:text-indigo-700 hover:underline text-indigo-500">
                                    Login</RouterLink>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <div class="flex hidden items-center justify-center md:block w-full rounded-md">
                <img src="@/assets/images/register.jpg" alt="Login image"
                    class="h-full w-full rounded-lg object-fill" />
            </div>
        </div>
    </div>
</template>
