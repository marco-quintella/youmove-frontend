<script setup lang="ts">
import { useDialogPluginComponent, useQuasar } from 'quasar'
import CreateTeamDialogVue from '../teams/CreateTeamDialog.vue'
import { useAppStore } from '../../stores/app'

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogCancel, onDialogHide, onDialogOK } = useDialogPluginComponent()
const quasar = useQuasar()
const appStore = useAppStore()

const model = reactive({
  name: '',
  team: '',
})
const userTeams = computed(() => appStore.teams)
const teamOptions = computed(() => {
  const options: { label: string; value: string }[] = []
  userTeams.value.forEach(team => {
    options.push({ label: team.name, value: team.id as string })
  })
  return options
})
const noTeams = computed(() => !userTeams.value || userTeams.value.length === 0)

const onSubmit = async () => {
  quasar.loading.show()
  await projectService.createProject(model)
  await appStore.getUserProjects()
  onDialogOK()
  quasar.loading.hide()
}

const onCreateTeam = () => {
  onDialogCancel()
  quasar.dialog({
    component: CreateTeamDialogVue,
  })
}
</script>

<template lang="pug">
q-dialog(ref="dialogRef" @hide="onDialogHide" persistent)
  q-card.q-dialog-plugin.q-px-lg.q-py-lg
    q-btn.absolute-top-right.q-mr-md.q-mt-md(flat icon="mdi-close" dense @click="onDialogCancel")
    .column.items-center(v-if="!noTeams")
      img.q-mt-sm(style="width: 70%" src="~assets/undraw_team_up_re_84ok.svg")
      h3.text-center Create a new Project
      q-form.full-width.q-px-md.column.q-gutter-y-md( @submit.prevent="onSubmit")
        q-input(v-model="model.name" label="Project Name" outlined dense)
        q-select(v-model="model.team" :options="teamOptions" label="Team" emit-value map-options outlined dense)
        q-card-actions.q-mt-md.q-pa-none.full-width(align="center")
          q-btn.full-width(color="primary" label="Save" type="submit")
    .column.items-center(v-else)
      img.q-mt-sm(style="width: 70%" src="~assets/undraw_no_data_re_kwbl.svg")
      h3.text-center No teams found
      q-btn(color="primary" label="Create a team" @click="onCreateTeam")
</template>
