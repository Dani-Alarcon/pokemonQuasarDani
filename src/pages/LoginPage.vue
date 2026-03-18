<template>
  <q-page class="flex flex-center bg-grey-1">
    <div class="contenidor-login q-pa-md full-width" style="max-width: 400px">

      <div class="text-center q-mb-xl">
        <q-avatar size="100px" font-size="52px" color="primary" text-color="white" icon="bolt" class="shadow-5" />
        <h4 class="text-weight-bolder q-mt-md q-mb-none text-primary">POKÉDEX</h4>
        <div class="text-grey-7">Entra per gestionar el teu equip</div>
      </div>

      <q-card flat bordered class="rounded-borders q-pa-lg shadow-2">
        <q-form @submit="gestionarLogin" class="q-gutter-y-md">

          <q-input 
            v-model="dadesLogin.email" 
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
            v-model="dadesLogin.password" 
            label="Contrasenya" 
            :type="esContrasenya ? 'password' : 'text'" 
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
                :name="esContrasenya ? 'visibility_off' : 'visibility'" 
                class="cursor-pointer"
                @click="esContrasenya = !esContrasenya" 
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
              :loading="carregant" 
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

// Estats en català
const esContrasenya = ref(true)
const carregant = ref(false)

const dadesLogin = reactive({
  email: '',
  password: ''
})

async function gestionarLogin() {
  carregant.value = true

  try {
    console.log('Intentant fer login amb:', dadesLogin)
        
    await new Promise(resolve => setTimeout(resolve, 1500))
        
    await router.push('/pokemons')

    $q.notify({
      color: 'green-5',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Benvingut entrenador!'
    })

  } catch (error) {
    console.error('Error detallat:', error)

    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Error al iniciar sessió o ruta no trobada'
    })
  } finally {
    carregant.value = false
  }
}
</script>

<style scoped>
.rounded-borders {
  border-radius: 20px;
}

.contenidor-login {
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>