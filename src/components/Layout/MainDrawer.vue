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
  .col-auto
    .q-px-md.row.items-center(style="height: 50px")
      .col-auto
        q-avatar.cursor-pointer(color="primary" text-color="white" size="30px") M
        q-menu(auto-close fit)
          .row
            .col-auto
              .column.q-pa-sm.q-gutter-sm
                q-avatar(color="primary" text-color="white" size="30px") CO
                q-avatar(size="30px" style="border: 1px solid #53575e" icon="mdi-plus")
            q-separator(vertical)
            .col.q-py-sm
              q-list(dense)
                q-item
                  q-item-section(avatar)
                    q-avatar(color="primary" text-color="white" size="30px") MQ
                  q-item-section UserName
                q-item Configs
                q-item Notifications
                q-item Layout
                q-item Trash
                q-item Apps
                q-item Models
                q-item Rewards
                q-item(clickable @click="onLogout") Logout
                q-separator
                q-item Help
                q-item Shortcuts
                q-item Dark Mode
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar'
import { useStore } from 'src/stores/app'
import { useAuthStore } from 'src/stores/auth'

import CreateTeamDialog from '../teams/CreateTeamDialog.vue'

const store = useStore()
const authStore = useAuthStore()
const quasar = useQuasar()
const router = useRouter()
const isDrawerOpen = computed(() => store.isDrawerOpen)

const toggleDrawer = () => {
  store.setDrawerOpen(!isDrawerOpen)
}

const searchText = ref('')

const onLogout = async () => {
  quasar.loading.show()
  setTimeout(async () => {
    await authStore.logout()
    quasar.loading.hide()
  }, 1000)
}

const onClickNewTeam = () => {
  quasar.dialog({
    component: CreateTeamDialog
  })
}

watchEffect(() => {
  if (!authStore.user && !authStore.tokens) {
    router.push('/login')
  }
})
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
