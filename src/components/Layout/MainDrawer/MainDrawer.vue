<template lang="pug">
q-drawer.drawer(v-model="isDrawerOpen" bordered)
  .col-auto
    .row.justify-between.q-pa-sm.items-center
      .col
        q-img(src="~/assets/logo-trimmy.png", style="max-width: 120px")
      .col-auto
        .row
          .col-auto
            q-btn(icon="mdi-cog-outline" flat dense)
            q-btn(icon="mdi-chevron-double-left" @click="toggleDrawer" flat dense)
  q-separator.col-auto
  .q-pa-sm.col-auto
    q-btn.full-width.drawer__search-button(flat dense no-caps)
      .row.justify-between.full-width
        .col-auto
          q-icon.q-ml-sm(name="mdi-magnify")
        .col.text-left.q-ml-sm(style="opacity: 0.4") Search
        .col-auto.q-mr-sm Ctrl + K
  q-separator
  q-list.col(dense separator)
    q-item(clickable)
      q-item-section Home
    q-item(clickable)
      q-item-section Notifications
    teams-expansion-item
    projects-expansion-item
  .col-auto
    .q-px-md.row.items-center(style="height: 50px")
      .col-auto
        drawer-user-menu
</template>
<script setup lang="ts">
import { useAppStore } from 'src/stores/app'

const store = useAppStore()
const isDrawerOpen = computed({
  get: () => store.isDrawerOpen,
  set: (value: boolean) => store.setDrawerOpen(value)
})

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
  display: flex
  flex-direction: column
  &__search-button
    background-color: $grey-3
    &:hover
      color: $secondary
</style>
