<script setup lang="ts">
import type { Status } from 'types'

const { statuses } = defineProps<{
  statuses: Status[]
  modelValue: Status | undefined
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Status): void
}>()

const onSelect = (status: Status) => {
  emit('update:modelValue', status)
}
</script>

<template lang="pug">
q-badge.cursor-pointer(rounded :color="modelValue ? modelValue.color : 'grey-5'")
q-menu(auto-close)
  q-list
    template(v-for="status, index in statuses" :key="index")
      q-item(dense clickable @click="onSelect(status)")
        q-item-section {{status.name}}
</template>
