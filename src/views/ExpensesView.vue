<script setup>
import { ref, reactive, onUnmounted, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import Layout from '@/components/Layout.vue'
import InputBox from '@/components/InputBox.vue'
import 'vue3-toastify/dist/index.css'
import FormDialogue from '@/components/FormDialogue.vue'
import api from '@/api'

const isLoading = ref(false)
const expenses = ref(null)
const showDialog = ref(false)
const showEditDialog = ref(false)
const id = ref(null)

const formData = reactive({
    category: '',
    amount: '',
    date: '',
})

const validationErrors = reactive({
    category: null,
    amount: null,
    date: null,
})

const handleAddExpense = async () => {
    isLoading.value = true
    clearErrors()

    try {
        const data = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== '')
        )

        await api.get('/sanctum/csrf-cookie')
        const response = await api.post('/api/v1/expenses', data)

        // reset form
        clearForm()

        // update expenses state
        expenses.value = response.data.data.expenses

        isLoading.value = false
        showDialog.value = false

        // Show success toast
        showSuccessAlert('Expense added successfully.')

    } catch (error) {
        const errors = error?.response?.data?.errors || {}
        validationErrors.category = errors.category ?? null
        validationErrors.amount = errors.amount ?? null
        validationErrors.date = errors.date ?? null
        isLoading.value = false
    }
}

const handleEditExpense = async (expenseId) => {
    clearErrors()
    clearForm()

    try {
        const response = await api.get(`/api/v1/expenses/${expenseId}`)

        const expense = response?.data?.data?.expense

        console.log(expense)

        formData.amount = expense.amount
        formData.category = expense?.category?.name
        formData.date = expense.date
        id.value = expense.id

        showEditDialog.value = true
    } catch (error) {
        const errors = error?.response?.data?.errors || {}
        validationErrors.category = errors.category ?? null
        validationErrors.amount = errors.amount ?? null
        validationErrors.date = errors.date ?? null
    }
}

const handleUpdateExpense = async (expenseId) => {
    clearErrors()
    isLoading.value = true
    try {
        await api.get('/sanctum/csrf-cookie')
        const response = await api.put(`api/v1/expenses/${expenseId}`, formData)

        // reset form
        clearForm()

        // update expenses state
        expenses.value = response?.data?.data?.expenses

        isLoading.value = false
        showEditDialog.value = false

        // Show success toast
        showSuccessAlert('Expense updated successfully.')
    } catch (error) {
        const errors = error?.response?.data?.errors || {}
        validationErrors.category = errors.category ?? null
        validationErrors.amount = errors.amount ?? null
        validationErrors.date = errors.date ?? null

        isLoading.value = false
    }
}

const handleDeleteExpense = async (expenseId) => {
    try {
        await api.get('/sanctum/csrf-cookie')
        const response = await api.delete(`api/v1/expenses/${expenseId}`)

        // update expenses state
        expenses.value = response?.data?.data?.expenses

        // Show success toast
        showSuccessAlert('Expense updated successfully.')
    } catch (error) {
        console.error(error)
    }
}

const gotoPage = async (url) => {
    const page = url.split('?')[1]

    try {
        const response = await api.get(`/api/v1/expenses?${page}`)

        expenses.value = response.data.data.expenses
    } catch (error) {
        console.error(error)
    }
}

const closeDialog = () => {
    clearForm()
    clearErrors()
    showDialog.value = false
    showEditDialog.value = false
}

const clearForm = () => {
    Object.keys(formData).forEach(key => formData[key] = '')
    id.value = null
}

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

onMounted(async () => {
    try {
        const response = await api.get('/api/v1/expenses')

        expenses.value = response.data.data.expenses
    } catch (error) {
        console.error(error)
    }
})

onUnmounted(() => {
    clearForm()
    clearErrors()
})
</script>

