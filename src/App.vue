<template lang="pug">
router-view
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useRouteGuard from './composables/route-guards'

const users = ref()

useRouteGuard()

// const { mutate: sendMessage } = useMutation(gql`
//   mutation deleteAllUsers ($ids: [String!]!) {
//     deleteAllUsers(deleteAllUsersInput: {ids: $ids}) {
//       _id
//     }
//   }
// `)

// const query = useQuery(gql`
//   query getUsers{
//       getUsers(getUsersInput: {}) {
//         _id
//       }
//     }
// `)

// onMounted(() => {
//   query.onResult((result) => {
//     users.value = result.data.getUsers
//     const ids = users.value.map((user) => user._id)

//     sendMessage({
//       ids
//     })
//   })
// })
</script>
