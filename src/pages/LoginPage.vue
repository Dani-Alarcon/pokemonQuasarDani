<template>
  <q-page class="flex flex-center bg-grey-1">
    <div class="login-container q-pa-md full-width" style="max-width: 400px">
      
      <div class="text-center q-mb-xl">
        <q-avatar size="100px" font-size="52px" color="primary" text-color="white" icon="bolt" class="shadow-5" />
        <h4 class="text-weight-bolder q-mt-md q-mb-none text-primary">POKÉDEX</h4>
        <div class="text-grey-7">Entra per gestionar el teu equip</div>
      </div>

      <q-card flat bordered class="rounded-borders q-pa-lg shadow-2">
        <q-form @submit="handleLogin" class="q-gutter-y-md">
          
          <q-input
            v-model="loginData.email"
            label="Correu electrònic"
            type="email"
            outlined
            rounded
            bg-color="white"
            :rules="[val => !!val || 'El correu és obligatori']"
          >
            <template v-slot:prepend>
              <q-icon name="email" color="primary" />
            </template>
          </q-input>

          <q-input
            v-model="loginData.password"
            label="Contrasenya"
            :type="isPassword ? 'password' : 'text'"
            outlined
            rounded
            bg-color="white"
            :rules="[val => !!val || 'La contrasenya és obligatòria']"
          >
            <template v-slot:prepend>
              <q-icon name="lock" color="primary" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPassword = !isPassword"
              />
            </template>
          </q-input>

          <div class="q-mt-xl">
            <q-btn
              label="Iniciar Sessió"
              type="submit"
              color="primary"
              rounded
              class="full-width q-py-sm text-weight-bold"
              size="lg"
              :loading="loading"
            />
          </div>

          <q-btn
            flat
            no-caps
            label="No tens compte? Registra't"
            color="primary"
            class="full-width q-mt-sm"
            to="/registro"
          />
        </q-form>
      </q-card>

      <div class="text-center q-mt-xl text-grey-5 text-caption">
        Versió 1.0.0 — Pokémon App
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()

const isPassword = ref(true)
const loading = ref(false)

const loginData = reactive({
  email: '',
  password: ''
})

async function handleLogin() {
  loading.value = true
  
  try {
    
    console.log('Intentant fer login amb:', loginData)

    setTimeout(() => {
      $q.notify({
        color: 'green-5',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Benvingut entrenador!'
      })
      router.push('/pokemons')
      loading.value = false
    }, 1500)

  } catch (error) {
    console.error(error)
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Error al iniciar sessió'
    })
    loading.value = false
  }
}
</script>

<style scoped>
.rounded-borders {
  border-radius: 20px;
}
.login-container {
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>