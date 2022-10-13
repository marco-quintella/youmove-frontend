<script setup lang="ts">
import { useQuasar } from 'quasar'
import { StatusService } from 'services'

const props = defineProps({
  categoryId: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['created'])

// Composables
const quasar = useQuasar()

// Status Controller
const createStage = ref(false)

// Data Refs
const newStatusName = ref<string>()

const onSubmit = async () => {
  if (!newStatusName.value || newStatusName.value.length === 0)
    return
  quasar.loading.show()
  try {
    await StatusService.create(props.categoryId, { name: newStatusName.value })
    quasar.notify({ type: 'positive', message: 'Status created' })

    createStage.value = false
    newStatusName.value = ''

    emit('created')
  }
  catch (e) {
    console.error('Error creating status', e)
  }
  finally {
    quasar.loading.hide()
  }
}
</script>

<template lang="pug">
.row.items-center.q-px-md.cursor-pointer.create-status-button__row(v-if="!createStage" @click="createStage = true")
  .col
    q-separator
  .col-auto.q-px-md Create a status
  .col
    q-separator
.row.items-center.q-px-md(v-else)
  .col
    q-separator
  .col-auto.q-px-md
    q-input(v-model="newStatusName" dense borderless placeholder="New status name")
      template(#prepend)
        q-btn(flat dense round size="sm" icon="mdi-close" @click="createStage = false")
      template(#append)
        q-btn(flat dense round size="sm" icon="mdi-plus" @click="onSubmit")
  .col
    q-separator
</template>
