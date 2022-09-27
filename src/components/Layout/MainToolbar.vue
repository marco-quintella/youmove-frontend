<template lang="pug">
q-header
  q-toolbar
    drawer-open-button
    q-tabs(v-model="mainToolBarTabs")
      q-tab(name="tab1" label="Tab 1")
    q-space
    q-btn Calendar
    q-separator(vertical inset)
    q-btn Agenda
    q-separator(vertical inset)
    q-btn Mentions
</template>
<script setup lang="ts">import { useStore } from 'src/stores/app'

const mainToolBarTabs = ref('tab1')
</script>
