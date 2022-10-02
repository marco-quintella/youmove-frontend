<template lang="pug">
q-drawer.drawer(v-model="isDrawerOpen" bordered)
  .col-auto
    .row.justify-between.q-pa-sm.items-center
      .col-auto YOUMOVE
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
  q-list.col(dense)
    q-item(clickable)
      q-item-section Home
    q-item(clickable)
      q-item-section Notifications
    q-separator
    q-item
      q-item-section Teams
    q-item
      clickable-item-section(@click="onClickNewTeam") Create a New Team
    q-separator.q-mt-sm
    q-item
      q-item-section Projects
    q-item
      clickable-item-section(@click="onClickNewProject") Create a New Project
  .col-auto
    .q-px-md.row.items-center(style="height: 50px")
      .col-auto
        drawer-user-menu
</template>
<script setup lang="ts">
import { useAppStore } from 'src/stores/app'
import { useQuasar } from 'quasar'

import CreateTeamDialog from '../teams/CreateTeamDialog.vue'
import CreateProjectDialog from '../projects/CreateProjectDialog.vue'

const store = useAppStore()
const isDrawerOpen = computed(() => store.isDrawerOpen)
const quasar = useQuasar()

const toggleDrawer = () => {
  store.setDrawerOpen(!isDrawerOpen)
}

const onClickNewTeam = () => {
  quasar.dialog({
    component: CreateTeamDialog
  })
}

const onClickNewProject = () => {
  quasar.dialog({
    component: CreateProjectDialog
  })
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
