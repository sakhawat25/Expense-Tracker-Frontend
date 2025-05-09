import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'

export const useAuthStore = defineStore('auth', () => {
    const user = ref({})

    const getAuthenticatedUser = async () => {
        try {
            const response = await api.get(`/api/user`)

            return response.data
        } catch (error) {
            console.error(error.response)
        }
    }

    return { user, getAuthenticatedUser }
})