<template>
    <Layout>
        <!-- Header -->
        <div class="flex items-center justify-between">
            <h2 class="text-3xl">Expenses</h2>
            <button @click="() => { showDialog = true }"
                class="bg-green-600 cursor-pointer outline-none px-4 py-2 rounded-md shadow-md text-white hover:bg-green-700">Add
                Expense</button>
        </div>

        <!-- Table -->
        <table class="shadow-lg">
            <thead>
                <tr>
                    <th class="p-4 px-2 border-b border-slate-300 bg-slate-50">
                        <p class="block text-sm font-normal leading-none text-slate-500">
                            Date
                        </p>
                    </th>
                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                        <p class="block text-sm font-normal leading-none text-slate-500">
                            Category
                        </p>
                    </th>
                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                        <p class="block text-sm font-normal leading-none text-slate-500">
                            Amount
                        </p>
                    </th>
                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                        <p class="block text-sm font-normal leading-none text-slate-500">
                            Actions
                        </p>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="!expenses" class="hover:bg-slate-50 border-b border-slate-200 text-center">
                    <td class="p-4 py-5" colspan="4">
                        No records available
                    </td>
                </tr>
                <tr v-for="expense in expenses?.data" :key="expense.id"
                    class="hover:bg-slate-50 border-b border-slate-200 text-center">
                    <td class="p-4 py-5">
                        <p class="block text-sm text-slate-800">{{ expense.date }}</p>
                    </td>
                    <td class="p-4 py-5">
                        <p class="block text-sm text-slate-800">{{ expense.category?.name ?? 'NA' }}</p>
                    </td>
                    <td class="p-4 py-5">
                        <p class="block text-sm text-slate-800">- ${{ expense.amount }}</p>
                    </td>
                    <td class="flex gap-3 items-center justify-center p-4 py-5">
                        <button @click="() => { handleEditExpense(expense.id) }"
                            class="cursor-pointer outline-none text-yellow-500 hover:text-yellow-600" title="Edit"><i
                                class="pi pi-pencil"></i></button>
                        <button @click="() => { handleDeleteExpense(expense.id) }"
                            class="cursor-pointer outline-none text-red-500 hover:text-red-600" title="Delete"><i
                                class="pi pi-trash"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Pagination -->
        <div class="mt-6 flex justify-center">
            <nav>
                <ul class="flex space-x-4">
                    <li v-for="(link, index) in expenses?.links" :key="index">
                        <button @click="() => { gotoPage(link.url) }" :disabled="!link.url" v-html="link.label" :class="['px-4 py-2 rounded-md',
                            link.active
                                ? 'bg-indigo-700 text-white cursor-pointer'
                                :
                                !link.url
                                    ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                                    : 'bg-gray-300 text-gray-700 cursor-pointer'
                        ]"></button>
                    </li>
                </ul>
            </nav>
        </div>

        <!-- Modal to add expenses -->
        <FormDialogue @close="closeDialog" :isOpen="showDialog" :isLoading="isLoading" formId="update-expense">
            <form id="update-expense" @submit.prevent="handleAddExpense">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    <InputBox v-model="formData.date" label="Date" type="date" :errorMessages="validationErrors.date" />

                    <div class="flex flex-col gap-3">
                        <label for="category" class="block text-sm text-indigo-700">Category</label>
                        <select v-model="formData.category" id="category" name="category"
                            class="focus:outline-indigo-700 mt-1 outline-2 outline-indigo-300 px-8 py-2 rounded-md text-indigo-700 w-full">
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Bills">Bills</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div class="sm:col-span-2">
                        <InputBox v-model="formData.amount" label="Amount ($)" type="number" placeholder="100"
                            :errorMessages="validationErrors.amount" />
                    </div>
                </div>
            </form>
        </FormDialogue>

        <!-- Modal to edit expenses -->
        <FormDialogue @close="closeDialog" :isOpen="showEditDialog" :isLoading="isLoading" formId="update-expense">
            <form id="update-expense" @submit.prevent="() => { handleUpdateExpense(id) }">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    <InputBox v-model="formData.date" label="Date" type="date" :errorMessages="validationErrors.date" />

                    <div class="flex flex-col gap-3">
                        <label for="category" class="block text-sm text-indigo-700">Category</label>
                        <select v-model="formData.category" id="category" name="category"
                            class="focus:outline-indigo-700 mt-1 outline-2 outline-indigo-300 px-8 py-2 rounded-md text-indigo-700 w-full">
                            <option value="Food" :selected="(formData.category === 'Food') ? true : false">Food</option>
                            <option value="Transport" :selected="formData.category === 'Transport'">
                                Transport</option>
                            <option value="Shopping" :selected="formData.category === 'Shopping'">
                                Shopping</option>
                            <option value="Bills" :selected="formData.category === 'Bills'">Bills
                            </option>
                            <option value="Other" :selected="formData.category === 'Other'">Other
                            </option>
                        </select>
                    </div>

                    <div class="sm:col-span-2">
                        <InputBox v-model="formData.amount" label="Amount ($)" type="number" placeholder="100"
                            :errorMessages="validationErrors.amount" />
                    </div>
                </div>
            </form>
        </FormDialogue>
    </Layout>
</template>