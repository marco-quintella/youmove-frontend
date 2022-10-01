<template lang="pug">
q-dialog(ref="dialogRef" @hide="onDialogHide" persistent)
  q-card.q-dialog-plugin.q-px-lg.q-py-lg
    q-btn.absolute-top-right.q-mr-md.q-mt-md(flat icon="mdi-close" dense @click="onDialogCancel")
    .column.items-center
      img.q-mt-sm(style="width: 70%" src="~assets/undraw_team_up_re_84ok.svg")
      h3.text-center Create a new team
      q-form.full-width.q-px-md(@submit.prevent="onSubmit")
        q-input(v-model="model.name" label="Team Name" outlined dense)
        q-card-actions.q-mt-md.q-pa-none.full-width(align="center")
          q-btn.full-width(color="primary" label="Save" type="submit")
</template>
<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogCancel, onDialogHide, onDialogOK } = useDialogPluginComponent()

const model = reactive({
  name: ''
})

const onOKClick = () => {
  onDialogOK()
}

const onSubmit = async () => {
  await teamService.createTeam({ name: model.name })
}
</script>
