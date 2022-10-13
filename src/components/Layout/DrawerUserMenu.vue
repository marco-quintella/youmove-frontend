import { useQuasar } from 'quasar';
<script setup lang="ts">
import { useQuasar } from 'quasar'
import { useAuthStore } from '../../stores/auth'
import { useAppStore } from '../../stores/app'

const router = useRouter()
const quasar = useQuasar()
const authStore = useAuthStore()
const appStore = useAppStore()

const currentUser = computed(() => authStore.user)
const userTeams = computed(() => appStore.teams)

const onLogout = async () => {
  quasar.loading.show()
  setTimeout(async () => {
    await authStore.logout()
    quasar.loading.hide()
  }, 1000)
}

watchEffect(() => {
  if (!authStore.user && !authStore.tokens)
    router.push('/login')
})

onMounted(async () => {
  await teamService.getTeams({ limit: 10, page: 1 })
})
</script>

<template lang="pug">
q-avatar.cursor-pointer(v-if="currentUser" color="primary" text-color="white" size="30px") {{ currentUser.initials }}
q-menu(auto-close fit)
  q-list(dense)
    q-item.q-my-sm
      q-item-section(avatar)
        q-avatar(v-if="currentUser" color="primary" text-color="white" size="30px") {{ currentUser.initials }}
      q-item-section UserName
    q-separator
    q-item(clickable @click="onLogout") Logout
</template>
