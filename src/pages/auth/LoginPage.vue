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
                q-btn Register
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
import { useAuthStore } from 'src/stores/auth'
import formRules from '../../composables/form-rules'

const authStore = useAuthStore()
const router = useRouter()

const model = reactive<{
  email: string,
  password: string
}>({
  email: '',
  password: ''
})
const isLoading = ref(false)

const onSubmit = async () => {
  isLoading.value = true
  if (model.email || model.password) {
    await authStore.login(model)
    router.push('/')
  }
  isLoading.value = false
}
</script>
<style lang="sass" scoped>
.title
  font-size: 3rem
  font-weight: 700
  line-height: 4.5rem
  color: #292d34
  text-align: center
</style>
