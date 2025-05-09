<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onMounted(() => {
    const status = route.query.status

    if (status === 'success') {
        // Redirect to home/dashboard after short delay
        setTimeout(() => {
            localStorage.setItem('success_message', 'Email verified successfully. Login to proceed')
            router.push({ name: 'login' })
        }, 1500)
    }

    else {
        localStorage.setItem('unsuccess_message', 'Invalid Email verification. Please try again')
        router.push({ name: 'login' })
    }
})
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-150">
        <div class="p-6 bg-white shadow-md rounded-xl text-center">
            <h1 class="text-xl font-bold text-[#01705F] mb-4">Verifying Email...</h1>
            <p v-if="!route.query.status">Please wait or refresh if not redirected.</p>
        </div>
    </div>
</template>
