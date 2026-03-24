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
            :rules="[val => !!val || 'Obligatori']"
          >
            <template v-slot:prepend><q-icon name="email" color="primary" /></template>
          </q-input>

          <q-input 
            v-model="dadesLogin.password" 
            label="Contrasenya" 
            :type="esContrasenya ? 'password' : 'text'" 
            outlined
            rounded 
            :rules="[val => !!val || 'Obligatori']"
          >
            <template v-slot:prepend><q-icon name="lock" color="primary" /></template>
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
              class="full-width q-py-sm" 
              :loading="carregant" 
            />
          </div>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()

const esContrasenya = ref(true)
const carregant = ref(false)

const dadesLogin = reactive({
  email: '',
  password: ''
})

async function gestionarLogin() {
  carregant.value = true
  try {    
    const resposta = await fetch('http://10.0.2.2:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadesLogin)
    })    
    
    const text = await resposta.text()
    let dades = {}
    
    try {
      dades = JSON.parse(text)
    } catch { 
      throw new Error('Error al iniciar sessió')
    }

    if (resposta.ok) {      
      localStorage.setItem('userId', dades.user.id)
      
      $q.notify({ color: 'green', message: 'Benvingut!' })
      router.push('/pokemons')
    } else {
      $q.notify({ color: 'red', message: dades.message || 'Error de login' })
    }
  } catch (err) {
    console.error(err)
    $q.notify({ color: 'negative', message: err.message, timeout: 5000 })
  } finally {
    carregant.value = false
  }
}
</script>

<style scoped>
.rounded-borders { border-radius: 20px; }
.contenidor-login { animation: fadeIn 0.8s ease-in-out; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>