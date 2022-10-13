<script setup lang="ts">
import useRouteGuard from './composables/route-guards'

useRouteGuard()
</script>

<template lang="pug">
router-view
</template>
