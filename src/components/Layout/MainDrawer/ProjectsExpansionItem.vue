<script setup lang="ts">
import { useQuasar } from 'quasar'
import { useAppStore } from 'stores/app'
import CreateCategoryDialogVue from 'components/categories/CreateCategoryDialog.vue'
import CreateProjectDialogVue from 'components/projects/CreateProjectDialog.vue'

const quasar = useQuasar()
const appStore = useAppStore()

const userProjects = computed(() => appStore.projects)

const onClickNewProject = () => {
  quasar.dialog({
    component: CreateProjectDialogVue,
  })
}

const onClickNewCategory = (projectId?: string) => {
  if (projectId) {
    quasar.dialog({
      component: CreateCategoryDialogVue,
      componentProps: {
        projectId,
      },
    })
  }
}

onMounted(async () => {
  await appStore.getUserProjects()
})
</script>

<template lang="pug">
q-expansion-item.projects-expansion-item(label="Projects" dense)
  q-list(dense)
    q-item.items-baseline(dense)
      clickable-item-section(@click="onClickNewProject") Create a New Project
    q-expansion-item(v-for="project in userProjects" :key="project.id" dense)
      template(#header)
        q-item-section(avatar)
          q-avatar(:style="{ 'background-color': project.color }" size="20px") {{project.initials }}
        q-item-section
          router-link(:to="`/projects/${project.id}`") {{ project.name }}
        q-item-section(side)
          q-btn(v-if="project.id" icon="mdi-plus" flat dense size="xs" round @click.prevent="onClickNewCategory(project.id)")
      q-item(v-for="category in project.categories" :key="category.id" dense clickable :to="`/category/${category.id}`")
        q-item-section.q-pl-md(avatar)
          q-avatar(:style="{ 'background-color': category.color }" size="10px")
        q-item-section {{ category.name }}
</template>

<style lang="sass">
.projects-expansion-item
  a
    text-decoration: none

    &:hover
      text-decoration: underline
</style>
