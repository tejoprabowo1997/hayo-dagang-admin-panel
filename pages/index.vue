<script lang="ts" setup>
import { useToast } from 'vue-toastification'
const toast = useToast()
const router = useRouter()
const dataUser = useCookie<{ roleUser: string }>('roleUser')

const usernameOrEmail = ref<string>('admin')
const usernameOrEmailError = ref<{ error: boolean; msgError: string }>({
  error: false,
  msgError: '',
})
const password = ref<string>('admin')
const passwordError = ref<{ error: boolean; msgError: string }>({
  error: false,
  msgError: '',
})
const showPassword = ref<boolean>(false)

const validation = () => {
  let error = false

  if (!usernameOrEmail.value) {
    error = true
    usernameOrEmailError.value.error = true
    usernameOrEmailError.value.msgError = 'Username/Email wajib di isi!'
  }

  if (!password.value) {
    error = true
    passwordError.value.error = true
    passwordError.value.msgError = 'Password wajib di isi!'
  }

  return error
}

const loginProcess = async () => {
  const error = validation()
  if (error) return

  if (usernameOrEmail.value === 'admin' && password.value === 'admin') dataUser.value = { roleUser: 'ADMIN' }
  else if (usernameOrEmail.value === 'vendor' && password.value === 'vendor') dataUser.value = { roleUser: 'VENDOR' }
  else if (usernameOrEmail.value === 'seller' && password.value === 'seller') dataUser.value = { roleUser: 'SELLER' }
  else return toast.error('Credential not valid!')

  toast.success(`Selamat datang di ${usernameOrEmail.value} panel`)
  await router.push('/dashboard')
}
</script>

<template>
  <v-container>
    <v-row align="center" justify="center" class="h-screen">
      <v-col cols="12" xl="6" lg="6" md="10" sm="12" xs="12">
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title>HayoDagang Login Admin</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-row justify="center">
              <v-col cols="12">
                <v-text-field
                  v-model="usernameOrEmail"
                  label="Username/Email"
                  density="compact"
                  variant="outlined"
                  color="primary"
                  :error="usernameOrEmailError.error"
                  :error-messages="usernameOrEmailError.msgError"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  label="Password"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  density="compact"
                  variant="outlined"
                  color="primary"
                  :error="passwordError.error"
                  :error-messages="passwordError.msgError"
                  @click:append-inner="showPassword = !showPassword"
                />
              </v-col>
              <v-col cols="6" align-self="center">
                <v-checkbox label="Remember Me" hide-details density="compact" color="primary" />
              </v-col>
              <v-col cols="6" align-self="center" align="end">
                <v-btn color="warning" variant="plain"> Forgot Password? </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="primary" variant="elevated" block @click="loginProcess"> Login </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
