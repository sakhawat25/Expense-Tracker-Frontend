<script setup>
const emits = defineEmits(['close'])

const props = defineProps({
    isOpen: Boolean,
    formId: String,
    isLoading: {
        type: Boolean,
        default: false,
    }
})
</script>

<template>
    <div v-if="props.isOpen" class="absolute inset-0 z-10 bg-gray-700 opacity-90"></div>
    <div v-if="props.isOpen" class="absolute z-10 top-52 left-5 right-5">
        <div class="w-full max-w-lg p-3 mx-auto rounded-xl shadow-lg bg-white">
            <div>
                <slot></slot>

                <div class="p-3 mt-2 text-right space-x-4 md:block">
                    <button :form="props.formId" type="submit" :class="['mb-2 md:mb-0 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md',
                        props.isLoading
                            ? 'bg-indigo-300 cursor-not-allowed opacity-60'
                            : 'bg-indigo-500 cursor-pointer hover:bg-indigo-700 hover:shadow-lg'
                    ]">
                        <i v-if="props.isLoading" class="pi pi-spin pi-spinner"></i>
                        Save
                    </button>

                    <button @click="() => $emit('close')"
                        class="mb-2 md:mb-0 bg-white cursor-pointer px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>