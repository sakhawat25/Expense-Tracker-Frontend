<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Layout from '@/components/Layout.vue'
import axios from 'axios'

const isLoggingout = ref(false)
const authStore = useAuthStore()
const router = useRouter()

const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("mainContent");
    sidebar.classList.toggle("-translate-x-full");
    mainContent.classList.toggle("ml-64");
}

const handleLogout = async () => {
    isLoggingout.value = true
    const token = localStorage.getItem('token')

    try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        localStorage.removeItem('token')
        authStore.user = null

        setTimeout(() => {
            router.push({ name: 'login' })
        }, 100)
    } catch (error) {
        console.log(error.response)
        isLoggingout.value = false
    }
}
</script>

<template>
    <Layout>
        <!-- Main Content -->
        <main id="mainContent" class="flex-1 p-6 transition-all w-full md:ml-0">
            <header class="flex justify-between items-center bg-white p-4 shadow rounded-md">
                <!-- Toggle Sidebar Button for Mobile -->
                <button class="md:hidden px-4 py-2 bg-indigo-700 text-white rounded" @click="toggleSidebar">
                    <i class="pi pi-align-justify"></i>
                </button>
                <h2 class="text-xl font-semibold">Expenses</h2>
                <button @click="handleLogout" :disabled="isLoggingout" :class="['px-4 py-2 text-white rounded transition',
                    isLoggingout
                        ? 'bg-red-400 curson-not-allowed opacity-60'
                        : 'bg-red-500 hover:bg-red-600'
                ]">
                    Logout <i v-if="isLoggingout" class="pi pi-spin pi-spinner-dotted"></i> <i v-else
                        class="pi pi-sign-out"></i>
                </button>
            </header>

            <!-- Add New Expense Form -->
            <div class="mt-6 bg-white p-6 shadow rounded-md">
                <h3 class="text-lg font-semibold text-gray-700">Add New Expense</h3>
                <form action="#" method="POST">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                        <div>
                            <label for="date" class="block text-sm text-gray-700">Date</label>
                            <input type="date" id="date" name="date" class="mt-1 px-4 py-2 w-full border rounded-md"
                                required>
                        </div>
                        <div>
                            <label for="category" class="block text-sm text-gray-700">Category</label>
                            <select id="category" name="category" class="mt-1 px-4 py-2 w-full border rounded-md"
                                required>
                                <option value="Food">Food</option>
                                <option value="Transport">Transport</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Bills">Bills</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="amount" class="block text-sm text-gray-700">Amount</label>
                            <input type="number" id="amount" name="amount" placeholder="$100"
                                class="mt-1 px-4 py-2 w-full border rounded-md" required>
                        </div>
                        <div class="sm:col-span-2 flex justify-end mt-4">
                            <button type="submit"
                                class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Add
                                Expense</button>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Expenses List -->
            <div class="mt-6 bg-white p-6 shadow rounded-md">
                <h3 class="text-lg font-semibold text-gray-700">Recent Expenses</h3>
                <table class="w-full mt-4 border-collapse">
                    <thead>
                        <tr class="bg-gray-200 text-gray-700">
                            <th class="p-2 text-left">Date</th>
                            <th class="p-2 text-left">Category</th>
                            <th class="p-2 text-right">Amount</th>
                            <th class="p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b">
                            <td class="p-2">2025-04-03</td>
                            <td class="p-2">Food</td>
                            <td class="p-2 text-right text-red-600">- $50</td>
                            <td class="p-2 text-center">
                                <button
                                    class="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">Edit</button>
                                <button
                                    class="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
                            </td>
                        </tr>
                        <tr class="border-b">
                            <td class="p-2">2025-04-02</td>
                            <td class="p-2">Transport</td>
                            <td class="p-2 text-right text-red-600">- $20</td>
                            <td class="p-2 text-center">
                                <button
                                    class="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">Edit</button>
                                <button
                                    class="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="mt-6 flex justify-center">
                <nav>
                    <ul class="flex space-x-4">
                        <li><a href="#" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Previous</a></li>
                        <li><a href="#" class="px-4 py-2 bg-blue-600 text-white rounded-md">1</a></li>
                        <li><a href="#" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">2</a></li>
                        <li><a href="#" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Next</a></li>
                    </ul>
                </nav>
            </div>
        </main>
    </Layout>
</template>