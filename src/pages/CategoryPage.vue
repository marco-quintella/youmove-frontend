<template lang="pug">
q-page
  .column
    .col-auto.list-toolbar
      .row.justify-between.items-center
        .col-auto.list-toolbar__search-box
          .row
            q-input(v-model="search" borderless dense placeholder="Search")
              template(#prepend)
                q-icon(name="mdi-magnify")
            q-separator(vertical inset)
        .col-auto
          .row
            q-btn(flat dense no-caps) Filter
            q-btn(flat dense no-caps) Group by
            q-btn(flat dense no-caps) Subtasks
    .col.q-pa-md
      q-card.bg-transparent.q-pa-sm(flat bordered)
        .row.justify-between.items-center
          .col-auto
            .row.items-center
              .text-weight-bold Category Name
              q-btn.q-ml-sm(flat dense) + New Task
          .col-auto Show Closed
        .row
          .col
            create-status-separator-btn(v-if="statusesNumber === 0" :category-id="categoryId" @created="onNewStatusCreated")
        .row
          template(v-for="status in statuses" :key="status.id")
            .col
              status-card(:status="status" :category-id="categoryId")
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar'
import { StatusService } from 'services'
import type { Status } from 'types'

const quasar = useQuasar()
const route = useRoute()

const categoryId = computed(() => route.params.categoryId as string)

const statuses = ref<Status[]>([])
const statusesNumber = computed(() => statuses.value.length)

const search = ref('')

const onNewStatusCreated = async () => {
  await fetchStatus()
}

const fetchStatus = async () => {
  const { results } = await StatusService.getByCategoryId(categoryId.value)
  statuses.value = results
}

onMounted(async () => {
  quasar.loading.show()
  try {
    await fetchStatus()
  } catch (e) {
    console.error('Error getting statuses', e)
    quasar.notify({ type: 'negative', message: 'Error getting statuses' })
  } finally {
    quasar.loading.hide()
  }
})
</script>
<style lang="sass">
.list-toolbar
  border: 1px solid rgba(0, 0, 0, 0.25)
  background: white

  &__search-box
    padding-left: 0.25rem
    padding-right: 0.25rem

.create-status-button__row
  color: rgba(0, 0, 0, 0.5)
  user-select: none
  border-radius: 1rem
  &:hover
    background: rgba(0, 0, 0, 0.05)
    transition: background-color 0.4s ease
  &:active
    background: rgba(0, 0, 0, 0.1)

</style>
