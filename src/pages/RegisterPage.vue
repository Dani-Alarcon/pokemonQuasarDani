<template>
  <q-page class="flex flex-center bg-grey-1">
    <div class="contenidor-login q-pa-md full-width" style="max-width: 400px">

      <div class="text-center q-mb-xl">
        <q-avatar size="100px" font-size="52px" color="secondary" text-color="white" icon="person_add" class="shadow-5" />
        <h4 class="text-weight-bolder q-mt-md q-mb-none text-secondary">NOU ENTRENADOR</h4>
        <div class="text-grey-7">Uneix-te per crear el teu equip</div>
      </div>

      <q-card flat bordered class="rounded-borders q-pa-lg shadow-2">
        <q-form @submit="gestionarRegistre" class="q-gutter-y-md">

          <q-input 
            v-model="dadesRegistre.name" 
            label="El teu nom" 
            type="text" 
            outlined 
            rounded 
            :rules="[val => !!val || 'El nom és obligatori']"
          >
            <template v-slot:prepend><q-icon name="person" color="secondary" /></template>
          </q-input>

          <q-input 
            v-model="dadesRegistre.email" 
            label="Correu electrònic" 
            type="email" 
            outlined 
            rounded 
            :rules="[val => !!val || 'El correu és obligatori']"
          >
            <template v-slot:prepend><q-icon name="email" color="secondary" /></template>
          </q-input>

          <q-input 
            v-model="dadesRegistre.password" 
            label="Contrasenya" 
            :type="esContrasenya ? 'password' : 'text'" 
            outlined
            rounded 
            :rules="[
              val => !!val || 'La contrasenya és obligatòria',
              val => val.length >= 6 || 'Mínim 6 caràcters'
            ]"
          >
            <template v-slot:prepend><q-icon name="lock" color="secondary" /></template>
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
              label="Registrar-me" 
              type="submit" 
              color="secondary" 
              rounded
              class="full-width q-py-sm q-mb-sm" 
              :loading="carregant" 
            />
            <q-btn 
              label="Tornar al Login" 
              flat
              color="grey-7" 
              rounded
              class="full-width q-py-sm" 
              to="/login"
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

const dadesRegistre = reactive({
  name: '',
  email: '',
  password: ''
})

async function gestionarRegistre() {
  carregant.value = true
  try {    
    const resposta = await fetch('http://10.0.2.2:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadesRegistre)
    })  
    
    const text = await resposta.text()
    let dades = {}
    
    try {
      dades = JSON.parse(text)
    } catch { 
      throw new Error('Error al registrar-se')
    }

    if (resposta.ok) {      
      $q.notify({ color: 'positive', message: 'Compte creat amb èxit! Ja pots iniciar sessió.' })
      router.push('/login')
    } else {
      $q.notify({ color: 'negative', message: dades.message || 'Error durant el registre' })
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