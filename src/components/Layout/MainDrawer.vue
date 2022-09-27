<template lang="pug">
q-drawer.drawer(v-model="isDrawerOpen" bordered)
  .row.justify-between.q-pa-sm.items-center
    .col-auto YOUMOVE
    .col-auto
      .row
        .col-auto
          q-btn(icon="mdi-cog-outline" flat dense)
          q-btn(icon="mdi-chevron-double-left" @click="toggleDrawer" flat dense)
  q-separator
  div.q-pa-sm
    q-btn.full-width.drawer__search-button(flat dense no-caps)
      .row.justify-between.full-width
        .col-auto
          q-icon.q-ml-sm(name="mdi-magnify")
        .col.text-left.q-ml-sm(style="opacity: 0.4") Search
        .col-auto.q-mr-sm Ctrl + K
  q-separator
  q-list(dense)
    q-item(clickable)
      q-item-section Home
    q-item(clickable)
      q-item-section Notifications
</template>
<script setup lang="ts">
import { useStore } from 'src/stores/app'
const store = useStore()
const isDrawerOpen = computed(() => store.isDrawerOpen)

const toggleDrawer = () => {
  store.setDrawerOpen(!isDrawerOpen)
}

const searchText = ref('')
</script>
<style lang="sass">
.drawer
  color: #53575e
  font-size: 13px
  font-weight: 400
  line-height: 1
  &__search-button
    background-color: $grey-3
    &:hover
      color: $secondary
</style>
