<template lang="pug">
q-page
  .row(v-if="team").q-gutter-x-md.q-mx-md.justify-center.q-mt-md
    .col-auto.row.items-center
      q-avatar(size="50px" :style="{'background-color': team.color}") {{ team.initials }}
    .col-auto.row.items-center.q-gutter-x-md.no-wrap
      .col-auto.ellipsis-2-lines
        h3.q-ma-none(v-if="!editName") {{ team.name }}
        q-input(v-else-if="editName && teamModel" v-model="teamModel.name" label="Team Name" dense outlined)
      .col-auto(v-if="canEdit")
        template(v-if="!editName")
          q-btn(flat round dense @click="editName = true")
            q-icon(name="mdi-pencil")
        template(v-else)
          q-btn(flat round dense @click="onSaveName")
            q-icon(name="mdi-check")
          q-btn(flat round dense @click="editName = false")
            q-icon(name="mdi-close")
  team-members(v-if="team" :team="team")
</template>
<script setup lang="ts">
import TeamService from '../../services/team.service'
import type { Team } from '../../types'
import { useQuasar } from 'quasar'
import { useAuthStore } from '../../stores/auth'
import { useAppStore } from '../../stores/app'

const route = useRoute()
const quasar = useQuasar()
const authStore = useAuthStore()
const appStore = useAppStore()

const teamId = computed(() => route.params.id)
const currentUser = computed(() => authStore.user)

const canEdit = computed(() => team.value?.owner.id === currentUser.value?.id)

const team = ref<Team>()
const teamModel = ref<Team>()
const editName = ref(false)

watch(teamId, async () => {
  if (teamId.value) {
    quasar.loading.show()
    const { data } = await TeamService.getTeamById(teamId.value as string)
    team.value = data
    teamModel.value = data
    quasar.loading.hide()
  }
}, { immediate: true })

const onSaveName = async () => {
  if (teamModel.value && typeof teamId.value === 'string') {
    quasar.loading.show()
    try {
      const { data } = await TeamService.updateTeamById(teamId.value as string, { name: teamModel.value.name })
      await appStore.getUserTeams()
      team.value = data
      teamModel.value = data
      editName.value = false
    } catch (e) {
      console.error(e)
      quasar.notify({
        type: 'negative',
        message: 'Failed to update team name'
      })
    }
    quasar.loading.hide()
  }
}
</script>
