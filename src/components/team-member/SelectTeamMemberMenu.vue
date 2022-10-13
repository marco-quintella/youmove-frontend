<script setup lang="ts">
import type { TeamMember } from 'types'
import getContrastColor from '../../composables/hex-color'

const { members, modelValue } = defineProps<{
  members?: TeamMember[]
  modelValue?: string[]
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string[]): void
}>()

const onSelect = (member: TeamMember) => {
  if (modelValue?.includes(member.id))
    emit('update:modelValue', modelValue.filter((m) => m !== member.id))
  else if (modelValue)
    emit('update:modelValue', [...modelValue, member.id])
  else
    emit('update:modelValue', [member.id])
}

const membersMap = $computed(() => {
  if (members) {
    return members.reduce((acc, member) => {
      acc[member.id] = member
      return acc
    }, {} as Record<string, TeamMember>)
  }
  return null
})

const computedMemberStyle = (memberId: string) => {
  if (membersMap?.[memberId]) {
    const { color } = membersMap[memberId].user
    return {
      backgroundColor: color,
      color: getContrastColor(color),
    }
  }
}
</script>

<template lang="pug">
q-btn(:icon="modelValue && modelValue.length > 0 ? undefined : 'mdi-account-circle-outline'" flat round dense)
  q-avatar.absolute(
    v-for="memberId, index in modelValue"
    :key="index"
    :style="{...computedMemberStyle(memberId), left: `${(index + 1) * 0.25}rem`}"
    size="1.5rem"
  ) {{ membersMap?.[memberId].user.initials }}
q-menu
  q-list
    q-item(v-for="member in members" :key="member.id" clickable v-close-popup @click="onSelect(member)")
      q-item-section(avatar)
        q-avatar(:style="`background-color: ${member.user.color}; color: ${getContrastColor(member.user.color)}`") {{ member.user.initials }}
      q-item-section {{ member.user.name }}
</template>
