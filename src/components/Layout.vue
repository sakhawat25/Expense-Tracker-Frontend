<script setup>
import { onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import noImage from '@/assets/images/no-image.jpg'
import api from '@/api'
import 'vue3-toastify/dist/index.css'
import { useAuthStore } from '@/stores/auth'
import Sidebar from './Sidebar.vue'

const authStore = useAuthStore()
const router = useRouter()

const showSuccessAlert = (message) => {
    toast(message, {
        'theme': 'colored',
        'type': 'success',
        'transition': 'slide',
        'dangerouslyHTMLString': true,
    })
}

const handleLogout = async () => {
    try {
        await api.get('/sanctum/csrf-cookie')
        await api.post('/logout')

        authStore.user = {}

        setTimeout(() => {
            router.push({ name: 'login' })
        }, 100)
    } catch (error) {
        console.log(error.response)
    }
}

const toggleSidebar = (event) => {
    const sidebar = document.getElementById('sidebar')
    const toggleSidebar = document.getElementById("toggleSidebar");
    const title = document.getElementById('title')
    const menuLabels = document.getElementsByClassName("menu-label");
    const menuTexts = document.querySelectorAll("a span");

    toggleSidebar.classList.toggle("rotate-180");
    sidebar.classList.toggle("p-5");

    title.classList.toggle("hidden");

    Array.from(menuLabels).forEach((menuLabel) => {
        menuLabel.classList.toggle("hidden")
    })

    Array.from(menuTexts).forEach((menuText) => {
        menuText.classList.toggle("hidden")
    })
}

const toggleProfileMenu = () => {
    const profileMenu = document.getElementById('profileMenu')

    profileMenu.classList.toggle('hidden')
}

onMounted(() => {
    if (localStorage.getItem('success_message')) {
        const message = localStorage.getItem('success_message')
        localStorage.removeItem('success_message')
        showSuccessAlert(message)
    }
})
</script>

<template>
    <div class="container bg-white mx-auto p-4 min-h-screen">
        <Sidebar @on-toggle="toggleSidebar" />
        <main class="text-gray-500">
            <section class="bg-gray-100 px-8 py-4 rounded-lg flex items-center justify-end">
                <button @click="toggleProfileMenu" class="px-4 cursor-pointer">
                    <div class="flex items-center gap-2">
                        <div class="w-[40px]">
                            <img class="w-full rounded-full border border-2" :src="noImage" alt="" />
                        </div>
                        <strong class="text-sm">{{ authStore.user.name }}</strong>
                    </div>
                </button>

                <div id="profileMenu"
                    class="hidden absolute top-20 bg-white flex flex-col items-center gap-2 p-4 shadow-lg overflow-hidden transition-all duration-300">
                    <a href="#" class="flex items-center gap-4 px-4 py-2 text-sm hover:bg-indigo-800 hover:text-white">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </a>

                    <button @click="handleLogout"
                        class="cursor-pointer flex items-center gap-4 px-4 py-2 text-sm hover:bg-indigo-800 hover:text-white">
                        <i class="pi pi-power-off"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </section>
            <section class="bg-gray-100 px-8 py-4 rounded-lg flex flex-col gap-8">
                <slot></slot>
            </section>
        </main>
    </div>
</template>

<style scoped>
body {
    font-family: "Inter", sans-serif;
}

.container {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
}

main {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    gap: 1rem;
}
</style>