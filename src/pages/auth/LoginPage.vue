<script setup lang="ts">
import { useAuthStore } from 'stores/auth'
import type { LoginBody } from 'types'
import formRules from 'composables/form-rules'
import { useQuasar } from 'quasar'

const authStore = useAuthStore()
const router = useRouter()
const quasar = useQuasar()

const model = reactive<LoginBody>({
  email: '',
  password: '',
})

const onSubmit = async () => {
  quasar.loading.show()
  setTimeout(async () => {
    try {
      if (model.email && model.password) {
        await authStore.login(model)
        if (authStore.tokens)
          await router.push('/')
        else
          throw Error
      }
    }
    catch (e) {
      console.error('Login failed', e)
      quasar.notify({
        type: 'negative',
        message: 'Login failed',
      })
    }
    finally {
      quasar.loading.hide()
    }
  }, 1000)
}
</script>

<template lang="pug">
q-layout(view="lHh lpr lFf" style="background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);")
  q-page-container
    q-page.column
      nav.col-auto
        .row.justify-between.items-center
          .col-auto.q-pl-xl
            img.small-logo(src="~assets/logo-trimmy.png")
          .col-auto
            .row.q-pa-xl.items-center
              .col-auto.q-pr-lg.gt-sm.text-weight-medium Don't have an account?
              .col-auto
                q-btn(to='/register' color="secondary") Register
      .col.row.justify-center.items-center
        .col-12.col-sm-9.col-md-6.col-lg-4.q-px-md
          q-card.q-px-xl.q-py-md
            q-form.column.q-gutter-sm(@submit.prevent="onSubmit")
              h1(class="text-center") Welcome Back!
              q-input(outlined label="Email" v-model="model.email" :rules="[formRules.required('Email is required')]" autocomplete="email" dense)
              q-input(outlined label="Password" type="password" v-model="model.password" :rules="[formRules.required('Password is required')]" autocomplete="current-password" dense)
              q-btn.q-mb-md(color="primary" type="submit" no-caps style="font-size: 1rem;") Login
              router-link(to="forgot-password") Forgot Password?
</template>
