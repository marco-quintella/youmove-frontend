<template lang="pug">
.row
  .col.q-px-md
    .row
      h3.col Members
    .row
      .col
        q-table(:columns="columns" :rows="team.members" row-key="name" hide-bottom)
          template(#body="props")
            q-tr(:props="props")
              q-td(key="name")
                .row.items-center
                  .col {{props.row.name}}
                  .col-auto(v-if="props.row.role")
                    q-chip(color="primary" text-color="secondary") {{props.row.role}}
              q-td(key="email") {{ props.row.email }}
              q-td.text-right(key="config")
                q-btn(icon="mdi-dots-vertical" flat round dense :disable="props.row.role === 'admin'")
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { Team, QuasarTableColumns } from '../../types'

const props = defineProps({
  team: {
    type: Object as PropType<Team>,
    required: true
  }
})

const columns: QuasarTableColumns = [
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left',
    sortable: true
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'left',
    sortable: true
  },
  {
    name: 'config',
    label: 'Config',
    field: 'config',
    align: 'right'
  }
]
</script>
