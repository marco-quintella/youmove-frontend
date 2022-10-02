import { useQuasar } from 'quasar';
<template lang="pug">
q-avatar.cursor-pointer(v-if="currentUser" color="primary" text-color="white" size="30px") {{ currentUser.initials }}
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
            q-avatar(v-if="currentUser" color="primary" text-color="white" size="30px") {{ currentUser.initials }}
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
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const quasar = useQuasar()
const authStore = useAuthStore()

const currentUser = computed(() => authStore.user)

const onLogout = async () => {
  quasar.loading.show()
  setTimeout(async () => {
    await authStore.logout()
    quasar.loading.hide()
  }, 1000)
}

watchEffect(() => {
  if (!authStore.user && !authStore.tokens) {
    router.push('/login')
  }
})

onMounted(async () => {
  await teamService.getTeams({ limit: 10, page: 1 })
})

</script>
