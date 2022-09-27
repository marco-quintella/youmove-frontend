<template lang="pug">
q-btn(id="drawer-open-button" v-if="!isDrawerOpen" :icon="iconName" @click="toggleDrawer" @mouseenter="hover = true" @mouseleave="hover = false" flat dense)
</template>
<script setup lang="ts">
import { useStore } from 'src/stores/app'
const store = useStore()
const isDrawerOpen = computed(() => store.isDrawerOpen)

const toggleDrawer = () => {
  store.setDrawerOpen(!isDrawerOpen.value)
}

const hover = ref(false)
const iconName = computed(() => hover.value ? 'mdi-chevron-double-right' : 'mdi-menu')
</script>
