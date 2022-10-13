<script setup lang="ts">
import { useAppStore } from 'src/stores/app'

const mainToolBarTabs = ref('tab1')
</script>

<template lang="pug">
q-header
  q-toolbar
    q-img(src="~/assets/logo-trimmy.png", style="max-width: 120px")
    drawer-open-button.q-ml-md
    q-tabs.q-ml-md(v-model="mainToolBarTabs")
      q-tab(name="tab1" label="Home")
    q-space
    q-btn Calendar
    q-separator(vertical inset)
    q-btn Agenda
    q-separator(vertical inset)
    q-btn Mentions
</template>
