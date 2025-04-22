<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="page-opacity" mode="out-in">
      <div :key="route.fullPath">
        <component :is="Component" />
      </div>
    </Transition>
  </RouterView>
</template>


<style>
.page-opacity-enter-active,
.page-opacity-leave-active {
  transition: 500ms ease all;
}

.page-opacity-enter-from,
.page-opacity-leave-to {
  opacity: 0;
}
</style>