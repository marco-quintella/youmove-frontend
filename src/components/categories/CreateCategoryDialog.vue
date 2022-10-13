<script setup lang="ts">
import { useDialogPluginComponent, useQuasar } from 'quasar'
import CreateTeamDialogVue from '../teams/CreateTeamDialog.vue'
import { useAppStore } from '../../stores/app'
import CategoryService from '../../services/category.service'

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
})

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogCancel, onDialogHide, onDialogOK } = useDialogPluginComponent()
const quasar = useQuasar()
const appStore = useAppStore()

const categoryModel = reactive({
  name: '',
})
const userProjects = computed(() => appStore.projects)
const noProjects = computed(() => !userProjects.value || userProjects.value.length === 0)

const onSubmit = async () => {
  quasar.loading.show()
  try {
    await CategoryService.create({ category: categoryModel, projectId: props.projectId })
    await appStore.getUserProjects()
    onDialogOK()
  }
  catch (e) {
    console.error(e)
  }
  finally {
    quasar.loading.hide()
  }
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
    .column.items-center(v-if="!noProjects")
      img.q-mt-sm(style="width: 70%" src="~assets/undraw_bookshelves_re_lxoy.svg")
      h3.text-center Create a new Category
      q-form.full-width.q-px-md.column.q-gutter-y-md( @submit.prevent="onSubmit")
        q-input(v-model="categoryModel.name" label="Category Name" outlined dense)
        q-card-actions.q-mt-md.q-pa-none.full-width(align="center")
          q-btn.full-width(color="primary" label="Save" type="submit")
    .column.items-center(v-else)
      img.q-mt-sm(style="width: 70%" src="~assets/undraw_no_data_re_kwbl.svg")
      h3.text-center No teams found
      q-btn(color="primary" label="Create a team" @click="onCreateTeam")
</template>
