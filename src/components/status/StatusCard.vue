<template lang="pug">
q-card.status-card(v-if="status" bordered)
  q-card-section.row.items-center.status-card__header
    .col-auto
      q-btn(flat round :icon="expandToggleIcon" size="xs" @click="expanded = !expanded")
    .col-auto(v-if="!editName") {{status.name}}
    .col-auto(v-else)
      .row
        q-input.status-card__header__edit-name(v-model="newName" dense borderless :input-style="`color: ${titleColor}; background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 0 8px;`")
        q-btn(flat round dense icon="mdi-check" size="xs" @click="onSaveNewName")
        q-btn(flat round dense icon="mdi-close" size="xs" @click="editName = false")
    .col-auto.q-pl-sm.status-card__header__edit(v-if="!editName")
      q-btn(flat round size="xs" icon="mdi-pencil" @click="onEditName")
    .col-auto.q-pl-sm.status-card__header__options
      q-btn(flat round size="xs" icon="mdi-dots-vertical")
  q-card-section(v-if="expanded") Tasks
</template>
<script setup lang="ts">
import type { Status } from 'types'
import getContrastColor from '../../composables/hex-color'
import { useQuasar } from 'quasar'

interface StatusCardProps {
  status: Status
  categoryId: string
}

const props = defineProps<StatusCardProps>()

const emit = defineEmits(['updateStatus'])

const quasar = useQuasar()

const titleColor = computed(() => getContrastColor(props.status.color))
const expanded = ref(true)
const expandToggleIcon = computed(() => expanded.value ? 'mdi-chevron-up-circle-outline' : 'mdi-chevron-down-circle-outline')

const editName = ref(false)
const newName = ref('')

const onSaveNewName = async () => {
  quasar.loading.show()
  try {
    await StatusService.updateById(props.status.id, { name: newName.value })
    emit('updateStatus')
    editName.value = false
  } catch (error) {
    quasar.notify({
      type: 'negative',
      message: 'Error on updating status name'
    })
    console.error(error)
  } finally {
    quasar.loading.hide()
  }
}

const onEditName = () => {
  newName.value = props.status.name
  editName.value = true
}
</script>
<style lang="sass" scoped>
.status-card
  border: none
  &__header
    text-transform: uppercase
    background-color: v-bind('status.color')
    padding-top: 0.25rem
    padding-bottom: 0.25rem
    padding-left: 0.5rem
    padding-right: 0.5rem
    font-size: 0.75rem
    min-height: 2rem
    max-height: 2rem
    color: v-bind('titleColor')

    &__edit, &__options
      display: none

    &:hover &__edit,
    &:hover &__options
      display: block

    &__edit-name
      height: 1.5rem

      > .q-field__inner
        > .q-field__control
          height: 1.5rem
</style>
<style lang="sass">
.status-card
  &__header
    &__edit-name
      > .q-field__inner
        > .q-field__control
          height: 1.5rem
          font-size: 0.75rem
</style>
