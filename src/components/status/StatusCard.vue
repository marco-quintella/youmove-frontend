<template lang="pug">
q-card.status-card(v-if="status" bordered)
  q-card-section.row.items-center.status-card__header
    .col-auto {{status.name}}
    .col-auto.q-pl-sm.status-card__header__edit
      q-btn(flat round size="xs" icon="mdi-pencil")
    .col-auto.q-pl-sm.status-card__header__options
      q-btn(flat round size="xs" icon="mdi-dots-vertical")
</template>
<script setup lang="ts">
import type { Status } from 'types'

interface StatusCardProps {
  status: Status
  categoryId: string
}

const props = defineProps<StatusCardProps>()
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

    &__edit, &__options
      display: none

    &:hover &__edit,
    &:hover &__options
      display: block

</style>
