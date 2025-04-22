<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onMounted(() => {
    const status = route.query.status
    const token = route.query.token

    if (status === 'success' && token) {
        // Store token (can be Vuex or Pinia too)
        localStorage.setItem('token', token)

        // Redirect to home/dashboard after short delay
        setTimeout(() => {
            localStorage.setItem('success_message', 'Email verified successfully.')
            router.push({ name: 'dashboard' })
        }, 1500)
    }
})
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-50">
        <div class="p-6 bg-white shadow-md rounded-xl text-center">
            <h1 class="text-xl font-bold text-indigo-600 mb-4">Verifying Email...</h1>
            <p v-if="!route.query.token">Please wait or refresh if not redirected.</p>
        </div>
    </div>
</template>
