<template lang="pug">
q-layout(view="lHh lpr lFf")
  q-page-container
    q-page
      .row.column.fit
        nav.row.justify-between
          .col-auto LOGO
          .col-auto
            .row.q-pa-xl.items-center
              .col-auto.q-pr-lg Don't have an account?
              .col-auto
                q-btn(to='/register') Register
        .row.justify-center.items-center
          q-card.row.q-px-xl.q-py-lg
            q-form.col(@submit.prevent="onSubmit")
              .row.column()
                h1(class="title") Welcome Back!
                q-input(outlined label="Email" v-model="model.email" :rules="[formRules.required('Email is required')]" autocomplete="email")
                q-input(outlined label="Password" type="password" v-model="model.password" :rules="[formRules.required('Password is required')]" autocomplete="current-password")
                q-btn.q-mb-md(type="submit" :loading="isLoading") Login
                router-link(to="forgot-password") Forgot Password?
</template>
<script setup lang="ts">
import formRules from 'src/composables/form-rules'
import type { RegisterBody } from 'src/types/auth.d'

const model = reactive<RegisterBody>({
  name: '',
  email: '',
  password: ''
})
const isLoading = ref(false)

const onSubmit = () => {
  // onSubmit
}
</script>
