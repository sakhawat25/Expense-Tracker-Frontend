import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)

    const getUser = async () => {
        if (localStorage.getItem('token')) {
            const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })

            user.value = data
        }
    }

    return { user, getUser }
})
