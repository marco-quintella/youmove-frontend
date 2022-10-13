<template lang="pug">
q-item-section.text-center.clickable-item-section
  slot
</template>

<style lang="sass">
.clickable-item-section
  height: 22px
  border-radius: 5px
  cursor: pointer
  background-color: $grey-3
  &:hover
    background-color: $grey-4
</style>
