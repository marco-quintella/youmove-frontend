<script setup lang="ts">
import { useAppStore } from 'src/stores/app'
const store = useAppStore()
const isDrawerOpen = computed(() => store.isDrawerOpen)

const toggleDrawer = () => {
  store.setDrawerOpen(!isDrawerOpen.value)
}

const hover = ref(false)
const iconName = computed(() => hover.value ? 'mdi-chevron-double-right' : 'mdi-menu')
</script>

<template lang="pug">
q-btn(id="drawer-open-button" v-if="!isDrawerOpen" :icon="iconName" @click="toggleDrawer" @mouseenter="hover = true" @mouseleave="hover = false" flat dense)
</template>
