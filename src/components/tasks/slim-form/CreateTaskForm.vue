<script setup lang="ts">
import type { QInput } from 'quasar'
import type { CreateTaskPayload, Status, Team } from 'types'
import TaskService from '../../../services/task.service'

const { status, statuses } = defineProps<{
  status?: Status
  statuses?: Status[]
}>()

const emit = defineEmits<{
  (event: 'created'): void
}>()

const quasar = useQuasar()
const appStore = useAppStore()

const activeMember = $computed(() => appStore.activeMember)

const model = reactive<Partial<CreateTaskPayload>>({
  title: undefined,
  members: [],
})
let _status = $ref<Status | undefined>(status)
let triggerStatusError = $ref(false)
let team = $ref<Team>()

const taskInputRef = $ref<QInput>()
const statusSelectorRef = $ref<HTMLDivElement>()

const inputShake = () => {
  taskInputRef.$.vnode.el?.classList.add('create-task-form--shake')
  setTimeout(() => {
    taskInputRef.$.vnode.el?.classList.remove('create-task-form--shake')
  }, 500)
}

const statusSelectorShake = () => {
  statusSelectorRef.classList.add('create-task-form--shake')
  triggerStatusError = true
  setTimeout(() => {
    statusSelectorRef.classList.remove('create-task-form--shake')
  }, 500)
}

const createTask = async () => {
  if (!_status) {
    statusSelectorShake()
    return
  }

  if (!model.title || model.title === '') {
    model.title = ''
    inputShake()
    return
  }

  quasar.loading.show()
  try {
    if (!activeMember)
      throw new Error('No active member found')

    await TaskService.create({
      title: model.title,
      creator: activeMember.id,
      members: model.members,
    }, _status.id)
    emit('created')
    model.title = undefined
    model.members = []
    _status = status
  }
  catch (e) {
    console.error('Error creating task', e)
    quasar.notify({ type: 'negative', message: 'Error creating task' })
  }
  finally {
    quasar.loading.hide()
  }
}

onBeforeMount(async () => {
  if (appStore.activeCategory)
    team = appStore.activeCategory.team
})
</script>

<template lang="pug">
q-form.create-task-form(@submit.prevent="createTask")
  .col-auto.flex.items-center(ref="statusSelectorRef" v-if="!status && statuses")
    status-menu-selector(:statuses="statuses" v-model="_status" @update:model-value="triggerStatusError = false")
    q-icon(name="mdi-exclamation" color="red" v-if="triggerStatusError")
  .col.q-pl-sm
    q-input(ref="taskInputRef" v-model="model.title" dense borderless placeholder="Task Title")
      template(#append v-if="model.title === ''")
        q-icon(name="mdi-exclamation-thick" color="negative")
  .col-auto.q-pl-sm
    select-team-member-menu(:members="team?.members" v-model="model.members")
  .col-auto.q-pl-sm
    q-btn(
      color="primary"
      dense
      label="Create"
      type="submit"
      square
      unelevated
    )
</template>

<style lang="sass" scoped>
.create-task-form
  width: 100%
  display: flex
  align-items: center
  border: 1px solid $primary
  background-color: $theme-layout
  padding: 0 0.5rem

  &--shake
    animation: shake 0.5s
    animation-iteration-count: 1
    transform: translate3d(0, 0, 0)
    backface-visibility: hidden
    perspective: 1000px

    @keyframes shake
      10%, 90%
        transform: translate3d(-1px, 0, 0)
      20%, 80%
        transform: translate3d(2px, 0, 0)
      30%, 50%, 70%
        transform: translate3d(-4px, 0, 0)
      40%, 60%
        transform: translate3d(4px, 0, 0)
</style>
