<template lang="pug">
q-layout(view="lHh lpr lFf" style="background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);")
  q-page-container
    q-page
      .column.fit
        .col-auto
          nav.row.justify-between
            .col-auto LOGO
            .col-auto
              .row.q-pa-xl.items-center
                .col-auto.q-pr-lg Are you alreaedy registered?
                .col-auto
                  q-btn(color="secondary" to='/login') Login
        .col
          .row.justify-center.items-center.q-my-xl
            q-card.row.q-px-xl.q-py-lg.register-card
              q-form.col(@submit.prevent="onSubmit")
                .row.column.q-gutter-md
                  h1(class="title text-center") Let's go!
                  q-input(outlined label="Name" v-model="model.name" :rules="[formRules.required('Name is required')]" autocomplete="name" dense)
                  q-input(outlined label="Email" v-model="model.email" :rules="[formRules.required('Email is required')]" autocomplete="email" dense)
                  q-input(outlined label="Password" type="password" v-model="model.password" :rules="[formRules.required('Password is required')]" autocomplete="current-password" dense)
                  q-btn.q-mb-md(color="primary" type="submit" :loading="isLoading" no-caps style="font-size: 1rem;") Register
</template>
<script setup lang="ts">
import formRules from 'src/composables/form-rules'
import { useAuthStore } from 'src/stores/auth'
import type { RegisterBody } from 'src/types/auth.d'

const authStore = useAuthStore()
const router = useRouter()

const currentUser = computed(() => authStore.user)

const model = reactive<RegisterBody>({
  name: '',
  email: '',
  password: ''
})
const isLoading = ref(false)

const onSubmit = async () => {
  await authStore.register(model)
  // console.log(user)
  if (currentUser.value) {
    router.push('/')
  }
}
</script>
<style lang="sass" scoped>
.register-card
  width: #{calc(480 / 16)}rem
  body.screen--xs &
    width: 95%

  body.screen--sm &
    width: 95%
</style>
