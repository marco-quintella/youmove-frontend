<template lang="pug">
router-view
</template>

<script setup lang="ts">
import useRouteGuard from './composables/route-guards'

useRouteGuard()
</script>
