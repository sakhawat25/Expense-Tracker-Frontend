<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const message = ref('')
const error = ref('')

const resend = async () => {
    message.value = ''
    error.value = ''
    try {
        const response = await axios.post('http://127.0.0.1:8000/auth/resend-verification', {
            email: email.value
        })
        message.value = response.data.message
    } catch (err) {
        error.value = err.response?.data?.message || 'Something went wrong'
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">Resend Verification Email</h2>

            <input v-model="email" type="email" class="w-full p-2 border rounded-md mb-4"
                placeholder="Enter your email" />

            <button @click="resend" class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
                Resend
            </button>

            <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
            <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
        </div>
    </div>
</template>
