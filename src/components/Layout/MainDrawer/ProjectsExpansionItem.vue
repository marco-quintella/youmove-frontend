<template lang="pug">
q-expansion-item(label="Projects" dense)
  q-list(dense)
    q-item.items-baseline(dense)
      clickable-item-section(@click="onClickNewProject") Create a New Project
    q-item(v-for="project in userProjects" :key="project.id" dense clickable :to="`/projects/${project.id}`")
      q-item-section(avatar)
        q-avatar(:style="{ 'background-color': project.color }" size="20px") {{ project.initials }}
      q-item-section {{ project.name }}
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar'
import { useAppStore } from '../../../stores/app'
import CreateProjectDialogVue from '../../projects/CreateProjectDialog.vue'

const quasar = useQuasar()
const appStore = useAppStore()

const userProjects = computed(() => appStore.projects)

const onClickNewProject = () => {
  quasar.dialog({
    component: CreateProjectDialogVue
  })
}

onMounted(async () => {
  await appStore.getUserProjects()
})
</script>
