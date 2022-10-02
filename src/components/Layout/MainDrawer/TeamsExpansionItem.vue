<template lang="pug">
q-expansion-item(label="Teams" dense)
  q-list(dense)
    q-item.items-baseline(dense)
      clickable-item-section(@click="onClickNewTeam") Create a New Team
    q-item(v-for="team in userTeams" :key="team.id" dense clickable :to="`/teams/${team.id}`")
      q-item-section(avatar)
        q-avatar(:style="{ 'background-color': team.color }" size="20px") {{team.initials }}
      q-item-section {{ team.name }}
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar'
import { useAppStore } from '../../../stores/app'
import CreateTeamDialogVue from '../../teams/CreateTeamDialog.vue'

const quasar = useQuasar()
const appStore = useAppStore()

const userTeams = computed(() => appStore.teams)

const onClickNewTeam = () => {
  quasar.dialog({
    component: CreateTeamDialogVue
  })
}

onMounted(async () => {
  await appStore.getUserTeams()
})
</script>
