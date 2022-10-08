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
              .col-auto.q-pr-lg.gt-sm.text-weight-medium Are you alreaedy registered?
              .col-auto
                q-btn(color="secondary" to='/login' no-caps) Login
      .col.row.justify-center.items-center
        .col-12.col-sm-9.col-md-6.col-lg-4.q-px-md
          q-card.q-px-xl.q-py-md
            q-form.column.q-gutter-sm(@submit.prevent="onSubmit")
              h1(class="text-center") Let's go!
              q-input(outlined label="Name" v-model="model.name" :rules="[formRules.required('Name is required')]" autocomplete="name" dense)
              q-input(outlined label="Email" v-model="model.email" :rules="[formRules.required('Email is required')]" autocomplete="email" dense)
              q-input(outlined label="Password" type="password" v-model="model.password" :rules="[formRules.required('Password is required')]" autocomplete="current-password" dense)
              q-btn.q-mb-md(color="primary" type="submit" no-caps style="font-size: 1rem;") Register
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar'
import formRules from 'src/composables/form-rules'
import { useAuthStore } from 'src/stores/auth'
import type { RegisterBody } from 'src/types/auth.d'
import { useAppStore } from '../../stores/app'

const authStore = useAuthStore()
const router = useRouter()
const quasar = useQuasar()
const appStore = useAppStore()

const model = reactive<RegisterBody>({
  name: '',
  email: '',
  password: ''
})

const onSubmit = async () => {
  quasar.loading.show()
  setTimeout(async () => {
    if (model.email || model.password || model.name) {
      await authStore.register(model)
        .catch(() => quasar.loading.hide())
      if (quasar.localStorage.getItem('token')) {
        console.debug('Register successful')
        quasar.loading.hide()
        router.push('/')
      }
    }
  }, 1000)
}
</script>
